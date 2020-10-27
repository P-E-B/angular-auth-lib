import { __assign, __decorate, __param } from "tslib";
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1hdXRoLWxpYi8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2F1dGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVsRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckMsT0FBTyxFQUFFLGFBQWEsRUFBb0IsTUFBTSxVQUFVLENBQUM7QUFDM0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFNcEQ7SUFFRSxxQkFDaUMsT0FBaUMsRUFDbkMsVUFBZSxFQUNwQyxJQUFnQjtRQUZPLFlBQU8sR0FBUCxPQUFPLENBQTBCO1FBQ25DLGVBQVUsR0FBVixVQUFVLENBQUs7UUFDcEMsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUN0QixDQUFDO0lBRUUsaUNBQVcsR0FBbEIsVUFBbUIsS0FBYTtRQUM5QixJQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVELElBQU0sWUFBWSxHQUFHLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDdkQsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxDQUFDO0lBQ3RELENBQUM7SUFFTSw4QkFBUSxHQUFmO1FBQ0UsSUFBTSxLQUFLLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FB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O1lBQ1YsVUFBVSxFQUFFLE1BQU07U0FDbkIsQ0FBQztRQUlHLFdBQUEsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ3JCLFdBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO09BSlgsV0FBVyxDQStEdkI7c0JBM0VEO0NBMkVDLEFBL0RELElBK0RDO1NBL0RZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgVXNlciwgVG9rZW4gfSBmcm9tICcuLi9tb2RlbHMvdXNlci5tb2RlbHMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQVVUSF9BUElfVVJMUywgQXV0aE1vZHVsZUNvbmZpZyB9IGZyb20gJy4uL3Rva2VuJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChBVVRIX0FQSV9VUkxTKSBwcml2YXRlIGFwaVVybHM6IEF1dGhNb2R1bGVDb25maWdbJ3VybHMnXSxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSxcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnRcbiAgKSB7IH1cblxuICBwdWJsaWMgZGVjb2RlVG9rZW4odG9rZW46IHN0cmluZyk6IFRva2VuIHtcbiAgICBjb25zdCB0b2tlblBhcnRzID0gdG9rZW4uc3BsaXQoL1xcLi8pO1xuICAgIGNvbnN0IHRva2VuRGVjb2RlZCA9IEpTT04ucGFyc2Uod2luZG93LmF0b2IodG9rZW5QYXJ0c1sxXSkpO1xuICAgIGNvbnN0IGV4cGlyaW5nRGF0ZSA9IG5ldyBEYXRlKHRva2VuRGVjb2RlZC5leHAgKiAxMDAwKTtcbiAgICByZXR1cm4geyB0b2tlbjogdG9rZW4sIGV4cGlyaW5nRGF0ZTogZXhwaXJpbmdEYXRlIH07XG4gIH1cblxuICBwdWJsaWMgZ2V0VG9rZW4oKTogVG9rZW4ge1xuICAgIGNvbnN0IHRva2VuID0gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSA/IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykgOiBudWxsO1xuICAgIHJldHVybiB0b2tlbiA/IHRoaXMuZGVjb2RlVG9rZW4odG9rZW4pIDogbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0QWNjZXNzVG9rZW4odXNlcjogVXNlcik6IE9ic2VydmFibGU8VG9rZW4+IHtcbiAgICBjb25zdCBib2R5ID0geyB1c2VybmFtZTogdXNlci51c2VybmFtZSwgcGFzc3dvcmQ6IHVzZXIucGFzc3dvcmQgfTtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5hcGlVcmxzLmFjY2Vzc1Rva2VuVXJsLCBib2R5KS5waXBlKFxuICAgICAgbWFwKCh0b2tlbkRhdGE6IGFueSkgPT4gdGhpcy5kZWNvZGVUb2tlbih0b2tlbkRhdGFbJ2FjY2VzcyddKSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSZWZyZXNoVG9rZW4odG9rZW46IFRva2VuKTogT2JzZXJ2YWJsZTxUb2tlbj4ge1xuICAgIGNvbnN0IGJvZHkgPSB7IHJlZnJlc2g6IHRva2VuLnRva2VuIH07XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYXBpVXJscy5yZWZyZXNoVG9rZW5VcmwsIGJvZHkpLnBpcGUoXG4gICAgICBtYXAoKHRva2VuRGF0YTogYW55KSA9PiB0aGlzLmRlY29kZVRva2VuKHRva2VuRGF0YVsnYWNjZXNzJ10pKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgbG9naW4odXNlcjogVXNlcik6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgIHJldHVybiB0aGlzLmdldEFjY2Vzc1Rva2VuKHVzZXIpLnBpcGUoXG4gICAgICBtYXAoKHRva2VuOiBUb2tlbikgPT4gKHtcbiAgICAgICAgLi4udXNlcixcbiAgICAgICAgdG9rZW46IHRva2VuXG4gICAgICB9KSlcbiAgICApO1xuICB9XG5cbiAgZ2V0VXNlckluZm9ybWF0aW9uKCk6IE9ic2VydmFibGU8eyB1c2VyOiBVc2VyLCB1c2Vyc0xpc3Q6IFVzZXJbXSB9PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5hcGlVcmxzLnVzZXJJbmZvcm1hdGlvblVybCkucGlwZShcbiAgICAgIG1hcCgocmVzdWx0OiBhbnkpID0+ICh7XG4gICAgICAgIHVzZXJzTGlzdDogcmVzdWx0LnVzZXJzTGlzdCxcbiAgICAgICAgdXNlcjogeyAuLi5yZXN1bHQudXNlciwgZGF0ZUpvaW5lZDogbmV3IERhdGUocmVzdWx0LnVzZXIuZGF0ZUpvaW5lZCkgfVxuICAgICAgfSkpXG4gICAgKTtcbiAgfVxuXG4gIGNoYW5nZVBhc3N3b3JkKHBhc3N3b3JkQ2hhbmdlczogeyBjdXJyZW50UGFzc3dvcmQ6IHN0cmluZywgbmV4dFBhc3N3b3JkOiBzdHJpbmcgfSkge1xuICAgIHJldHVybiB0aGlzLmh0dHAucHV0KHRoaXMuYXBpVXJscy5jaGFuZ2VQYXNzd29yZFVybCwgcGFzc3dvcmRDaGFuZ2VzKTtcbiAgfVxuXG4gIHNlbmRQYXNzd29yZChtYWlsOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5hcGlVcmxzLnNlbmRCYWNrUGFzc3dvcmRVcmwsIHsgZW1haWw6IG1haWwgfSk7XG4gIH1cblxuICBjcmVhdGVVc2VyKHVzZXI6IFVzZXIpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy5hcGlVcmxzLnNpZ25VcFVybCwgdXNlcik7XG4gIH1cbn1cbiJdfQ==