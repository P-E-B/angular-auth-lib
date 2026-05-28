import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, map } from 'rxjs';

import { User, Token } from '../models/user.models';
import { AUTH_API_URLS } from '../token';

interface AccessTokenResponse {
  access: string;
}

interface UserInformationResponse {
  user: User;
  usersList: User[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrls = inject(AUTH_API_URLS);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly http = inject(HttpClient);

  public decodeToken(token: string): Token {
    const tokenParts = token.split(/\./);
    const tokenDecoded = JSON.parse(globalThis.atob(tokenParts[1]));
    const expiringDate = new Date(tokenDecoded.exp * 1000);
    return { token, expiringDate };
  }

  public getToken(): Token | null {
    const token = isPlatformBrowser(this.platformId) ? sessionStorage.getItem('token') : null;
    return token ? this.decodeToken(token) : null;
  }

  private getAccessToken(user: User): Observable<Token> {
    const body = { username: user.username, password: user.password };
    return this.http.post<AccessTokenResponse>(this.apiUrls.accessTokenUrl, body).pipe(
      map((tokenData) => this.decodeToken(tokenData.access))
    );
  }

  private getRefreshToken(token: Token): Observable<Token> {
    const body = { refresh: token.token };
    return this.http.post<AccessTokenResponse>(this.apiUrls.refreshTokenUrl!, body).pipe(
      map((tokenData) => this.decodeToken(tokenData.access))
    );
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
