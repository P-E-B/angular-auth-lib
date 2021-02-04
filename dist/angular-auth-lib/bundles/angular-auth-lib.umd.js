(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('rxjs/operators'), require('@angular/common'), require('@angular/router'), require('@ngrx/store'), require('@angular/forms'), require('@angular/material/dialog'), require('@angular/material/input'), require('@angular/material/card'), require('@angular/material/button'), require('@angular/material/progress-spinner'), require('@angular/platform-browser/animations'), require('@ngrx/effects'), require('ngx-toastr'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('angular-auth-lib', ['exports', '@angular/core', '@angular/common/http', 'rxjs/operators', '@angular/common', '@angular/router', '@ngrx/store', '@angular/forms', '@angular/material/dialog', '@angular/material/input', '@angular/material/card', '@angular/material/button', '@angular/material/progress-spinner', '@angular/platform-browser/animations', '@ngrx/effects', 'ngx-toastr', 'rxjs'], factory) :
    (global = global || self, factory(global['angular-auth-lib'] = {}, global.ng.core, global.ng.common.http, global.rxjs.operators, global.ng.common, global.ng.router, global['@ngrx/store'], global.ng.forms, global.ng.material.dialog, global.ng.material.input, global.ng.material.card, global.ng.material.button, global.ng.material.progressSpinner, global.ng.platformBrowser.animations, global['@ngrx/effects'], global['ngx-toastr'], global.rxjs));
}(this, (function (exports, core, http, operators, common, router, store, forms, dialog, input, card, button, progressSpinner, animations, effects, ngxToastr, rxjs) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var AUTH_API_URLS = new core.InjectionToken('Auth api related urls');
    var AUTH_IMAGES_URLS = new core.InjectionToken('Images urls');
    var AUTH_TRADUCTIONS = new core.InjectionToken('Traductions');
    var AUTH_RESET_ACTIONS = new core.InjectionToken('Reset actions');
    var AUTH_STYLES = new core.InjectionToken('Styling');

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
            var token = common.isPlatformBrowser(this.platformId) ? sessionStorage.getItem('token') : null;
            return token ? this.decodeToken(token) : null;
        };
        AuthService.prototype.getAccessToken = function (user) {
            var _this = this;
            var body = { username: user.username, password: user.password };
            return this.http.post(this.apiUrls.accessTokenUrl, body).pipe(operators.map(function (tokenData) { return _this.decodeToken(tokenData['access']); }));
        };
        AuthService.prototype.getRefreshToken = function (token) {
            var _this = this;
            var body = { refresh: token.token };
            return this.http.post(this.apiUrls.refreshTokenUrl, body).pipe(operators.map(function (tokenData) { return _this.decodeToken(tokenData['access']); }));
        };
        AuthService.prototype.login = function (user) {
            return this.getAccessToken(user).pipe(operators.map(function (token) { return (__assign(__assign({}, user), { token: token })); }));
        };
        AuthService.prototype.getUserInformation = function () {
            return this.http.get(this.apiUrls.userInformationUrl).pipe(operators.map(function (result) { return ({
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
            { type: undefined, decorators: [{ type: core.Inject, args: [AUTH_API_URLS,] }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
            { type: http.HttpClient }
        ]; };
        AuthService.ɵprov = core.ɵɵdefineInjectable({ factory: function AuthService_Factory() { return new AuthService(core.ɵɵinject(AUTH_API_URLS), core.ɵɵinject(core.PLATFORM_ID), core.ɵɵinject(http.HttpClient)); }, token: AuthService, providedIn: "root" });
        AuthService = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __param(0, core.Inject(AUTH_API_URLS)),
            __param(1, core.Inject(core.PLATFORM_ID))
        ], AuthService);
        return AuthService;
    }());

    var selectAuthState = store.createFeatureSelector('auth');
    var ɵ0 = function (state) { return state.isAuthenticated; };
    var selectIsAuthenticated = store.createSelector(selectAuthState, ɵ0);
    var ɵ1 = function (state) { return state.error; };
    var selectLogInError = store.createSelector(selectAuthState, ɵ1);
    var ɵ2 = function (state) { return state.user; };
    var selectUser = store.createSelector(selectAuthState, ɵ2);
    var ɵ3 = function (state) { return state.isPasswordBeingChanged; };
    var selectIsPasswordBeingChanged = store.createSelector(selectAuthState, ɵ3);
    var ɵ4 = function (state) { return state.usersList; };
    var selectUsersList = store.createSelector(selectAuthState, ɵ4); // list of colleagues of the current user for example
    var ɵ5 = function (state) { return state.isSignUpLoading; };
    var selectIsSignUpLoading = store.createSelector(selectAuthState, ɵ5);
    var ɵ6 = function (state) { return state.isLoginLoading; };
    var selectIsLoginLoading = store.createSelector(selectAuthState, ɵ6);

    var AuthGuard = /** @class */ (function () {
        function AuthGuard(store, router, platformId) {
            this.store = store;
            this.router = router;
            this.platformId = platformId;
        }
        AuthGuard.prototype.canActivate = function (route, state) {
            var _this = this;
            return this.store.pipe(store.select(selectUser), operators.withLatestFrom(this.store.pipe(store.select(selectIsAuthenticated))), operators.map(function (_a) {
                var _b = __read(_a, 2), user = _b[0], isAuthenticated = _b[1];
                if (user && user.allowedUrls.includes(route.routeConfig.path) && isAuthenticated) {
                    return true;
                }
                else {
                    if (user && user.allowedUrls.includes(route.routeConfig.path) && common.isPlatformBrowser(_this.platformId)) {
                        sessionStorage.setItem('redirectedUrlAfterLogIn', state.url);
                    }
                    _this.router.navigate(['log-in']);
                    return false;
                }
            }));
        };
        AuthGuard.ctorParameters = function () { return [
            { type: store.Store },
            { type: router.Router },
            { type: undefined, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] }
        ]; };
        AuthGuard.ɵprov = core.ɵɵdefineInjectable({ factory: function AuthGuard_Factory() { return new AuthGuard(core.ɵɵinject(store.Store), core.ɵɵinject(router.Router), core.ɵɵinject(core.PLATFORM_ID)); }, token: AuthGuard, providedIn: "root" });
        AuthGuard = __decorate([
            core.Injectable({
                providedIn: 'root'
            }),
            __param(2, core.Inject(core.PLATFORM_ID))
        ], AuthGuard);
        return AuthGuard;
    }());

    var TokenInterceptor = /** @class */ (function () {
        function TokenInterceptor(authService) {
            this.authService = authService;
        }
        TokenInterceptor.prototype.intercept = function (request, next) {
            var token = this.authService.getToken();
            if (token) {
                request = request.clone({
                    setHeaders: {
                        'Authorization': "Bearer " + token.token
                    }
                });
            }
            return next.handle(request);
        };
        TokenInterceptor.ctorParameters = function () { return [
            { type: AuthService }
        ]; };
        TokenInterceptor = __decorate([
            core.Injectable()
        ], TokenInterceptor);
        return TokenInterceptor;
    }());

    function get(object, path, defaultValue) {
        var e_1, _a;
        if (defaultValue === void 0) { defaultValue = null; }
        var nestedKeys = path.split('.');
        var currentPathValue = object;
        try {
            for (var nestedKeys_1 = __values(nestedKeys), nestedKeys_1_1 = nestedKeys_1.next(); !nestedKeys_1_1.done; nestedKeys_1_1 = nestedKeys_1.next()) {
                var key = nestedKeys_1_1.value;
                currentPathValue = currentPathValue[key] || null;
                if (typeof currentPathValue !== 'object' && currentPathValue !== null) {
                    return currentPathValue;
                }
                else if (currentPathValue === null) {
                    return defaultValue || null;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (nestedKeys_1_1 && !nestedKeys_1_1.done && (_a = nestedKeys_1.return)) _a.call(nestedKeys_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return defaultValue || null;
    }


    (function (AUTH_ACTIONS_TYPE) {
        AUTH_ACTIONS_TYPE["OPEN_SIGN_UP_DIALOG"] = "[Auth] User wants to sign up";
        AUTH_ACTIONS_TYPE["SIGN_UP"] = "[Auth] User tries to sign up";
        AUTH_ACTIONS_TYPE["SIGN_UP_SUCCESS"] = "[Auth] Sign up success";
        AUTH_ACTIONS_TYPE["SIGN_UP_FAILURE"] = "[Auth] Sign up failure";
        AUTH_ACTIONS_TYPE["LOG_IN"] = "[Auth] User tries to log in";
        AUTH_ACTIONS_TYPE["LOG_IN_SUCCESS"] = "[Auth] Log in success";
        AUTH_ACTIONS_TYPE["LOG_IN_FAILURE"] = "[Auth] Log in failure";
        AUTH_ACTIONS_TYPE["LOG_OUT"] = "[Auth] User logs out";
        AUTH_ACTIONS_TYPE["LOAD_USER_INFORMATION"] = "[Auth] Loading of user information";
        AUTH_ACTIONS_TYPE["LOAD_USER_INFORMATION_SUCCESS"] = "[Auth] Loading of user information success";
        AUTH_ACTIONS_TYPE["LOAD_USER_INFORMATION_FAILURE"] = "[Auth] Loading of user information failure";
        AUTH_ACTIONS_TYPE["CHANGE_PASSWORD"] = "[Auth] User changes his password";
        AUTH_ACTIONS_TYPE["CHANGE_PASSWORD_SUCCESS"] = "[Auth] Password change success";
        AUTH_ACTIONS_TYPE["CHANGE_PASSWORD_FAILURE"] = "[Auth] Password change failure";
        AUTH_ACTIONS_TYPE["OPEN_FORGOTTEN_PASSWORD_DIALOG"] = "[Auth] User opens dialog for password resetting";
        AUTH_ACTIONS_TYPE["SEND_PASSWORD"] = "[Auth] User has asked for having back a new password";
        AUTH_ACTIONS_TYPE["SEND_PASSWORD_SUCCESS"] = "[Auth] User has received his password";
        AUTH_ACTIONS_TYPE["SEND_PASSWORD_FAILURE"] = "[Auth] Error in the process of sending the password to the user";
        AUTH_ACTIONS_TYPE["UPDATE_USER"] = "[Auth] Update of user";
    })(exports.AUTH_ACTIONS_TYPE || (exports.AUTH_ACTIONS_TYPE = {}));
    var OpenSignUpDialog = /** @class */ (function () {
        function OpenSignUpDialog() {
            this.type = exports.AUTH_ACTIONS_TYPE.OPEN_SIGN_UP_DIALOG;
        }
        return OpenSignUpDialog;
    }());
    var SignUp = /** @class */ (function () {
        function SignUp(payload) {
            this.payload = payload;
            this.type = exports.AUTH_ACTIONS_TYPE.SIGN_UP;
        }
        return SignUp;
    }());
    var SignUpSuccess = /** @class */ (function () {
        function SignUpSuccess() {
            this.type = exports.AUTH_ACTIONS_TYPE.SIGN_UP_SUCCESS;
        }
        return SignUpSuccess;
    }());
    var SignUpFailure = /** @class */ (function () {
        function SignUpFailure(payload) {
            this.payload = payload;
            this.type = exports.AUTH_ACTIONS_TYPE.SIGN_UP_FAILURE;
        }
        return SignUpFailure;
    }());
    var LogIn = /** @class */ (function () {
        function LogIn(payload) {
            this.payload = payload;
            this.type = exports.AUTH_ACTIONS_TYPE.LOG_IN;
        }
        return LogIn;
    }());
    var LogInSuccess = /** @class */ (function () {
        function LogInSuccess(payload) {
            this.payload = payload;
            this.type = exports.AUTH_ACTIONS_TYPE.LOG_IN_SUCCESS;
        }
        return LogInSuccess;
    }());
    var LogInFailure = /** @class */ (function () {
        function LogInFailure(payload) {
            this.payload = payload;
            this.type = exports.AUTH_ACTIONS_TYPE.LOG_IN_FAILURE;
        }
        return LogInFailure;
    }());
    var LogOut = /** @class */ (function () {
        function LogOut() {
            this.type = exports.AUTH_ACTIONS_TYPE.LOG_OUT;
        }
        return LogOut;
    }());
    var LoadUserInformation = /** @class */ (function () {
        function LoadUserInformation() {
            this.type = exports.AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION;
        }
        return LoadUserInformation;
    }());
    var LoadUserInformationSuccess = /** @class */ (function () {
        function LoadUserInformationSuccess(payload) {
            this.payload = payload;
            this.type = exports.AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION_SUCCESS;
        }
        return LoadUserInformationSuccess;
    }());
    var LoadUserInformationFailure = /** @class */ (function () {
        function LoadUserInformationFailure(payload) {
            this.payload = payload;
            this.type = exports.AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION_FAILURE;
        }
        return LoadUserInformationFailure;
    }());
    var ChangePassword = /** @class */ (function () {
        function ChangePassword(payload) {
            this.payload = payload;
            this.type = exports.AUTH_ACTIONS_TYPE.CHANGE_PASSWORD;
        }
        return ChangePassword;
    }());
    var ChangePasswordSuccess = /** @class */ (function () {
        function ChangePasswordSuccess() {
            this.type = exports.AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_SUCCESS;
        }
        return ChangePasswordSuccess;
    }());
    var ChangePasswordFailure = /** @class */ (function () {
        function ChangePasswordFailure(payload) {
            this.payload = payload;
            this.type = exports.AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_FAILURE;
        }
        return ChangePasswordFailure;
    }());
    var OpenForgottenPasswordDialog = /** @class */ (function () {
        function OpenForgottenPasswordDialog() {
            this.type = exports.AUTH_ACTIONS_TYPE.OPEN_FORGOTTEN_PASSWORD_DIALOG;
        }
        return OpenForgottenPasswordDialog;
    }());
    var SendPassword = /** @class */ (function () {
        function SendPassword(payload) {
            this.payload = payload;
            this.type = exports.AUTH_ACTIONS_TYPE.SEND_PASSWORD;
        }
        return SendPassword;
    }());
    var SendPasswordSuccess = /** @class */ (function () {
        function SendPasswordSuccess() {
            this.type = exports.AUTH_ACTIONS_TYPE.SEND_PASSWORD_SUCCESS;
        }
        return SendPasswordSuccess;
    }());
    var SendPasswordFailure = /** @class */ (function () {
        function SendPasswordFailure(payload) {
            this.payload = payload;
            this.type = exports.AUTH_ACTIONS_TYPE.SEND_PASSWORD_FAILURE;
        }
        return SendPasswordFailure;
    }());
    var UpdateUser = /** @class */ (function () {
        function UpdateUser(payload) {
            this.payload = payload;
            this.type = exports.AUTH_ACTIONS_TYPE.UPDATE_USER;
        }
        return UpdateUser;
    }());

    var LogInComponent = /** @class */ (function () {
        function LogInComponent(images, traductions, styles, formBuilder, store$1) {
            this.images = images;
            this.traductions = traductions;
            this.styles = styles;
            this.formBuilder = formBuilder;
            this.store = store$1;
            this.isPasswordBeingChanged$ = this.store.pipe(store.select(selectIsPasswordBeingChanged));
            this.isLoginLoading$ = this.store.pipe(store.select(selectIsLoginLoading));
            this.usernamePlaceholder = 'Username';
            this.passwordPlaceholder = 'Password';
            this.forgottenPassword = 'Forgot your password?';
            this.loginButtonTraduction = 'Log in';
            this.buttonsBackgroundColor = '#3f51b5';
            this.buttonsColor = 'white';
        }
        LogInComponent.prototype.ngOnInit = function () {
            this.usernamePlaceholder = get(this.traductions || {}, 'form.usernamePlaceholder', this.usernamePlaceholder);
            this.passwordPlaceholder = get(this.traductions || {}, 'form.passwordPlaceholder', this.passwordPlaceholder);
            this.forgottenPassword = get(this.traductions || {}, 'buttons.passwordForgotten', this.forgottenPassword);
            this.loginButtonTraduction = get(this.traductions || {}, 'buttons.login', this.loginButtonTraduction);
            this.buttonsBackgroundColor = get(this.styles || {}, 'buttonsBackgroundColor', this.buttonsBackgroundColor);
            this.buttonsColor = get(this.styles || {}, 'buttonsColor', this.buttonsColor);
            this.userForm = this.formBuilder.group({
                username: ['', forms.Validators.required],
                password: ['', forms.Validators.required]
            });
        };
        LogInComponent.prototype.openDialog = function () {
            this.store.dispatch(new OpenForgottenPasswordDialog());
        };
        LogInComponent.prototype.onSubmit = function () {
            var newUser = {
                username: this.userForm.value['username'],
                password: this.userForm.value['password']
            };
            this.store.dispatch(new LogIn(newUser));
        };
        LogInComponent.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [AUTH_IMAGES_URLS,] }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [AUTH_TRADUCTIONS,] }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [AUTH_STYLES,] }] },
            { type: forms.FormBuilder },
            { type: store.Store }
        ]; };
        LogInComponent = __decorate([
            core.Component({
                selector: 'auth-lib-log-in',
                template: "<div id=\"container\" [ngStyle]=\"{'background-image': 'url(' + images.loginBackgroundImageUrl + ')'}\">\n  <mat-card class=\"mat-elevation-z8\">\n    <img *ngIf=\"images.logoImageUrl && images.logoImageUrl.length >= 1\" [src]=\"images.logoImageUrl\">\n    <form [formGroup]=\"userForm\" (ngSubmit)=\"onSubmit()\">\n\n      <mat-form-field>\n        <input matInput [placeholder]=\"usernamePlaceholder\" formControlName=\"username\">\n      </mat-form-field>\n\n      <mat-form-field>\n          <input matInput type=\"password\" [placeholder]=\"passwordPlaceholder\" formControlName=\"password\">\n      </mat-form-field>\n\n      <button \n        mat-raised-button\n        type=\"submit\" \n        [disabled]=\"userForm.invalid\"\n        *ngIf=\"!(isPasswordBeingChanged$ | async) && !(isLoginLoading$ | async)\"\n        [ngStyle]=\"{\n          'background-color': buttonsBackgroundColor,\n          'color': buttonsColor\n        }\"\n      >\n        {{ loginButtonTraduction }}\n      </button>\n      <mat-spinner *ngIf=\"(isPasswordBeingChanged$ | async) || (isLoginLoading$ | async)\" [diameter]=\"36\"></mat-spinner>\n\n      <a (click)=\"openDialog()\">{{ forgottenPassword }}</a>\n    </form>\n  </mat-card>\n</div>\n",
                styles: ["#container{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;width:100%;flex:1;background-size:cover}#container mat-card{display:flex;flex-direction:column;justify-content:center;align-items:center;height:400px;width:400px;box-sizing:border-box;padding:2%}#container mat-card img{display:block;max-width:200px;max-height:100px;width:auto;height:auto;margin-bottom:20px}#container mat-card form{display:flex;flex:1;flex-direction:column;justify-content:center;align-items:center;width:100%}#container mat-card form mat-form-field{width:75%;font-size:16px}#container mat-card form a,#container mat-card form button,#container mat-card form mat-spinner{margin-top:20px}#container mat-card form a{cursor:pointer;color:#1e90ff;font-size:16px}"]
            }),
            __param(0, core.Inject(AUTH_IMAGES_URLS)),
            __param(1, core.Inject(AUTH_TRADUCTIONS)),
            __param(2, core.Inject(AUTH_STYLES))
        ], LogInComponent);
        return LogInComponent;
    }());

    var ForgottenPasswordComponent = /** @class */ (function () {
        function ForgottenPasswordComponent(store, traductions, styles) {
            this.store = store;
            this.traductions = traductions;
            this.styles = styles;
            this.emailPlaceholder = 'Your email';
            this.sendButtonTraduction = 'Send';
            this.buttonsBackgroundColor = '#3f51b5';
            this.buttonsColor = 'white';
        }
        ForgottenPasswordComponent.prototype.ngOnInit = function () {
            this.emailPlaceholder = get(this.traductions || {}, 'form.emailPlaceholder', this.emailPlaceholder);
            this.sendButtonTraduction = get(this.traductions || {}, 'buttons.send', this.sendButtonTraduction);
            this.buttonsBackgroundColor = get(this.styles || {}, 'buttonsBackgroundColor', this.buttonsBackgroundColor);
            this.buttonsColor = get(this.styles || {}, 'buttonsColor', this.buttonsColor);
        };
        ForgottenPasswordComponent.prototype.send = function () {
            this.store.dispatch(new SendPassword(this.emailInput.nativeElement.value));
        };
        ForgottenPasswordComponent.ctorParameters = function () { return [
            { type: store.Store },
            { type: undefined, decorators: [{ type: core.Inject, args: [AUTH_TRADUCTIONS,] }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [AUTH_STYLES,] }] }
        ]; };
        __decorate([
            core.ViewChild('email')
        ], ForgottenPasswordComponent.prototype, "emailInput", void 0);
        ForgottenPasswordComponent = __decorate([
            core.Component({
                selector: 'auth-lib-forgotten-password',
                template: "<mat-form-field>\n  <input matInput [placeholder]=\"emailPlaceholder\" #email>\n</mat-form-field>\n\n<button \n  mat-raised-button\n  type=\"button\" \n  (click)=\"send()\" \n  [disabled]=\"!(this.emailInput && this.emailInput.nativeElement && this.emailInput.nativeElement.value)\"\n  [ngStyle]=\"{\n    'background-color': buttonsBackgroundColor,\n    'color': buttonsColor\n  }\"\n>\n  {{ sendButtonTraduction }}\n</button>\n",
                styles: ["mat-form-field{font-size:12px;margin-right:30px;width:230px}"]
            }),
            __param(1, core.Inject(AUTH_TRADUCTIONS)),
            __param(2, core.Inject(AUTH_STYLES))
        ], ForgottenPasswordComponent);
        return ForgottenPasswordComponent;
    }());

    var SignUpComponent = /** @class */ (function () {
        function SignUpComponent(traductions, styles, dialogRef, formBuilder, store) {
            this.traductions = traductions;
            this.styles = styles;
            this.dialogRef = dialogRef;
            this.formBuilder = formBuilder;
            this.store = store;
            this.usernamePlaceholder = 'Username';
            this.passwordPlaceholder = 'Password';
            this.firstNamePlaceholder = 'First name';
            this.lastNamePlaceholder = 'Last name';
            this.emailPlaceholder = 'Email';
            this.enterprisePlaceholder = 'Enterprise';
            this.signUpDialogTitle = 'Sign Up';
            this.signupButtonTraduction = 'Log in';
            this.buttonsBackgroundColor = '#3f51b5';
            this.buttonsColor = 'white';
        }
        SignUpComponent.prototype.ngOnInit = function () {
            this.usernamePlaceholder = get(this.traductions || {}, 'form.usernamePlaceholder', this.usernamePlaceholder);
            this.passwordPlaceholder = get(this.traductions || {}, 'form.passwordPlaceholder', this.passwordPlaceholder);
            this.firstNamePlaceholder = get(this.traductions || {}, 'form.firstNamePlaceholder', this.firstNamePlaceholder);
            this.lastNamePlaceholder = get(this.traductions || {}, 'form.lastNamePlaceholder', this.lastNamePlaceholder);
            this.emailPlaceholder = get(this.traductions || {}, 'form.emailPlaceholder', this.emailPlaceholder);
            this.enterprisePlaceholder = get(this.traductions || {}, 'form.enterprisePlaceholder', this.enterprisePlaceholder);
            this.signUpDialogTitle = get(this.traductions || {}, 'dialogs.signup', this.signUpDialogTitle);
            this.signupButtonTraduction = get(this.traductions || {}, 'buttons.signup', this.signupButtonTraduction);
            this.buttonsBackgroundColor = get(this.styles || {}, 'buttonsBackgroundColor', this.buttonsBackgroundColor);
            this.buttonsColor = get(this.styles || {}, 'buttonsColor', this.buttonsColor);
            this.userForm = this.formBuilder.group({
                username: ['', forms.Validators.required],
                password: ['', forms.Validators.required],
                firstName: ['', forms.Validators.required],
                lastName: ['', forms.Validators.required],
                email: ['', forms.Validators.required],
                enterprise: ''
            });
        };
        SignUpComponent.prototype.onSubmit = function () {
            var newUser = {
                username: this.userForm.value['username'],
                password: this.userForm.value['password'],
                firstName: this.userForm.value['firstName'],
                lastName: this.userForm.value['lastName'],
                email: this.userForm.value['email'],
                enterprise: this.userForm.value['enterprise'] || null
            };
            this.store.dispatch(new SignUp(newUser));
            this.dialogRef.close();
        };
        SignUpComponent.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [AUTH_TRADUCTIONS,] }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [AUTH_STYLES,] }] },
            { type: dialog.MatDialogRef },
            { type: forms.FormBuilder },
            { type: store.Store }
        ]; };
        SignUpComponent = __decorate([
            core.Component({
                selector: 'auth-lib-sign-up',
                template: "<div id=\"container\">\n    <h2 mat-dialog-title>{{ signUpDialogTitle }}</h2>\n    <form [formGroup]=\"userForm\" (ngSubmit)=\"onSubmit()\">\n\n        <div id=\"columns\">\n            <div id=\"left-column\">\n                <mat-form-field>\n                    <input matInput [placeholder]=\"usernamePlaceholder\" formControlName=\"username\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"firstNamePlaceholder\" formControlName=\"firstName\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"emailPlaceholder\" formControlName=\"email\" autocomplete=\"off\">\n                </mat-form-field>\n            </div>\n\n            <div id=\"right-column\">\n                <mat-form-field>\n                    <input matInput type=\"password\" [placeholder]=\"passwordPlaceholder\" formControlName=\"password\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"lastNamePlaceholder\" formControlName=\"lastName\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"enterprisePlaceholder\" formControlName=\"enterprise\" autocomplete=\"off\">\n                </mat-form-field>\n            </div>\n        </div>\n\n        <button mat-raised-button type=\"submit\" [disabled]=\"userForm.invalid\" [ngStyle]=\"{\n            'background-color': buttonsBackgroundColor,\n            'color': buttonsColor\n          }\">\n            {{ signupButtonTraduction }}\n        </button>\n    </form>\n</div>\n",
                styles: ["#container{display:flex;flex-direction:column;width:600px}#container form{margin-top:20px;display:flex;flex-direction:column;justify-content:space-between}#container form #columns{display:flex;flex-direction:row;justify-content:space-between}#container form #columns #left-column{margin-right:20px}#container form #columns #left-column,#container form #columns #right-column{display:flex;flex-direction:column;justify-content:space-between;width:100%}#container form #columns mat-form-field{width:100%}#container button{margin-top:20px;-ms-grid-row-align:center;align-self:center}"]
            }),
            __param(0, core.Inject(AUTH_TRADUCTIONS)),
            __param(1, core.Inject(AUTH_STYLES))
        ], SignUpComponent);
        return SignUpComponent;
    }());

    var initialState = {
        isAuthenticated: false,
        isSignUpLoading: false,
        isLoginLoading: false,
        user: null,
        error: null,
        isPasswordBeingChanged: false,
        usersList: null
    };
    function authReducer(state, action) {
        if (state === void 0) { state = initialState; }
        switch (action.type) {
            case exports.AUTH_ACTIONS_TYPE.SIGN_UP:
                return __assign(__assign({}, state), { error: null, isSignUpLoading: true });
            case exports.AUTH_ACTIONS_TYPE.SIGN_UP_FAILURE:
                return __assign(__assign({}, state), { error: action.payload, isSignUpLoading: false });
            case exports.AUTH_ACTIONS_TYPE.SIGN_UP_SUCCESS:
                return __assign(__assign({}, state), { error: null, isSignUpLoading: false });
            case exports.AUTH_ACTIONS_TYPE.LOG_IN:
                return __assign(__assign({}, state), { error: null, isLoginLoading: true });
            case exports.AUTH_ACTIONS_TYPE.LOG_IN_SUCCESS:
                return __assign(__assign({}, state), { isAuthenticated: true, user: action.payload.user, error: null, usersList: action.payload.usersList, isLoginLoading: false });
            case exports.AUTH_ACTIONS_TYPE.LOG_IN_FAILURE:
                return __assign(__assign({}, state), { error: action.payload, isLoginLoading: false });
            case exports.AUTH_ACTIONS_TYPE.LOG_OUT:
                return initialState;
            case exports.AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION_SUCCESS:
                var detailedUser = __assign(__assign({}, state.user), action.payload);
                return __assign(__assign({}, state), { user: detailedUser });
            case exports.AUTH_ACTIONS_TYPE.CHANGE_PASSWORD:
            case exports.AUTH_ACTIONS_TYPE.SEND_PASSWORD:
                return __assign(__assign({}, state), { isPasswordBeingChanged: true });
            case exports.AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_SUCCESS:
            case exports.AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_FAILURE:
            case exports.AUTH_ACTIONS_TYPE.SEND_PASSWORD_SUCCESS:
            case exports.AUTH_ACTIONS_TYPE.SEND_PASSWORD_FAILURE:
                return __assign(__assign({}, state), { isPasswordBeingChanged: false });
            case exports.AUTH_ACTIONS_TYPE.UPDATE_USER:
                return __assign(__assign({}, state), { user: __assign(__assign({}, state.user), action.payload) });
            default:
                return state;
        }
    }

    var AuthEffects = /** @class */ (function () {
        function AuthEffects(resetActions, traductions, platformId, actions, authService, router, toastService, dialog, store$1) {
            var _this = this;
            this.resetActions = resetActions;
            this.traductions = traductions;
            this.platformId = platformId;
            this.actions = actions;
            this.authService = authService;
            this.router = router;
            this.toastService = toastService;
            this.dialog = dialog;
            this.store = store$1;
            this.OpenSignUpDialog$ = this.actions.pipe(effects.ofType(exports.AUTH_ACTIONS_TYPE.OPEN_SIGN_UP_DIALOG), operators.tap(function () { return _this.dialogRef = _this.dialog.open(SignUpComponent); }));
            this.SignUp$ = this.actions.pipe(effects.ofType(exports.AUTH_ACTIONS_TYPE.SIGN_UP), operators.map(function (action) { return action.payload; }), operators.switchMap(function (user) { return _this.authService.createUser(user).pipe(operators.map(function () { return new SignUpSuccess(); }), operators.catchError(function (error) { return rxjs.of(new SignUpFailure(error)); })); }));
            this.SignUpSuccess$ = this.actions.pipe(effects.ofType(exports.AUTH_ACTIONS_TYPE.SIGN_UP_SUCCESS), operators.tap(function () {
                _this.toastService.success(get(_this.traductions || {}, 'messages.signupSuccess', 'Your account has been created!'));
            }));
            this.SignUpFailure$ = this.actions.pipe(effects.ofType(exports.AUTH_ACTIONS_TYPE.SIGN_UP_FAILURE), operators.tap(function (error) { return _this.toastService.error(get(_this.traductions || {}, 'messages.signupFailure', 'Please try again with a new username.')); }));
            this.LogIn$ = this.actions.pipe(effects.ofType(exports.AUTH_ACTIONS_TYPE.LOG_IN), operators.filter(function (action) { return common.isPlatformBrowser(_this.platformId); }), operators.map(function (action) { return action.payload; }), operators.switchMap(function (user) { return _this.authService.login(user).pipe(operators.concatMap(function (loggedInUser) {
                sessionStorage.setItem('token', loggedInUser.token.token);
                return _this.authService.getUserInformation().pipe(operators.map(function (_a) {
                    var user = _a.user, usersList = _a.usersList;
                    return new LogInSuccess({ user: user, usersList: usersList });
                }), operators.catchError(function (error) { return rxjs.of(new LogInFailure(error)); }));
            }), operators.catchError(function (error) { return rxjs.of(new LogInFailure(error)); })); }));
            this.LogInSuccess$ = this.actions.pipe(effects.ofType(exports.AUTH_ACTIONS_TYPE.LOG_IN_SUCCESS), operators.filter(function (action) { return common.isPlatformBrowser(_this.platformId); }), operators.withLatestFrom(this.store.pipe(store.select(selectUser))), operators.tap(function (_a) {
                var _b = __read(_a, 2), action = _b[0], user = _b[1];
                var redirectedUrlAfterLogIn = sessionStorage.getItem('redirectedUrlAfterLogIn');
                if (redirectedUrlAfterLogIn && common.isPlatformBrowser(_this.platformId)) {
                    _this.router.navigateByUrl(redirectedUrlAfterLogIn);
                    sessionStorage.removeItem('redirectedUrlAfterLogIn');
                }
                else {
                    _this.router.navigateByUrl(user.redirectUrlAfterLogin);
                }
                _this.toastService.success(get(_this.traductions || {}, 'messages.loginSuccess', 'Hi! Nice to see you again!'));
            }));
            this.LogInFailure$ = this.actions.pipe(effects.ofType(exports.AUTH_ACTIONS_TYPE.LOG_IN_FAILURE), operators.tap(function (error) { return _this.toastService.error(get(_this.traductions || {}, 'messages.loginFailure', 'Wrong credentials. Please check again.')); }));
            this.LogOut$ = this.actions.pipe(effects.ofType(exports.AUTH_ACTIONS_TYPE.LOG_OUT), operators.filter(function (action) { return common.isPlatformBrowser(_this.platformId); }), operators.switchMap(function (action) {
                sessionStorage.removeItem('token');
                _this.router.navigate(['log-in']);
                return (_this.resetActions || []).map(function (resetAction) { return new resetAction(); });
            }));
            this.LoadUserInformation$ = this.actions.pipe(effects.ofType(exports.AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION), operators.switchMap(function (action) { return _this.authService.getUserInformation().pipe(operators.map(function (_a) {
                var user = _a.user, usersList = _a.usersList;
                return new LoadUserInformationSuccess(user);
            }), operators.catchError(function (error) { return rxjs.of(new LoadUserInformationFailure(error)); })); }));
            this.ChangePassword$ = this.actions.pipe(effects.ofType(exports.AUTH_ACTIONS_TYPE.CHANGE_PASSWORD), operators.switchMap(function (action) { return _this.authService.changePassword(action.payload).pipe(operators.map(function () { return new ChangePasswordSuccess(); }), operators.catchError(function (error) { return rxjs.of(new ChangePasswordFailure(error)); })); }));
            this.ChangePasswordSuccess$ = this.actions.pipe(effects.ofType(exports.AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_SUCCESS), operators.tap(function () { return _this.toastService.success(get(_this.traductions || {}, 'messages.changePasswordSuccess', 'Your password has been successfully changed!')); }));
            this.ChangePasswordFailure$ = this.actions.pipe(effects.ofType(exports.AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_FAILURE), operators.tap(function (error) { return _this.toastService.error(get(_this.traductions || {}, 'messages.changePasswordFailure', 'Wrong current password. Please try again.')); }));
            this.OpenForgottenPasswordDialog$ = this.actions.pipe(effects.ofType(exports.AUTH_ACTIONS_TYPE.OPEN_FORGOTTEN_PASSWORD_DIALOG), operators.tap(function () { return _this.dialogRef = _this.dialog.open(ForgottenPasswordComponent); }));
            this.SendPassword$ = this.actions.pipe(effects.ofType(exports.AUTH_ACTIONS_TYPE.SEND_PASSWORD), operators.tap(function () {
                _this.dialogRef.close();
            }), operators.switchMap(function (action) { return _this.authService.sendPassword(action.payload).pipe(operators.map(function () { return new SendPasswordSuccess(); }), operators.catchError(function (error) { return rxjs.of(new SendPasswordFailure(error)); })); }));
            this.SendPasswordSuccess$ = this.actions.pipe(effects.ofType(exports.AUTH_ACTIONS_TYPE.SEND_PASSWORD_SUCCESS), operators.tap(function () { return _this.toastService.success(get(_this.traductions || {}, 'messages.passwordResetSuccess', 'An email for resetting your password has been sent to your address.')); }));
            this.SendPasswordFailure$ = this.actions.pipe(effects.ofType(exports.AUTH_ACTIONS_TYPE.SEND_PASSWORD_FAILURE), operators.tap(function () { return _this.toastService.error(get(_this.traductions || {}, 'messages.passwordResetFailure', 'An error occured. Please try again.')); }));
        }
        AuthEffects.ctorParameters = function () { return [
            { type: Array, decorators: [{ type: core.Inject, args: [AUTH_RESET_ACTIONS,] }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [AUTH_TRADUCTIONS,] }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
            { type: effects.Actions },
            { type: AuthService },
            { type: router.Router },
            { type: ngxToastr.ToastrService },
            { type: dialog.MatDialog },
            { type: store.Store }
        ]; };
        __decorate([
            effects.Effect({ dispatch: false })
        ], AuthEffects.prototype, "OpenSignUpDialog$", void 0);
        __decorate([
            effects.Effect()
        ], AuthEffects.prototype, "SignUp$", void 0);
        __decorate([
            effects.Effect({ dispatch: false })
        ], AuthEffects.prototype, "SignUpSuccess$", void 0);
        __decorate([
            effects.Effect({ dispatch: false })
        ], AuthEffects.prototype, "SignUpFailure$", void 0);
        __decorate([
            effects.Effect()
        ], AuthEffects.prototype, "LogIn$", void 0);
        __decorate([
            effects.Effect({ dispatch: false })
        ], AuthEffects.prototype, "LogInSuccess$", void 0);
        __decorate([
            effects.Effect({ dispatch: false })
        ], AuthEffects.prototype, "LogInFailure$", void 0);
        __decorate([
            effects.Effect()
        ], AuthEffects.prototype, "LogOut$", void 0);
        __decorate([
            effects.Effect()
        ], AuthEffects.prototype, "LoadUserInformation$", void 0);
        __decorate([
            effects.Effect()
        ], AuthEffects.prototype, "ChangePassword$", void 0);
        __decorate([
            effects.Effect({ dispatch: false })
        ], AuthEffects.prototype, "ChangePasswordSuccess$", void 0);
        __decorate([
            effects.Effect({ dispatch: false })
        ], AuthEffects.prototype, "ChangePasswordFailure$", void 0);
        __decorate([
            effects.Effect({ dispatch: false })
        ], AuthEffects.prototype, "OpenForgottenPasswordDialog$", void 0);
        __decorate([
            effects.Effect()
        ], AuthEffects.prototype, "SendPassword$", void 0);
        __decorate([
            effects.Effect({ dispatch: false })
        ], AuthEffects.prototype, "SendPasswordSuccess$", void 0);
        __decorate([
            effects.Effect({ dispatch: false })
        ], AuthEffects.prototype, "SendPasswordFailure$", void 0);
        AuthEffects = __decorate([
            core.Injectable(),
            __param(0, core.Inject(AUTH_RESET_ACTIONS)),
            __param(1, core.Inject(AUTH_TRADUCTIONS)),
            __param(2, core.Inject(core.PLATFORM_ID))
        ], AuthEffects);
        return AuthEffects;
    }());

    var AuthModule = /** @class */ (function () {
        function AuthModule() {
        }
        AuthModule_1 = AuthModule;
        AuthModule.forRoot = function (config) {
            return {
                ngModule: AuthModule_1,
                providers: [
                    { provide: AUTH_API_URLS, useValue: config.urls },
                    { provide: AUTH_IMAGES_URLS, useValue: config.images },
                    { provide: AUTH_TRADUCTIONS, useValue: config.traductions },
                    { provide: AUTH_RESET_ACTIONS, useValue: config.resetActions },
                    { provide: AUTH_STYLES, useValue: config.styles },
                    { provide: http.HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
                ]
            };
        };
        var AuthModule_1;
        AuthModule = AuthModule_1 = __decorate([
            core.NgModule({
                declarations: [LogInComponent, ForgottenPasswordComponent, SignUpComponent],
                imports: [
                    common.CommonModule,
                    http.HttpClientModule,
                    router.RouterModule,
                    forms.ReactiveFormsModule,
                    store.StoreModule.forFeature('auth', authReducer),
                    effects.EffectsModule.forFeature([AuthEffects]),
                    animations.BrowserAnimationsModule,
                    card.MatCardModule,
                    dialog.MatDialogModule,
                    button.MatButtonModule,
                    input.MatInputModule,
                    progressSpinner.MatProgressSpinnerModule,
                    ngxToastr.ToastrModule.forRoot({
                        timeOut: 3000,
                        positionClass: 'toast-bottom-right',
                        preventDuplicates: true
                    })
                ],
                entryComponents: [ForgottenPasswordComponent],
                exports: [LogInComponent, ForgottenPasswordComponent],
                providers: [AuthGuard]
            })
        ], AuthModule);
        return AuthModule;
    }());

    exports.AUTH_API_URLS = AUTH_API_URLS;
    exports.AUTH_IMAGES_URLS = AUTH_IMAGES_URLS;
    exports.AUTH_RESET_ACTIONS = AUTH_RESET_ACTIONS;
    exports.AUTH_STYLES = AUTH_STYLES;
    exports.AUTH_TRADUCTIONS = AUTH_TRADUCTIONS;
    exports.AuthGuard = AuthGuard;
    exports.AuthModule = AuthModule;
    exports.AuthService = AuthService;
    exports.ChangePassword = ChangePassword;
    exports.ChangePasswordFailure = ChangePasswordFailure;
    exports.ChangePasswordSuccess = ChangePasswordSuccess;
    exports.ForgottenPasswordComponent = ForgottenPasswordComponent;
    exports.LoadUserInformation = LoadUserInformation;
    exports.LoadUserInformationFailure = LoadUserInformationFailure;
    exports.LoadUserInformationSuccess = LoadUserInformationSuccess;
    exports.LogIn = LogIn;
    exports.LogInComponent = LogInComponent;
    exports.LogInFailure = LogInFailure;
    exports.LogInSuccess = LogInSuccess;
    exports.LogOut = LogOut;
    exports.OpenForgottenPasswordDialog = OpenForgottenPasswordDialog;
    exports.OpenSignUpDialog = OpenSignUpDialog;
    exports.SendPassword = SendPassword;
    exports.SendPasswordFailure = SendPasswordFailure;
    exports.SendPasswordSuccess = SendPasswordSuccess;
    exports.SignUp = SignUp;
    exports.SignUpComponent = SignUpComponent;
    exports.SignUpFailure = SignUpFailure;
    exports.SignUpSuccess = SignUpSuccess;
    exports.TokenInterceptor = TokenInterceptor;
    exports.UpdateUser = UpdateUser;
    exports.authReducer = authReducer;
    exports.initialState = initialState;
    exports.selectAuthState = selectAuthState;
    exports.selectIsAuthenticated = selectIsAuthenticated;
    exports.selectIsLoginLoading = selectIsLoginLoading;
    exports.selectIsPasswordBeingChanged = selectIsPasswordBeingChanged;
    exports.selectIsSignUpLoading = selectIsSignUpLoading;
    exports.selectLogInError = selectLogInError;
    exports.selectUser = selectUser;
    exports.selectUsersList = selectUsersList;
    exports.ɵ0 = ɵ0;
    exports.ɵ1 = ɵ1;
    exports.ɵ2 = ɵ2;
    exports.ɵ3 = ɵ3;
    exports.ɵ4 = ɵ4;
    exports.ɵ5 = ɵ5;
    exports.ɵ6 = ɵ6;
    exports.ɵa = AuthEffects;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-auth-lib.umd.js.map
