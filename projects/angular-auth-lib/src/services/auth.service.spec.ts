import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import {
  AUTH_API_URLS,
  AUTH_BEHAVIOR,
  AUTH_TOKEN_STORAGE,
  AuthBehaviorConfig,
  AuthTokenStorage,
  AuthUrlsConfig
} from '../token';
import { Token } from '../models/user.models';

const ACCESS_KEY = 'angular-auth-lib.token';
const REFRESH_KEY = 'angular-auth-lib.refreshToken';

const jwt = (expSeconds: number) =>
  `h.${btoa(JSON.stringify({ exp: expSeconds })).replace(/=+$/, '')}.s`;

type FakeStorage = AuthTokenStorage & { snapshot(): Record<string, string> };

const inMemoryStorage = (): FakeStorage => {
  const data = new Map<string, string>();
  return {
    getItem: (k) => data.get(k) ?? null,
    setItem: (k, v) => void data.set(k, v),
    removeItem: (k) => void data.delete(k),
    snapshot: () => Object.fromEntries(data)
  };
};

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let storage: FakeStorage;

  const urls: AuthUrlsConfig = {
    accessTokenUrl: '/api/token/',
    refreshTokenUrl: '/api/token/refresh/',
    userInformationUrl: '/api/me/',
    logoutUrl: '/api/logout/'
  };

  const setup = (
    behavior: Partial<AuthBehaviorConfig> = {},
    urlOverrides: Partial<AuthUrlsConfig> = {}
  ) => {
    storage = inMemoryStorage();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AUTH_API_URLS, useValue: { ...urls, ...urlOverrides } },
        { provide: AUTH_BEHAVIOR, useValue: { canActivate: () => true, ...behavior } },
        { provide: AUTH_TOKEN_STORAGE, useValue: storage }
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  };

  afterEach(() => httpMock.verify());

  describe('decodeToken', () => {
    it('returns null on null, missing access, or malformed JWT without throwing', () => {
      setup();
      expect(service.decodeToken(null)).toBeNull();
      expect(service.decodeToken({})).toBeNull();
      expect(service.decodeToken({ access: 'not-a-jwt' })).toBeNull();
      expect(service.decodeToken({ access: 'a.%%%.c' })).toBeNull();
    });

    it('decodes a default {access, refresh?} JWT response', () => {
      setup();
      const access = jwt(1_000);
      expect(service.decodeToken({ access, refresh: 'r1' })).toEqual({
        token: access,
        expiringDate: 1_000_000,
        refreshToken: 'r1'
      });
    });

    it('delegates to behavior.tokenAdapter.parse when set', () => {
      const parsed: Token = { token: 'custom', expiringDate: 42 };
      const parse = jasmine.createSpy('parse').and.returnValue(parsed);
      setup({ tokenAdapter: { parse } });

      const raw = { access_token: 'x' };
      expect(service.decodeToken(raw)).toBe(parsed);
      expect(parse).toHaveBeenCalledOnceWith(raw);
    });

    it('returns null when tokenAdapter.parse throws', () => {
      setup({ tokenAdapter: { parse: () => { throw new Error('boom'); } } });
      expect(service.decodeToken({})).toBeNull();
    });
  });

  describe('getToken', () => {
    it('returns null when nothing is stored', () => {
      setup();
      expect(service.getToken()).toBeNull();
    });

    it('returns the decoded token (with refresh) from storage', () => {
      setup();
      const access = jwt(2_000);
      storage.setItem(ACCESS_KEY, access);
      storage.setItem(REFRESH_KEY, 'r1');

      expect(service.getToken()).toEqual({
        token: access,
        expiringDate: 2_000_000,
        refreshToken: 'r1'
      });
    });

    it('clears storage when the stored value is unparseable', () => {
      setup();
      storage.setItem(ACCESS_KEY, 'garbage');
      storage.setItem(REFRESH_KEY, 'r1');

      expect(service.getToken()).toBeNull();
      expect(storage.snapshot()).toEqual({});
    });
  });

  describe('canRefresh', () => {
    it('is true only when refreshTokenUrl is configured and a refresh token is stored', () => {
      setup();
      expect(service.canRefresh).toBeFalse();
      storage.setItem(REFRESH_KEY, 'r1');
      expect(service.canRefresh).toBeTrue();
    });

    it('is false when refreshTokenUrl is not configured even with a stored refresh', () => {
      setup({}, { refreshTokenUrl: undefined });
      storage.setItem(REFRESH_KEY, 'r1');
      expect(service.canRefresh).toBeFalse();
    });
  });

  describe('login', () => {
    it('POSTs credentials verbatim and decodes the response', () => {
      setup();
      const credentials = { email: 'a@b.c', password: 'pw', otp: '123456' };
      let result: Token | undefined;
      service.login(credentials).subscribe((t) => (result = t));

      const req = httpMock.expectOne(urls.accessTokenUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBe(credentials);

      const access = jwt(3_000);
      req.flush({ access, refresh: 'r1' });

      expect(result).toEqual({ token: access, expiringDate: 3_000_000, refreshToken: 'r1' });
    });

    it('errors when the response cannot be decoded', () => {
      setup();
      let error: Error | undefined;
      service.login({}).subscribe({ error: (e) => (error = e) });

      httpMock.expectOne(urls.accessTokenUrl).flush({ nope: true });

      expect(error?.message).toContain('unparseable');
    });
  });

  describe('refreshToken', () => {
    it('errors immediately when no refresh token is stored', () => {
      setup();
      let error: Error | undefined;
      service.refreshToken().subscribe({ error: (e) => (error = e) });

      httpMock.expectNone(urls.refreshTokenUrl!);
      expect(error?.message).toBe('Refresh token not available');
    });

    it('shares a single in-flight request across concurrent callers', () => {
      setup();
      storage.setItem(REFRESH_KEY, 'r1');

      const results: Token[] = [];
      service.refreshToken().subscribe((t) => results.push(t));
      service.refreshToken().subscribe((t) => results.push(t));

      const reqs = httpMock.match(urls.refreshTokenUrl!);
      expect(reqs.length).toBe(1);

      const access = jwt(4_000);
      reqs[0].flush({ access, refresh: 'r2' });

      expect(results.length).toBe(2);
      expect(results[0]).toEqual(results[1]);
      expect(results[0].refreshToken).toBe('r2');

      // After completion the in-flight slot is cleared and a new call fires a fresh request.
      service.refreshToken().subscribe();
      httpMock.expectOne(urls.refreshTokenUrl!).flush({ access });
    });

    it('preserves the existing refresh token when the server omits it, and persists the pair', () => {
      setup();
      storage.setItem(REFRESH_KEY, 'keep-me');

      let result: Token | undefined;
      service.refreshToken().subscribe((t) => (result = t));

      const req = httpMock.expectOne(urls.refreshTokenUrl!);
      expect(req.request.body).toEqual({ refresh: 'keep-me' });

      const access = jwt(5_000);
      req.flush({ access }); // no `refresh` in response

      expect(result?.refreshToken).toBe('keep-me');
      expect(storage.snapshot()).toEqual({ [ACCESS_KEY]: access, [REFRESH_KEY]: 'keep-me' });
    });

    it('uses tokenAdapter.buildRefreshBody when provided', () => {
      const buildRefreshBody = jasmine
        .createSpy('buildRefreshBody')
        .and.returnValue({ grant_type: 'refresh_token', refresh_token: 'r1' });
      setup({
        tokenAdapter: {
          parse: (raw) => {
            const r = raw as { access_token: string; refresh_token?: string };
            return { token: r.access_token, expiringDate: 1, refreshToken: r.refresh_token };
          },
          buildRefreshBody
        }
      });
      storage.setItem(REFRESH_KEY, 'r1');

      service.refreshToken().subscribe();

      const req = httpMock.expectOne(urls.refreshTokenUrl!);
      expect(buildRefreshBody).toHaveBeenCalledOnceWith('r1');
      expect(req.request.body).toEqual({ grant_type: 'refresh_token', refresh_token: 'r1' });
      req.flush({ access_token: 'new', refresh_token: 'r2' });
    });
  });

  describe('logout', () => {
    it('POSTs {refresh} to logoutUrl then clears storage', () => {
      setup();
      storage.setItem(ACCESS_KEY, jwt(1));
      storage.setItem(REFRESH_KEY, 'r1');

      let completed = false;
      service.logout().subscribe({ complete: () => (completed = true) });

      const req = httpMock.expectOne(urls.logoutUrl!);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ refresh: 'r1' });
      req.flush(null);

      expect(completed).toBeTrue();
      expect(storage.snapshot()).toEqual({});
    });

    it('still clears storage when the logout POST errors', () => {
      setup();
      storage.setItem(ACCESS_KEY, jwt(1));
      storage.setItem(REFRESH_KEY, 'r1');

      service.logout().subscribe({ error: () => undefined });
      httpMock
        .expectOne(urls.logoutUrl!)
        .flush('nope', { status: 500, statusText: 'Server Error' });

      expect(storage.snapshot()).toEqual({});
    });

    it('skips the network call and just clears storage when no refresh token is stored', () => {
      setup();
      storage.setItem(ACCESS_KEY, jwt(1));

      service.logout().subscribe();

      httpMock.expectNone(urls.logoutUrl!);
      expect(storage.snapshot()).toEqual({});
    });
  });
});
