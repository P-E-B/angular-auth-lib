import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Token } from '../models/user.models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AUTH_API_URLS, AuthModuleConfig } from '../token';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject(AUTH_API_URLS) private apiUrls: AuthModuleConfig['urls'],
    @Inject(PLATFORM_ID) private platformId: any,
    private http: HttpClient
  ) { }

  public decodeToken(token: string): Token {
    const tokenParts = token.split(/\./);
    const tokenDecoded = JSON.parse(window.atob(tokenParts[1]));
    const expiringDate = new Date(tokenDecoded.exp * 1000);
    return { token: token, expiringDate: expiringDate };
  }

  public getToken(): Token {
    const token = isPlatformBrowser(this.platformId) ? sessionStorage.getItem('token') : null;
    return token ? this.decodeToken(token) : null;
  }

  private getAccessToken(user: User): Observable<Token> {
    const body = { username: user.username, password: user.password };
    return this.http.post(this.apiUrls.accessTokenUrl, body).pipe(
      map((tokenData: any) => this.decodeToken(tokenData['access']))
    );
  }

  private getRefreshToken(token: Token): Observable<Token> {
    const body = { refresh: token.token };
    return this.http.post(this.apiUrls.refreshTokenUrl, body).pipe(
      map((tokenData: any) => this.decodeToken(tokenData['access']))
    );
  }

  public login(user: User): Observable<User> {
    return this.getAccessToken(user).pipe(
      map((token: Token) => ({
        ...user,
        token: token
      }))
    );
  }

  getUserInformation(): Observable<{ user: User, usersList: User[] }> {
    return this.http.get(this.apiUrls.userInformationUrl).pipe(
      map((result: any) => ({
        usersList: result.usersList,
        user: { ...result.user, dateJoined: new Date(result.user.dateJoined) }
      }))
    );
  }

  changePassword(passwordChanges: { currentPassword: string, nextPassword: string }) {
    return this.http.put(this.apiUrls.changePasswordUrl, passwordChanges);
  }

  sendPassword(mail: string) {
    return this.http.post(this.apiUrls.sendBackPasswordUrl, { email: mail });
  }

  createUser(user: User) {
    return this.http.post(this.apiUrls.signUpUrl, user);
  }
}
