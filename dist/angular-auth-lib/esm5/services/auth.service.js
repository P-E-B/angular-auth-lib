import { __assign, __decorate, __param } from "tslib";
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AUTH_API_URLS } from '../token';
import * as i0 from "@angular/core";
import * as i1 from "../token";
import * as i2 from "@angular/common/http";
var AuthService = /** @class */ (function () {
    function AuthService(apiUrls, http) {
        this.apiUrls = apiUrls;
        this.http = http;
    }
    AuthService.prototype.decodeToken = function (token) {
        var tokenParts = token.split(/\./);
        var tokenDecoded = JSON.parse(window.atob(tokenParts[1]));
        var expiringDate = new Date(tokenDecoded.exp * 1000);
        return { token: token, expiringDate: expiringDate };
    };
    AuthService.prototype.getToken = function () {
        var token = sessionStorage.getItem('token');
        return token ? this.decodeToken(token) : null;
    };
    AuthService.prototype.getAccessToken = function (user) {
        var _this = this;
        var body = { username: user.username, password: user.password };
        return this.http.post(this.apiUrls.accessTokenUrl, body).pipe(map(function (tokenData) { return _this.decodeToken(tokenData['access']); }));
    };
    AuthService.prototype.getRefreshToken = function (token) {
        var _this = this;
        var body = { refresh: token.token };
        return this.http.post(this.apiUrls.refreshTokenUrl, body).pipe(map(function (tokenData) { return _this.decodeToken(tokenData['access']); }));
    };
    AuthService.prototype.login = function (user) {
        return this.getAccessToken(user).pipe(map(function (token) { return (__assign(__assign({}, user), { token: token })); }));
    };
    AuthService.prototype.getUserInformation = function () {
        return this.http.get(this.apiUrls.userInformationUrl).pipe(map(function (result) { return ({
            usersList: result.usersList,
            user: __assign(__assign({}, result.user), { dateJoined: new Date(result.user.dateJoined) })
        }); }));
    };
    AuthService.prototype.changePassword = function (passwordChanges) {
        return this.http.put(this.apiUrls.changePasswordUrl, passwordChanges);
    };
    AuthService.prototype.sendPassword = function (mail) {
        return this.http.post(this.apiUrls.sendBackPasswordUrl, { email: mail });
    };
    AuthService.prototype.createUser = function (user) {
        return this.http.post(this.apiUrls.signUpUrl, user);
    };
    AuthService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_API_URLS,] }] },
        { type: HttpClient }
    ]; };
    AuthService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AuthService_Factory() { return new AuthService(i0.ɵɵinject(i1.AUTH_API_URLS), i0.ɵɵinject(i2.HttpClient)); }, token: AuthService, providedIn: "root" });
    AuthService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(0, Inject(AUTH_API_URLS))
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1hdXRoLWxpYi8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2F1dGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWxELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsYUFBYSxFQUFvQixNQUFNLFVBQVUsQ0FBQzs7OztBQU0zRDtJQUVFLHFCQUNpQyxPQUFpQyxFQUN4RCxJQUFnQjtRQURPLFlBQU8sR0FBUCxPQUFPLENBQTBCO1FBQ3hELFNBQUksR0FBSixJQUFJLENBQVk7SUFDdEIsQ0FBQztJQUVFLGlDQUFXLEdBQWxCLFVBQW1CLEtBQWE7UUFDOUIsSUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RCxJQUFNLFlBQVksR0FBRyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsQ0FBQztJQUN0RCxDQUFDO0lBRU0sOEJBQVEsR0FBZjtRQUNFLElBQU0sS0FBSyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJ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bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFVzZXIsIFRva2VuIH0gZnJvbSAnLi4vbW9kZWxzL3VzZXIubW9kZWxzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFVVEhfQVBJX1VSTFMsIEF1dGhNb2R1bGVDb25maWcgfSBmcm9tICcuLi90b2tlbic7XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoQVVUSF9BUElfVVJMUykgcHJpdmF0ZSBhcGlVcmxzOiBBdXRoTW9kdWxlQ29uZmlnWyd1cmxzJ10sXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50XG4gICkgeyB9XG5cbiAgcHVibGljIGRlY29kZVRva2VuKHRva2VuOiBzdHJpbmcpOiBUb2tlbiB7XG4gICAgY29uc3QgdG9rZW5QYXJ0cyA9IHRva2VuLnNwbGl0KC9cXC4vKTtcbiAgICBjb25zdCB0b2tlbkRlY29kZWQgPSBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKHRva2VuUGFydHNbMV0pKTtcbiAgICBjb25zdCBleHBpcmluZ0RhdGUgPSBuZXcgRGF0ZSh0b2tlbkRlY29kZWQuZXhwICogMTAwMCk7XG4gICAgcmV0dXJuIHsgdG9rZW46IHRva2VuLCBleHBpcmluZ0RhdGU6IGV4cGlyaW5nRGF0ZSB9O1xuICB9XG5cbiAgcHVibGljIGdldFRva2VuKCk6IFRva2VuIHtcbiAgICBjb25zdCB0b2tlbiA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7XG4gICAgcmV0dXJuIHRva2VuID8gdGhpcy5kZWNvZGVUb2tlbih0b2tlbikgOiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRBY2Nlc3NUb2tlbih1c2VyOiBVc2VyKTogT2JzZXJ2YWJsZTxUb2tlbj4ge1xuICAgIGNvbnN0IGJvZHkgPSB7IHVzZXJuYW1lOiB1c2VyLnVzZXJuYW1lLCBwYXNzd29yZDogdXNlci5wYXNzd29yZCB9O1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmFwaVVybHMuYWNjZXNzVG9rZW5VcmwsIGJvZHkpLnBpcGUoXG4gICAgICBtYXAoKHRva2VuRGF0YTogYW55KSA9PiB0aGlzLmRlY29kZVRva2VuKHRva2VuRGF0YVsnYWNjZXNzJ10pKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGdldFJlZnJlc2hUb2tlbih0b2tlbjogVG9rZW4pOiBPYnNlcnZhYmxlPFRva2VuPiB7XG4gICAgY29uc3QgYm9keSA9IHsgcmVmcmVzaDogdG9rZW4udG9rZW4gfTtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5hcGlVcmxzLnJlZnJlc2hUb2tlblVybCwgYm9keSkucGlwZShcbiAgICAgIG1hcCgodG9rZW5EYXRhOiBhbnkpID0+IHRoaXMuZGVjb2RlVG9rZW4odG9rZW5EYXRhWydhY2Nlc3MnXSkpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBsb2dpbih1c2VyOiBVc2VyKTogT2JzZXJ2YWJsZTxVc2VyPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QWNjZXNzVG9rZW4odXNlcikucGlwZShcbiAgICAgIG1hcCgodG9rZW46IFRva2VuKSA9PiAoe1xuICAgICAgICAuLi51c2VyLFxuICAgICAgICB0b2tlbjogdG9rZW5cbiAgICAgIH0pKVxuICAgICk7XG4gIH1cblxuICBnZXRVc2VySW5mb3JtYXRpb24oKTogT2JzZXJ2YWJsZTx7IHVzZXI6IFVzZXIsIHVzZXJzTGlzdDogVXNlcltdIH0+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmFwaVVybHMudXNlckluZm9ybWF0aW9uVXJsKS5waXBlKFxuICAgICAgbWFwKChyZXN1bHQ6IGFueSkgPT4gKHtcbiAgICAgICAgdXNlcnNMaXN0OiByZXN1bHQudXNlcnNMaXN0LFxuICAgICAgICB1c2VyOiB7IC4uLnJlc3VsdC51c2VyLCBkYXRlSm9pbmVkOiBuZXcgRGF0ZShyZXN1bHQudXNlci5kYXRlSm9pbmVkKSB9XG4gICAgICB9KSlcbiAgICApO1xuICB9XG5cbiAgY2hhbmdlUGFzc3dvcmQocGFzc3dvcmRDaGFuZ2VzOiB7IGN1cnJlbnRQYXNzd29yZDogc3RyaW5nLCBuZXh0UGFzc3dvcmQ6IHN0cmluZyB9KSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodGhpcy5hcGlVcmxzLmNoYW5nZVBhc3N3b3JkVXJsLCBwYXNzd29yZENoYW5nZXMpO1xuICB9XG5cbiAgc2VuZFBhc3N3b3JkKG1haWw6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmFwaVVybHMuc2VuZEJhY2tQYXNzd29yZFVybCwgeyBlbWFpbDogbWFpbCB9KTtcbiAgfVxuXG4gIGNyZWF0ZVVzZXIodXNlcjogVXNlcikge1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmFwaVVybHMuc2lnblVwVXJsLCB1c2VyKTtcbiAgfVxufVxuIl19