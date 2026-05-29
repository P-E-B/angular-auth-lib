import { inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

import { AuthService } from './auth.service';
import { Token } from '../models/user.models';
import { AUTH_API_URLS, AUTH_BEHAVIOR, AuthBehaviorConfig, AuthUrlsConfig } from '../token';
import { AuthActions } from '../store/actions';

const DEFAULT_REFRESH_SKEW_MS = 30_000;

function parseOrigin(url: string, base?: string): string | null {
  try {
    return new URL(url, base).origin;
  } catch {
    return null;
  }
}

function buildAllowedOrigins(apiUrls: AuthUrlsConfig, extra: string[] | undefined): Set<string> {
  const allowed = new Set<string>();
  for (const url of [...Object.values(apiUrls), ...(extra ?? [])]) {
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

/** The login and refresh endpoints must never be retried by the refresh flow. */
function isAuthEndpoint(url: string, apiUrls: AuthUrlsConfig): boolean {
  return url === apiUrls.accessTokenUrl || (!!apiUrls.refreshTokenUrl && url === apiUrls.refreshTokenUrl);
}

interface InterceptorContext {
  readonly authService: AuthService;
  readonly store: Store;
  readonly apiUrls: AuthUrlsConfig;
  readonly behavior: AuthBehaviorConfig;
  readonly allowedOrigins: Set<string>;
  readonly baseOrigin: string;
}

function handle(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  ctx: InterceptorContext
): Observable<HttpEvent<unknown>> {
  const token = ctx.authService.getToken();
  const allowed = isAllowedUrl(request.url, ctx.allowedOrigins, ctx.baseOrigin);
  const refreshable = allowed && !isAuthEndpoint(request.url, ctx.apiUrls) && ctx.authService.canRefresh;
  const skew = ctx.behavior.refreshSkewMs ?? DEFAULT_REFRESH_SKEW_MS;

  const send = (t: Token | null) => {
    if (!t || !allowed) {
      return next(request);
    }
    const headers = ctx.behavior.authHeader?.(t.token) ?? { Authorization: `Bearer ${t.token}` };
    return next(request.clone({ setHeaders: headers }));
  };

  const refreshThen = (onFail: unknown) =>
    ctx.authService.refreshToken().pipe(
      switchMap((newToken) => {
        ctx.store.dispatch(AuthActions.refreshTokenSuccess({ payload: newToken }));
        return send(newToken);
      }),
      catchError((refreshError: unknown) => {
        const payload =
          refreshError instanceof HttpErrorResponse ? refreshError : (onFail as HttpErrorResponse);
        ctx.store.dispatch(AuthActions.refreshTokenFailure({ payload }));
        ctx.store.dispatch(AuthActions.logOut());
        return throwError(() => onFail);
      })
    );

  // Proactive: the JWT's `exp` is decoded into `token.expiringDate`; refresh
  // before sending if it's already inside the skew window. Saves the 401
  // round-trip in the common case.
  if (refreshable && token && token.expiringDate - Date.now() <= skew) {
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
 * Functional HTTP interceptor that attaches the auth header to outgoing
 * requests **only** when the request targets the app's own origin, one of the
 * configured `AUTH_API_URLS` origins, or an origin in
 * `behavior.allowedOrigins` — preventing token leakage to third parties.
 *
 * When `refreshTokenUrl` is configured and a refresh token is stored, an
 * expiring token or a `401` response triggers a single shared refresh and the
 * original request is retried once with the new token. If the refresh itself
 * fails, `AuthActions.logOut` is dispatched.
 *
 * Register with:
 * ```ts
 * provideHttpClient(withInterceptors([tokenInterceptor]))
 * ```
 */
export const tokenInterceptor: HttpInterceptorFn = (request, next: HttpHandlerFn) => {
  const apiUrls = inject(AUTH_API_URLS);
  const behavior = inject(AUTH_BEHAVIOR);
  const ctx: InterceptorContext = {
    authService: inject(AuthService),
    store: inject(Store),
    apiUrls,
    behavior,
    baseOrigin: inject(DOCUMENT).location.origin,
    allowedOrigins: buildAllowedOrigins(apiUrls, behavior.allowedOrigins),
  };
  return handle(request, next, ctx);
};
