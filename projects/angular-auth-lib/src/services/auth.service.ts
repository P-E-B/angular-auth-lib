import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize, map, of, share, tap, throwError } from 'rxjs';

import { Token } from '../models/user.models';
import { AUTH_API_URLS, AUTH_BEHAVIOR, AUTH_TOKEN_STORAGE } from '../token';

interface AccessTokenResponse {
  access: string;
  /** Optional long-lived refresh token (e.g. SimpleJWT, oauth2). */
  refresh?: string;
}

const ACCESS_TOKEN_KEY = 'angular-auth-lib.token';
const REFRESH_TOKEN_KEY = 'angular-auth-lib.refreshToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrls = inject(AUTH_API_URLS);
  private readonly behavior = inject(AUTH_BEHAVIOR);
  private readonly storage = inject(AUTH_TOKEN_STORAGE);
  private readonly http = inject(HttpClient);

  /** Single in-flight refresh shared across concurrent 401s. */
  private inflightRefresh$: Observable<Token> | null = null;

  /**
   * Decode a raw token-endpoint response into a {@link Token}. Uses
   * `behavior.tokenAdapter.parse` when supplied; otherwise expects
   * `{ access, refresh? }` with a JWT `exp` claim. Returns `null` when the
   * payload can't be parsed (malformed, opaque, no `exp`) so callers degrade
   * to reactive-401 refresh instead of throwing.
   */
  public decodeToken(raw: unknown): Token | null {
    if (this.behavior.tokenAdapter) {
      try {
        return this.behavior.tokenAdapter.parse(raw);
      } catch {
        return null;
      }
    }
    const body = raw as AccessTokenResponse | null;
    if (!body?.access) {
      return null;
    }
    try {
      const payload = JSON.parse(globalThis.atob(body.access.split('.')[1]));
      return { token: body.access, expiringDate: payload.exp * 1000, refreshToken: body.refresh };
    } catch {
      return null;
    }
  }

  public getToken(): Token | null {
    const access = this.storage.getItem(ACCESS_TOKEN_KEY);
    if (!access) {
      return null;
    }
    const refresh = this.getRefreshToken() ?? undefined;
    const token = this.decodeToken({ access, refresh });
    if (!token) {
      // Stored value is unparseable — clear it so we don't retry forever.
      this.storeToken(null);
    }
    return token;
  }

  public getRefreshToken(): string | null {
    return this.storage.getItem(REFRESH_TOKEN_KEY);
  }

  /**
   * True when refresh-token support is active: the app configured
   * `refreshTokenUrl` *and* a refresh token is currently stored.
   */
  public get canRefresh(): boolean {
    return !!this.apiUrls.refreshTokenUrl && !!this.getRefreshToken();
  }

  /** Persist (or clear) the token pair. */
  public storeToken(token: Token | null): void {
    if (token) {
      this.storage.setItem(ACCESS_TOKEN_KEY, token.token);
      if (token.refreshToken) {
        this.storage.setItem(REFRESH_TOKEN_KEY, token.refreshToken);
      }
    } else {
      this.storage.removeItem(ACCESS_TOKEN_KEY);
      this.storage.removeItem(REFRESH_TOKEN_KEY);
    }
  }

  /**
   * Exchange credentials for an access (+ optional refresh) token. The body is
   * posted verbatim — the library never inspects it.
   */
  public login(credentials: unknown): Observable<Token> {
    return this.http.post(this.apiUrls.accessTokenUrl, credentials).pipe(
      map((raw) => {
        const token = this.decodeToken(raw);
        if (!token) {
          throw new Error('angular-auth-lib: token endpoint returned an unparseable response');
        }
        return token;
      })
    );
  }

  /**
   * Exchange the stored refresh token for a fresh access token. The new pair is
   * persisted before the observable emits, so an immediate retry by the
   * interceptor picks up the new bearer. Concurrent callers share a single
   * HTTP request.
   */
  public refreshToken(): Observable<Token> {
    if (this.inflightRefresh$) {
      return this.inflightRefresh$;
    }
    const refresh = this.getRefreshToken();
    if (!this.apiUrls.refreshTokenUrl || !refresh) {
      return throwError(() => new Error('Refresh token not available'));
    }
    const body = this.behavior.tokenAdapter?.buildRefreshBody?.(refresh) ?? { refresh };
    this.inflightRefresh$ = this.http.post(this.apiUrls.refreshTokenUrl, body).pipe(
      map((raw) => {
        const token = this.decodeToken(raw);
        if (!token) {
          throw new Error('angular-auth-lib: refresh endpoint returned an unparseable response');
        }
        // Preserve the existing refresh token if the server didn't rotate it.
        return token.refreshToken ? token : { ...token, refreshToken: refresh };
      }),
      tap((token) => this.storeToken(token)),
      finalize(() => (this.inflightRefresh$ = null)),
      share()
    );
    return this.inflightRefresh$;
  }

  /**
   * Invalidate the session server-side via `logoutUrl` (if configured), then
   * clear local storage. Always completes successfully — a failed logout call
   * still clears the client; the server's refresh token may simply linger
   * until expiry.
   */
  public logout(): Observable<void> {
    const refresh = this.getRefreshToken();
    const call$ =
      this.apiUrls.logoutUrl && refresh
        ? this.http.post<void>(this.apiUrls.logoutUrl, { refresh })
        : of(void 0);
    return call$.pipe(finalize(() => this.storeToken(null)));
  }

  /**
   * Fetch the authenticated user's record from `userInformationUrl`. The
   * library treats the response body as opaque and stores it verbatim in the
   * auth feature state; consumers retrieve it typed via `selectAuthUser<T>()`.
   */
  public getUserInformation<TUser = unknown>(): Observable<TUser> {
    return this.http.get<TUser>(this.apiUrls.userInformationUrl!);
  }
}
