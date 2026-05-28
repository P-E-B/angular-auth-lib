import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AUTH_API_URLS, AuthModuleConfig } from '../token';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private readonly allowedOrigins = new Set<string>();
  private readonly authService: AuthService;

  constructor(
    authService: AuthService,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    @Inject(AUTH_API_URLS) apiUrls: AuthModuleConfig['urls']
  ) {
    this.authService = authService;
    for (const url of Object.values(apiUrls)) {
      const origin = url ? this.parseOrigin(url) : null;
      if (origin) {
        this.allowedOrigins.add(origin);
      }
    }
  }

  private parseOrigin(url: string, base?: string): string | null {
    try {
      return new URL(url, base).origin;
    } catch {
      return null;
    }
  }

  private isAllowedUrl(url: string): boolean {
    const baseOrigin = window.location.origin;
    const requestOrigin = this.parseOrigin(url, baseOrigin);
    if (!requestOrigin) {
      return false;
    }
    // Same-origin requests (including relative URLs) hit the app's own server,
    // never a third party, so they are always trusted.
    return requestOrigin === baseOrigin || this.allowedOrigins.has(requestOrigin);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    if (token && this.isAllowedUrl(request.url)) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token.token}`
        }
      });
    }
    return next.handle(request);
  }
}
