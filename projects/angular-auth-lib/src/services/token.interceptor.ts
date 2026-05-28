import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AUTH_API_URLS, AuthModuleConfig } from '../token';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private readonly allowedOrigins = new Set<string>();

  constructor(
    private authService: AuthService,
    @Inject(AUTH_API_URLS) apiUrls: AuthModuleConfig['urls']
  ) {
    for (const url of Object.values(apiUrls)) {
      if (url) {
        try {
          this.allowedOrigins.add(new URL(url).origin);
        } catch {
          // Skip unparseable config entries; they add no trusted origin.
        }
      }
    }
  }

  private isAllowedUrl(url: string): boolean {
    const baseOrigin = typeof window !== 'undefined' && window.location ? window.location.origin : '';
    let requestOrigin: string;
    try {
      requestOrigin = new URL(url, baseOrigin || undefined).origin;
    } catch {
      return false;
    }
    // Same-origin requests (including relative URLs) hit the app's own server,
    // never a third party, so they are always trusted.
    return requestOrigin === baseOrigin || this.allowedOrigins.has(requestOrigin);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
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
