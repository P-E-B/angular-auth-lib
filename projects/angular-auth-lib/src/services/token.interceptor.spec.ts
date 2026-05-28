import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { tokenInterceptor } from './token.interceptor';
import { AUTH_API_URLS } from '../token';

const jwt = (label: string, exp = 9_999_999_999) =>
  `${label}.${btoa(JSON.stringify({ exp })).replace(/=+$/, '')}.sig`;

describe('tokenInterceptor', () => {
  let http: HttpClient;
  let backend: HttpTestingController;

  const urls = {
    accessTokenUrl: '/api/log-in',
    refreshTokenUrl: '/api/refresh',
    userInformationUrl: '/api/me',
    sendBackPasswordUrl: '/api/pwd'
  };

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        { provide: AUTH_API_URLS, useValue: urls },
        provideHttpClient(withInterceptors([tokenInterceptor])),
        provideHttpClientTesting()
      ]
    });
    http = TestBed.inject(HttpClient);
    backend = TestBed.inject(HttpTestingController);
  });

  afterEach(() => backend.verify());

  it('attaches the bearer when a token is stored', () => {
    sessionStorage.setItem('token', jwt('access'));
    http.get('/api/me').subscribe();
    const req = backend.expectOne('/api/me');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${jwt('access')}`);
    req.flush({});
  });

  it('passes the request through unchanged when no token is stored', () => {
    http.get('/api/me').subscribe();
    const req = backend.expectOne('/api/me');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({});
  });

  it('refreshes proactively when the stored token is already expired', () => {
    sessionStorage.setItem('token', jwt('stale', 1));
    sessionStorage.setItem('refreshToken', 'refresh-abc');

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
    sessionStorage.setItem('token', jwt('expired'));
    sessionStorage.setItem('refreshToken', 'refresh-abc');

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
    expect(sessionStorage.getItem('token')).toBe(jwt('fresh'));
  });

  it('shares one refresh across concurrent 401s', () => {
    sessionStorage.setItem('token', jwt('expired'));
    sessionStorage.setItem('refreshToken', 'refresh-abc');

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
    sessionStorage.setItem('token', jwt('expired'));

    let caught: unknown;
    http.get('/api/me').subscribe({ error: (e) => (caught = e) });
    backend.expectOne('/api/me').flush('', { status: 401, statusText: 'Unauthorized' });

    backend.expectNone('/api/refresh');
    expect(caught).toBeTruthy();
  });

  it('does not attempt refresh on the refresh endpoint itself', () => {
    sessionStorage.setItem('token', jwt('expired'));
    sessionStorage.setItem('refreshToken', 'refresh-abc');

    let caught: unknown;
    http.post('/api/refresh', {}).subscribe({ error: (e) => (caught = e) });
    backend.expectOne('/api/refresh').flush('', { status: 401, statusText: 'Unauthorized' });

    expect(caught).toBeTruthy();
  });
});
