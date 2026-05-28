import { inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

import { AuthService } from './auth.service';
import { Token } from '../models/user.models';
import { AUTH_API_URLS, AuthUrlsConfig } from '../token';
import { AuthActions } from '../store/actions';

/** Refresh proactively when the access token expires within this window. */
const REFRESH_SKEW_MS = 30_000;

function parseOrigin(url: string, base?: string): string | null {
  try {
    return new URL(url, base).origin;
  } catch {
    return null;
  }
}

function buildAllowedOrigins(apiUrls: AuthUrlsConfig): Set<string> {
  const allowed = new Set<string>();
  for (const url of Object.values(apiUrls)) {
    const origin = url ? parseOrigin(url) : null;
    if (origin) {
      allowed.add(origin);
    }
  }
  return allowed;
}

function isAllowedUrl(url: string, allowedOrigins: Set<string>, baseOrigin: string): boolean {
  const requestOrigin = parseOrigin(url, baseOrigin);
  if (!requestOrigin) {
    return false;
  }
  // Same-origin requests (including relative URLs) hit the app's own server,
  // never a third party, so they are always trusted.
  return requestOrigin === baseOrigin || allowedOrigins.has(requestOrigin);
}

function withBearer<T>(request: HttpRequest<T>, token: string): HttpRequest<T> {
  return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
}

/** The login and refresh endpoints must never be retried by the refresh flow. */
function isAuthEndpoint(url: string, apiUrls: AuthUrlsConfig): boolean {
  return url === apiUrls.accessTokenUrl || (!!apiUrls.refreshTokenUrl && url === apiUrls.refreshTokenUrl);
}

function handle(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
  store: Store,
  apiUrls: AuthUrlsConfig,
  allowedOrigins: Set<string>,
  baseOrigin: string
): Observable<HttpEvent<unknown>> {
  const token = authService.getToken();
  const allowed = isAllowedUrl(request.url, allowedOrigins, baseOrigin);
  const refreshable = allowed && !isAuthEndpoint(request.url, apiUrls) && authService.canRefresh;

  const send = (t: Token | null) => next(t && allowed ? withBearer(request, t.token) : request);

  const refreshThen = (onFail: unknown) =>
    authService.refreshToken().pipe(
      switchMap((newToken) => {
        store.dispatch(AuthActions.refreshTokenSuccess({ payload: newToken }));
        return send(newToken);
      }),
      catchError((refreshError: unknown) => {
        const payload =
          refreshError instanceof HttpErrorResponse ? refreshError : (onFail as HttpErrorResponse);
        store.dispatch(AuthActions.refreshTokenFailure({ payload }));
        store.dispatch(AuthActions.logOut());
        return throwError(() => onFail);
      })
    );

  // Proactive: the JWT's `exp` is decoded into `token.expiringDate`; refresh
  // before sending if it's already inside the skew window. Saves the 401
  // round-trip in the common case.
  if (refreshable && token && token.expiringDate - Date.now() <= REFRESH_SKEW_MS) {
    return refreshThen(new HttpErrorResponse({ status: 401, statusText: 'Token expired' }));
  }

  // Reactive: server is the source of truth — clock skew or early revocation
  // still surface as a 401, so refresh-and-retry once.
  return send(token).pipe(
    catchError((error: unknown) => {
      const is401 = error instanceof HttpErrorResponse && error.status === 401;
      return is401 && refreshable ? refreshThen(error) : throwError(() => error);
    })
  );
}

/**
 * Functional HTTP interceptor that attaches the auth `Bearer` token to outgoing
 * requests **only** when the request targets the app's own origin or one of the
 * configured `AUTH_API_URLS` origins, preventing token leakage to third parties.
 *
 * When `refreshTokenUrl` is configured and a refresh token is stored, a `401`
 * response triggers a single shared refresh and the original request is retried
 * once with the new bearer. If the refresh itself fails, `LogOut` is dispatched.
 *
 * Register with:
 * ```ts
 * provideHttpClient(withInterceptors([tokenInterceptor]))
 * ```
 */
export const tokenInterceptor: HttpInterceptorFn = (request, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const store = inject(Store);
  const apiUrls = inject(AUTH_API_URLS);
  const baseOrigin = inject(DOCUMENT).location.origin;

  return handle(request, next, authService, store, apiUrls, buildAllowedOrigins(apiUrls), baseOrigin);
};
