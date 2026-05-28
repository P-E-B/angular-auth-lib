import { inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { AUTH_API_URLS, AuthModuleConfig } from '../token';

function parseOrigin(url: string, base?: string): string | null {
  try {
    return new URL(url, base).origin;
  } catch {
    return null;
  }
}

function buildAllowedOrigins(apiUrls: AuthModuleConfig['urls']): Set<string> {
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

/**
 * Functional HTTP interceptor that attaches the auth `Bearer` token to outgoing
 * requests **only** when the request targets the app's own origin or one of the
 * configured `AUTH_API_URLS` origins, preventing token leakage to third parties.
 *
 * Register with:
 * ```ts
 * provideHttpClient(withInterceptors([tokenInterceptor]))
 * ```
 */
export const tokenInterceptor: HttpInterceptorFn = (request, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const apiUrls = inject(AUTH_API_URLS);
  const baseOrigin = inject(DOCUMENT).location.origin;

  const token = authService.getToken();
  if (token && isAllowedUrl(request.url, buildAllowedOrigins(apiUrls), baseOrigin)) {
    request = request.clone({
      setHeaders: { Authorization: `Bearer ${token.token}` }
    });
  }
  return next(request);
};

/**
 * @deprecated Use the functional {@link tokenInterceptor} with
 * `provideHttpClient(withInterceptors([tokenInterceptor]))` instead.
 * This class is kept for backward compatibility with `HTTP_INTERCEPTORS`
 * (`withInterceptorsFromDi()`).
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private readonly authService = inject(AuthService);
  private readonly allowedOrigins = buildAllowedOrigins(inject(AUTH_API_URLS));
  private readonly baseOrigin = inject(DOCUMENT).location.origin;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    if (token && isAllowedUrl(request.url, this.allowedOrigins, this.baseOrigin)) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token.token}` }
      });
    }
    return next.handle(request);
  }
}
