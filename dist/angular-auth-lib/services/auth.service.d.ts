import { HttpClient } from '@angular/common/http';
import { User, Token } from '../models/user.models';
import { Observable } from 'rxjs';
import { AuthModuleConfig } from '../token';
export declare class AuthService {
    private apiUrls;
    private http;
    constructor(apiUrls: AuthModuleConfig['urls'], http: HttpClient);
    decodeToken(token: string): Token;
    getToken(): Token;
    private getAccessToken;
    private getRefreshToken;
    login(user: User): Observable<User>;
    getUserInformation(): Observable<{
        user: User;
        usersList: User[];
    }>;
    changePassword(passwordChanges: {
        currentPassword: string;
        nextPassword: string;
    }): Observable<Object>;
    sendPassword(mail: string): Observable<Object>;
    createUser(user: User): Observable<Object>;
}
