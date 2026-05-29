import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { tokenInterceptor } from './token.interceptor';
import { AUTH_API_URLS, AUTH_BEHAVIOR, AUTH_TOKEN_STORAGE, AuthBehaviorConfig, AuthTokenStorage } from '../token';

const jwt = (label: string, exp = 9_999_999_999) =>
  `${label}.${btoa(JSON.stringify({ exp })).replace(/=+$/, '')}.sig`;

const ACCESS_KEY = 'angular-auth-lib.token';
const REFRESH_KEY = 'angular-auth-lib.refreshToken';

describe('tokenInterceptor', () => {
  let http: HttpClient;
  let backend: HttpTestingController;
  let storage: AuthTokenStorage;

  const urls = {
    accessTokenUrl: '/api/log-in',
    refreshTokenUrl: '/api/refresh',
    userInformationUrl: '/api/me'
  };

  function setup(behavior: Partial<AuthBehaviorConfig> = {}): void {
    const data = new Map<string, string>();
    storage = {
      getItem: (k) => data.get(k) ?? null,
      setItem: (k, v) => void data.set(k, v),
      removeItem: (k) => void data.delete(k)
    };
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        { provide: AUTH_API_URLS, useValue: urls },
        { provide: AUTH_BEHAVIOR, useValue: { canActivate: () => true, ...behavior } },
        { provide: AUTH_TOKEN_STORAGE, useValue: storage },
        provideHttpClient(withInterceptors([tokenInterceptor])),
        provideHttpClientTesting()
      ]
    });
    http = TestBed.inject(HttpClient);
    backend = TestBed.inject(HttpTestingController);
  }

  afterEach(() => backend.verify());

  it('attaches the bearer when a token is stored', () => {
    setup();
    storage.setItem(ACCESS_KEY, jwt('access'));

    http.get('/api/me').subscribe();
    const req = backend.expectOne('/api/me');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${jwt('access')}`);
    req.flush({});
  });

  it('passes the request through unchanged when no token is stored', () => {
    setup();

    http.get('/api/me').subscribe();
    const req = backend.expectOne('/api/me');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({});
  });

  it('refreshes proactively when the stored token is already expired', () => {
    setup();
    storage.setItem(ACCESS_KEY, jwt('stale', 1));
    storage.setItem(REFRESH_KEY, 'refresh-abc');

    let body: unknown;
    http.get('/api/me').subscribe((b) => (body = b));

    // No initial /api/me — refresh fires first.
    const refresh = backend.expectOne('/api/refresh');
    refresh.flush({ access: jwt('fresh') });

    const req = backend.expectOne('/api/me');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${jwt('fresh')}`);
    req.flush({ ok: true });

    expect(body).toEqual({ ok: true });
  });

  it('refreshes on 401 and retries the original request once', () => {
    setup();
    storage.setItem(ACCESS_KEY, jwt('expired'));
    storage.setItem(REFRESH_KEY, 'refresh-abc');

    let body: unknown;
    http.get('/api/me').subscribe((b) => (body = b));

    backend.expectOne('/api/me').flush('expired', { status: 401, statusText: 'Unauthorized' });

    const refresh = backend.expectOne('/api/refresh');
    expect(refresh.request.body).toEqual({ refresh: 'refresh-abc' });
    refresh.flush({ access: jwt('fresh') });

    const retry = backend.expectOne('/api/me');
    expect(retry.request.headers.get('Authorization')).toBe(`Bearer ${jwt('fresh')}`);
    retry.flush({ ok: true });

    expect(body).toEqual({ ok: true });
    expect(storage.getItem(ACCESS_KEY)).toBe(jwt('fresh'));
  });

  it('shares one refresh across concurrent 401s', () => {
    setup();
    storage.setItem(ACCESS_KEY, jwt('expired'));
    storage.setItem(REFRESH_KEY, 'refresh-abc');

    http.get('/api/a').subscribe();
    http.get('/api/b').subscribe();

    backend.expectOne('/api/a').flush('', { status: 401, statusText: 'Unauthorized' });
    backend.expectOne('/api/b').flush('', { status: 401, statusText: 'Unauthorized' });

    const refreshes = backend.match('/api/refresh');
    expect(refreshes.length).toBe(1);
    refreshes[0].flush({ access: jwt('fresh') });

    backend.expectOne('/api/a').flush({});
    backend.expectOne('/api/b').flush({});
  });

  it('propagates the original error when no refresh token is available', () => {
    setup();
    storage.setItem(ACCESS_KEY, jwt('expired'));

    let caught: unknown;
    http.get('/api/me').subscribe({ error: (e) => (caught = e) });
    backend.expectOne('/api/me').flush('', { status: 401, statusText: 'Unauthorized' });

    backend.expectNone('/api/refresh');
    expect(caught).toBeTruthy();
  });

  it('does not attempt refresh on the refresh endpoint itself', () => {
    setup();
    storage.setItem(ACCESS_KEY, jwt('expired'));
    storage.setItem(REFRESH_KEY, 'refresh-abc');

    let caught: unknown;
    http.post('/api/refresh', {}).subscribe({ error: (e) => (caught = e) });
    backend.expectOne('/api/refresh').flush('', { status: 401, statusText: 'Unauthorized' });

    expect(caught).toBeTruthy();
  });

  it('honours the behavior.authHeader callback for outgoing requests', () => {
    setup({ authHeader: (t) => ({ 'X-Auth': t }) });
    storage.setItem(ACCESS_KEY, jwt('access'));

    http.get('/api/me').subscribe();
    const req = backend.expectOne('/api/me');
    expect(req.request.headers.get('X-Auth')).toBe(jwt('access'));
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({});
  });

  it('extends the trusted set with behavior.allowedOrigins', () => {
    setup({ allowedOrigins: ['https://other.example.com'] });
    storage.setItem(ACCESS_KEY, jwt('access'));

    http.get('https://other.example.com/data').subscribe();
    const allowed = backend.expectOne('https://other.example.com/data');
    expect(allowed.request.headers.get('Authorization')).toBe(`Bearer ${jwt('access')}`);
    allowed.flush({});

    http.get('https://untrusted.example.com/data').subscribe();
    const blocked = backend.expectOne('https://untrusted.example.com/data');
    expect(blocked.request.headers.has('Authorization')).toBeFalse();
    blocked.flush({});
  });
});
