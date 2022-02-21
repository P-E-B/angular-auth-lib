import { __assign, __decorate, __param } from "tslib";
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AUTH_API_URLS } from '../token';
import { isPlatformBrowser } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "../token";
import * as i2 from "@angular/common/http";
var AuthService = /** @class */ (function () {
    function AuthService(apiUrls, platformId, http) {
        this.apiUrls = apiUrls;
        this.platformId = platformId;
        this.http = http;
    }
    AuthService.prototype.decodeToken = function (token) {
        var tokenParts = token.split(/\./);
        var tokenDecoded = JSON.parse(window.atob(tokenParts[1]));
        var expiringDate = new Date(tokenDecoded.exp * 1000);
        return { token: token, expiringDate: expiringDate };
    };
    AuthService.prototype.getToken = function () {
        var token = isPlatformBrowser(this.platformId) ? sessionStorage.getItem('token') : null;
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
    AuthService.prototype.sendActivationCode = function (activationCode) {
        var params = new HttpParams().append('activationCode', activationCode);
        return this.http.get(this.apiUrls.sendActivationCodeUrl, { params: params });
    };
    AuthService.prototype.createUser = function (user) {
        return this.http.post(this.apiUrls.signUpUrl, user);
    };
    AuthService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_API_URLS,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: HttpClient }
    ]; };
    AuthService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AuthService_Factory() { return new AuthService(i0.ɵɵinject(i1.AUTH_API_URLS), i0.ɵɵinject(i0.PLATFORM_ID), i0.ɵɵinject(i2.HttpClient)); }, token: AuthService, providedIn: "root" });
    AuthService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(0, Inject(AUTH_API_URLS)),
        __param(1, Inject(PLATFORM_ID))
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1hdXRoLWxpYi8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2F1dGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFOUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxhQUFhLEVBQW9CLE1BQU0sVUFBVSxDQUFDO0FBQzNELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7O0FBTXBEO0lBRUUscUJBQ2lDLE9BQWlDLEVBQ25DLFVBQWUsRUFDcEMsSUFBZ0I7UUFGTyxZQUFPLEdBQVAsT0FBTyxDQUEwQjtRQUNuQyxlQUFVLEdBQVYsVUFBVSxDQUFLO1FBQ3BDLFNBQUksR0FBSixJQUFJLENBQVk7SUFDdEIsQ0FBQztJQUVFLGlDQUFXLEdBQWxCLFVBQW1CLEtBQWE7UUFDOUIsSUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RCxJQUFNLFlBQVksR0FBRyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsQ0FBQztJQUN0RCxDQUFDO0lBRU0sOEJBQVEsR0FBZjtRQUNFLElBQU0sS0FBSyxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FB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RUFBRSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELGdDQUFVLEdBQVYsVUFBVyxJQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEQsQ0FBQzs7Z0RBaEVFLE1BQU0sU0FBQyxhQUFhO2dEQUNwQixNQUFNLFNBQUMsV0FBVztnQkFDTCxVQUFVOzs7SUFMZixXQUFXO1FBSHZCLFVBQVUsQ0FBQztZQUNWLFVBQVUsRUFBRSxNQUFNO1NBQ25CLENBQUM7UUFJRyxXQUFBLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUNyQixXQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtPQUpYLFdBQVcsQ0FvRXZCO3NCQWhGRDtDQWdGQyxBQXBFRCxJQW9FQztTQXBFWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFVzZXIsIFRva2VuIH0gZnJvbSAnLi4vbW9kZWxzL3VzZXIubW9kZWxzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFVVEhfQVBJX1VSTFMsIEF1dGhNb2R1bGVDb25maWcgfSBmcm9tICcuLi90b2tlbic7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoQVVUSF9BUElfVVJMUykgcHJpdmF0ZSBhcGlVcmxzOiBBdXRoTW9kdWxlQ29uZmlnWyd1cmxzJ10sXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnksXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50XG4gICkgeyB9XG5cbiAgcHVibGljIGRlY29kZVRva2VuKHRva2VuOiBzdHJpbmcpOiBUb2tlbiB7XG4gICAgY29uc3QgdG9rZW5QYXJ0cyA9IHRva2VuLnNwbGl0KC9cXC4vKTtcbiAgICBjb25zdCB0b2tlbkRlY29kZWQgPSBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKHRva2VuUGFydHNbMV0pKTtcbiAgICBjb25zdCBleHBpcmluZ0RhdGUgPSBuZXcgRGF0ZSh0b2tlbkRlY29kZWQuZXhwICogMTAwMCk7XG4gICAgcmV0dXJuIHsgdG9rZW46IHRva2VuLCBleHBpcmluZ0RhdGU6IGV4cGlyaW5nRGF0ZSB9O1xuICB9XG5cbiAgcHVibGljIGdldFRva2VuKCk6IFRva2VuIHtcbiAgICBjb25zdCB0b2tlbiA9IGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkgPyBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpIDogbnVsbDtcbiAgICByZXR1cm4gdG9rZW4gPyB0aGlzLmRlY29kZVRva2VuKHRva2VuKSA6IG51bGw7XG4gIH1cblxuICBwcml2YXRlIGdldEFjY2Vzc1Rva2VuKHVzZXI6IFVzZXIpOiBPYnNlcnZhYmxlPFRva2VuPiB7XG4gICAgY29uc3QgYm9keSA9IHsgdXNlcm5hbWU6IHVzZXIudXNlcm5hbWUsIHBhc3N3b3JkOiB1c2VyLnBhc3N3b3JkIH07XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYXBpVXJscy5hY2Nlc3NUb2tlblVybCwgYm9keSkucGlwZShcbiAgICAgIG1hcCgodG9rZW5EYXRhOiBhbnkpID0+IHRoaXMuZGVjb2RlVG9rZW4odG9rZW5EYXRhWydhY2Nlc3MnXSkpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UmVmcmVzaFRva2VuKHRva2VuOiBUb2tlbik6IE9ic2VydmFibGU8VG9rZW4+IHtcbiAgICBjb25zdCBib2R5ID0geyByZWZyZXNoOiB0b2tlbi50b2tlbiB9O1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLmFwaVVybHMucmVmcmVzaFRva2VuVXJsLCBib2R5KS5waXBlKFxuICAgICAgbWFwKCh0b2tlbkRhdGE6IGFueSkgPT4gdGhpcy5kZWNvZGVUb2tlbih0b2tlbkRhdGFbJ2FjY2VzcyddKSlcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGxvZ2luKHVzZXI6IFVzZXIpOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRBY2Nlc3NUb2tlbih1c2VyKS5waXBlKFxuICAgICAgbWFwKCh0b2tlbjogVG9rZW4pID0+ICh7XG4gICAgICAgIC4uLnVzZXIsXG4gICAgICAgIHRva2VuOiB0b2tlblxuICAgICAgfSkpXG4gICAgKTtcbiAgfVxuXG4gIGdldFVzZXJJbmZvcm1hdGlvbigpOiBPYnNlcnZhYmxlPHsgdXNlcjogVXNlciwgdXNlcnNMaXN0OiBVc2VyW10gfT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYXBpVXJscy51c2VySW5mb3JtYXRpb25VcmwpLnBpcGUoXG4gICAgICBtYXAoKHJlc3VsdDogYW55KSA9PiAoe1xuICAgICAgICB1c2Vyc0xpc3Q6IHJlc3VsdC51c2Vyc0xpc3QsXG4gICAgICAgIHVzZXI6IHsgLi4ucmVzdWx0LnVzZXIsIGRhdGVKb2luZWQ6IG5ldyBEYXRlKHJlc3VsdC51c2VyLmRhdGVKb2luZWQpIH1cbiAgICAgIH0pKVxuICAgICk7XG4gIH1cblxuICBjaGFuZ2VQYXNzd29yZChwYXNzd29yZENoYW5nZXM6IHsgY3VycmVudFBhc3N3b3JkOiBzdHJpbmcsIG5leHRQYXNzd29yZDogc3RyaW5nIH0pIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnB1dCh0aGlzLmFwaVVybHMuY2hhbmdlUGFzc3dvcmRVcmwsIHBhc3N3b3JkQ2hhbmdlcyk7XG4gIH1cblxuICBzZW5kUGFzc3dvcmQobWFpbDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYXBpVXJscy5zZW5kQmFja1Bhc3N3b3JkVXJsLCB7IGVtYWlsOiBtYWlsIH0pO1xuICB9XG5cbiAgc2VuZEFjdGl2YXRpb25Db2RlKGFjdGl2YXRpb25Db2RlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBuZXcgSHR0cFBhcmFtcygpLmFwcGVuZCgnYWN0aXZhdGlvbkNvZGUnLCBhY3RpdmF0aW9uQ29kZSk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5hcGlVcmxzLnNlbmRBY3RpdmF0aW9uQ29kZVVybCwgeyBwYXJhbXMgfSk7XG4gIH1cblxuICBjcmVhdGVVc2VyKHVzZXI6IFVzZXIpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5hcGlVcmxzLnNpZ25VcFVybCwgdXNlcik7XG4gIH1cbn1cbiJdfQ==