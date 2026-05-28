import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, finalize, map, share, tap, throwError } from 'rxjs';

import { User, Token } from '../models/user.models';
import { AUTH_API_URLS } from '../token';

interface AccessTokenResponse {
  access: string;
  /** Optional long-lived refresh token (e.g. SimpleJWT, oauth2). */
  refresh?: string;
}

interface UserInformationResponse {
  user: User;
  usersList: User[];
}

const ACCESS_TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrls = inject(AUTH_API_URLS);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly http = inject(HttpClient);

  /** Single in-flight refresh shared across concurrent 401s. */
  private inflightRefresh$: Observable<Token> | null = null;

  public decodeToken(token: string, refreshToken?: string): Token {
    const tokenParts = token.split(/\./);
    const tokenDecoded = JSON.parse(globalThis.atob(tokenParts[1]));
    const expiringDate = new Date(tokenDecoded.exp * 1000);
    return { token, expiringDate, refreshToken };
  }

  public getToken(): Token | null {
    const token = isPlatformBrowser(this.platformId) ? sessionStorage.getItem(ACCESS_TOKEN_KEY) : null;
    return token ? this.decodeToken(token, this.getRefreshToken() ?? undefined) : null;
  }

  public getRefreshToken(): string | null {
    return isPlatformBrowser(this.platformId) ? sessionStorage.getItem(REFRESH_TOKEN_KEY) : null;
  }

  /**
   * True when refresh-token support is active: the app configured
   * `refreshTokenUrl` *and* a refresh token is currently stored.
   */
  public get canRefresh(): boolean {
    return !!this.apiUrls.refreshTokenUrl && !!this.getRefreshToken();
  }

  /** Persist (or clear) the token pair in sessionStorage. */
  public storeToken(token: Token | null): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (token) {
      sessionStorage.setItem(ACCESS_TOKEN_KEY, token.token);
      if (token.refreshToken) {
        sessionStorage.setItem(REFRESH_TOKEN_KEY, token.refreshToken);
      }
    } else {
      sessionStorage.removeItem(ACCESS_TOKEN_KEY);
      sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  }

  private getAccessToken(user: User): Observable<Token> {
    const body = { username: user.username, password: user.password };
    return this.http.post<AccessTokenResponse>(this.apiUrls.accessTokenUrl, body).pipe(
      map((tokenData) => this.decodeToken(tokenData.access, tokenData.refresh))
    );
  }

  /**
   * Exchange the stored refresh token for a fresh access token. The new pair is
   * persisted to sessionStorage before the observable emits, so an immediate
   * retry by the interceptor picks up the new bearer. Concurrent callers share
   * a single HTTP request.
   */
  public refreshToken(): Observable<Token> {
    if (this.inflightRefresh$) {
      return this.inflightRefresh$;
    }
    const refresh = this.getRefreshToken();
    if (!this.apiUrls.refreshTokenUrl || !refresh) {
      return throwError(() => new Error('Refresh token not available'));
    }
    this.inflightRefresh$ = this.http
      .post<AccessTokenResponse>(this.apiUrls.refreshTokenUrl, { refresh })
      .pipe(
        map((tokenData) => this.decodeToken(tokenData.access, tokenData.refresh ?? refresh)),
        tap((token) => this.storeToken(token)),
        finalize(() => (this.inflightRefresh$ = null)),
        share()
      );
    return this.inflightRefresh$;
  }

  public login(user: User): Observable<User> {
    return this.getAccessToken(user).pipe(
      map((token: Token) => ({
        ...user,
        token
      }))
    );
  }

  public getUserInformation(): Observable<{ user: User; usersList: User[] }> {
    return this.http.get<UserInformationResponse>(this.apiUrls.userInformationUrl).pipe(
      map((result) => ({
        usersList: result.usersList,
        user: { ...result.user, dateJoined: new Date(result.user.dateJoined) }
      }))
    );
  }

  public changePassword(passwordChanges: { currentPassword: string; nextPassword: string }): Observable<unknown> {
    return this.http.put<unknown>(this.apiUrls.changePasswordUrl!, passwordChanges);
  }

  public sendPassword(mail: string): Observable<unknown> {
    return this.http.post<unknown>(this.apiUrls.sendBackPasswordUrl, { email: mail });
  }

  public sendActivationCode(activationCode: string): Observable<unknown> {
    const params = new HttpParams().append('activationCode', activationCode);
    return this.http.get<unknown>(this.apiUrls.sendActivationCodeUrl!, { params });
  }

  public createUser(user: User): Observable<unknown> {
    return this.http.post<unknown>(this.apiUrls.signUpUrl!, user);
  }
}
