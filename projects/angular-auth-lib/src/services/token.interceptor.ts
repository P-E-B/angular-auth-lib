import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AUTH_API_URLS, AuthModuleConfig } from '../token';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private allowedOrigins: Set<string>;

  constructor(
    private authService: AuthService,
    @Inject(AUTH_API_URLS) apiUrls: AuthModuleConfig['urls']
  ) {
    this.allowedOrigins = new Set<string>();
    for (const url of Object.values(apiUrls)) {
      if (url) {
        try {
          this.allowedOrigins.add(new URL(url).origin);
        } catch {
          // Relative URLs target the same origin — handled in isAllowedUrl
        }
      }
    }
  }

  private isAllowedUrl(url: string): boolean {
    try {
      return this.allowedOrigins.has(new URL(url).origin);
    } catch {
      return true;
    }
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
