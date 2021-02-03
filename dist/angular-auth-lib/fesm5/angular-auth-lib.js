import { __assign, __decorate, __param, __read } from 'tslib';
import { InjectionToken, Inject, PLATFORM_ID, ɵɵdefineInjectable, ɵɵinject, Injectable, Component, ViewChild, NgModule } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { map, withLatestFrom, tap, switchMap, catchError, filter, concatMap } from 'rxjs/operators';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { createFeatureSelector, createSelector, select, Store, StoreModule } from '@ngrx/store';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import get from 'lodash-es/get';
import { MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ofType, Actions, Effect, EffectsModule } from '@ngrx/effects';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';

var AUTH_API_URLS = new InjectionToken('Auth api related urls');
var AUTH_IMAGES_URLS = new InjectionToken('Images urls');
var AUTH_TRADUCTIONS = new InjectionToken('Traductions');
var AUTH_RESET_ACTIONS = new InjectionToken('Reset actions');
var AUTH_STYLES = new InjectionToken('Styling');

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
    AuthService.ɵprov = ɵɵdefineInjectable({ factory: function AuthService_Factory() { return new AuthService(ɵɵinject(AUTH_API_URLS), ɵɵinject(PLATFORM_ID), ɵɵinject(HttpClient)); }, token: AuthService, providedIn: "root" });
    AuthService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(0, Inject(AUTH_API_URLS)),
        __param(1, Inject(PLATFORM_ID))
    ], AuthService);
    return AuthService;
}());

var selectAuthState = createFeatureSelector('auth');
var ɵ0 = function (state) { return state.isAuthenticated; };
var selectIsAuthenticated = createSelector(selectAuthState, ɵ0);
var ɵ1 = function (state) { return state.error; };
var selectLogInError = createSelector(selectAuthState, ɵ1);
var ɵ2 = function (state) { return state.user; };
var selectUser = createSelector(selectAuthState, ɵ2);
var ɵ3 = function (state) { return state.isPasswordBeingChanged; };
var selectIsPasswordBeingChanged = createSelector(selectAuthState, ɵ3);
var ɵ4 = function (state) { return state.usersList; };
var selectUsersList = createSelector(selectAuthState, ɵ4); // list of colleagues of the current user for example
var ɵ5 = function (state) { return state.isSignUpLoading; };
var selectIsSignUpLoading = createSelector(selectAuthState, ɵ5);
var ɵ6 = function (state) { return state.isLoginLoading; };
var selectIsLoginLoading = createSelector(selectAuthState, ɵ6);

var AuthGuard = /** @class */ (function () {
    function AuthGuard(store, router, platformId) {
        this.store = store;
        this.router = router;
        this.platformId = platformId;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        return this.store.pipe(select(selectUser), withLatestFrom(this.store.pipe(select(selectIsAuthenticated))), map(function (_a) {
            var _b = __read(_a, 2), user = _b[0], isAuthenticated = _b[1];
            if (user && user.allowedUrls.includes(route.routeConfig.path) && isAuthenticated) {
                return true;
            }
            else {
                if (user && user.allowedUrls.includes(route.routeConfig.path) && isPlatformBrowser(_this.platformId)) {
                    sessionStorage.setItem('redirectedUrlAfterLogIn', state.url);
                }
                _this.router.navigate(['log-in']);
                return false;
            }
        }));
    };
    AuthGuard.ctorParameters = function () { return [
        { type: Store },
        { type: Router },
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    AuthGuard.ɵprov = ɵɵdefineInjectable({ factory: function AuthGuard_Factory() { return new AuthGuard(ɵɵinject(Store), ɵɵinject(Router), ɵɵinject(PLATFORM_ID)); }, token: AuthGuard, providedIn: "root" });
    AuthGuard = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __param(2, Inject(PLATFORM_ID))
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
        Injectable()
    ], TokenInterceptor);
    return TokenInterceptor;
}());

var AUTH_ACTIONS_TYPE;
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
})(AUTH_ACTIONS_TYPE || (AUTH_ACTIONS_TYPE = {}));
var OpenSignUpDialog = /** @class */ (function () {
    function OpenSignUpDialog() {
        this.type = AUTH_ACTIONS_TYPE.OPEN_SIGN_UP_DIALOG;
    }
    return OpenSignUpDialog;
}());
var SignUp = /** @class */ (function () {
    function SignUp(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.SIGN_UP;
    }
    return SignUp;
}());
var SignUpSuccess = /** @class */ (function () {
    function SignUpSuccess() {
        this.type = AUTH_ACTIONS_TYPE.SIGN_UP_SUCCESS;
    }
    return SignUpSuccess;
}());
var SignUpFailure = /** @class */ (function () {
    function SignUpFailure(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.SIGN_UP_FAILURE;
    }
    return SignUpFailure;
}());
var LogIn = /** @class */ (function () {
    function LogIn(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.LOG_IN;
    }
    return LogIn;
}());
var LogInSuccess = /** @class */ (function () {
    function LogInSuccess(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.LOG_IN_SUCCESS;
    }
    return LogInSuccess;
}());
var LogInFailure = /** @class */ (function () {
    function LogInFailure(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.LOG_IN_FAILURE;
    }
    return LogInFailure;
}());
var LogOut = /** @class */ (function () {
    function LogOut() {
        this.type = AUTH_ACTIONS_TYPE.LOG_OUT;
    }
    return LogOut;
}());
var LoadUserInformation = /** @class */ (function () {
    function LoadUserInformation() {
        this.type = AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION;
    }
    return LoadUserInformation;
}());
var LoadUserInformationSuccess = /** @class */ (function () {
    function LoadUserInformationSuccess(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION_SUCCESS;
    }
    return LoadUserInformationSuccess;
}());
var LoadUserInformationFailure = /** @class */ (function () {
    function LoadUserInformationFailure(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION_FAILURE;
    }
    return LoadUserInformationFailure;
}());
var ChangePassword = /** @class */ (function () {
    function ChangePassword(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.CHANGE_PASSWORD;
    }
    return ChangePassword;
}());
var ChangePasswordSuccess = /** @class */ (function () {
    function ChangePasswordSuccess() {
        this.type = AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_SUCCESS;
    }
    return ChangePasswordSuccess;
}());
var ChangePasswordFailure = /** @class */ (function () {
    function ChangePasswordFailure(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_FAILURE;
    }
    return ChangePasswordFailure;
}());
var OpenForgottenPasswordDialog = /** @class */ (function () {
    function OpenForgottenPasswordDialog() {
        this.type = AUTH_ACTIONS_TYPE.OPEN_FORGOTTEN_PASSWORD_DIALOG;
    }
    return OpenForgottenPasswordDialog;
}());
var SendPassword = /** @class */ (function () {
    function SendPassword(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.SEND_PASSWORD;
    }
    return SendPassword;
}());
var SendPasswordSuccess = /** @class */ (function () {
    function SendPasswordSuccess() {
        this.type = AUTH_ACTIONS_TYPE.SEND_PASSWORD_SUCCESS;
    }
    return SendPasswordSuccess;
}());
var SendPasswordFailure = /** @class */ (function () {
    function SendPasswordFailure(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.SEND_PASSWORD_FAILURE;
    }
    return SendPasswordFailure;
}());
var UpdateUser = /** @class */ (function () {
    function UpdateUser(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.UPDATE_USER;
    }
    return UpdateUser;
}());

var LogInComponent = /** @class */ (function () {
    function LogInComponent(images, traductions, styles, formBuilder, store) {
        this.images = images;
        this.traductions = traductions;
        this.styles = styles;
        this.formBuilder = formBuilder;
        this.store = store;
        this.isPasswordBeingChanged$ = this.store.pipe(select(selectIsPasswordBeingChanged));
        this.isLoginLoading$ = this.store.pipe(select(selectIsLoginLoading));
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
            username: ['', Validators.required],
            password: ['', Validators.required]
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
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_IMAGES_URLS,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_TRADUCTIONS,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_STYLES,] }] },
        { type: FormBuilder },
        { type: Store }
    ]; };
    LogInComponent = __decorate([
        Component({
            selector: 'auth-lib-log-in',
            template: "<div id=\"container\" [ngStyle]=\"{'background-image': 'url(' + images.loginBackgroundImageUrl + ')'}\">\n  <mat-card class=\"mat-elevation-z8\">\n    <img *ngIf=\"images.logoImageUrl && images.logoImageUrl.length >= 1\" [src]=\"images.logoImageUrl\">\n    <form [formGroup]=\"userForm\" (ngSubmit)=\"onSubmit()\">\n\n      <mat-form-field>\n        <input matInput [placeholder]=\"usernamePlaceholder\" formControlName=\"username\">\n      </mat-form-field>\n\n      <mat-form-field>\n          <input matInput type=\"password\" [placeholder]=\"passwordPlaceholder\" formControlName=\"password\">\n      </mat-form-field>\n\n      <button \n        mat-raised-button\n        type=\"submit\" \n        [disabled]=\"userForm.invalid\"\n        *ngIf=\"!(isPasswordBeingChanged$ | async) && !(isLoginLoading$ | async)\"\n        [ngStyle]=\"{\n          'background-color': buttonsBackgroundColor,\n          'color': buttonsColor\n        }\"\n      >\n        {{ loginButtonTraduction }}\n      </button>\n      <mat-spinner *ngIf=\"(isPasswordBeingChanged$ | async) || (isLoginLoading$ | async)\" [diameter]=\"36\"></mat-spinner>\n\n      <a (click)=\"openDialog()\">{{ forgottenPassword }}</a>\n    </form>\n  </mat-card>\n</div>\n",
            styles: ["#container{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;width:100%;flex:1;background-size:cover}#container mat-card{display:flex;flex-direction:column;justify-content:center;align-items:center;height:400px;width:400px;box-sizing:border-box;padding:2%}#container mat-card img{display:block;max-width:200px;max-height:100px;width:auto;height:auto;margin-bottom:20px}#container mat-card form{display:flex;flex:1;flex-direction:column;justify-content:center;align-items:center;width:100%}#container mat-card form mat-form-field{width:75%;font-size:16px}#container mat-card form a,#container mat-card form button,#container mat-card form mat-spinner{margin-top:20px}#container mat-card form a{cursor:pointer;color:#1e90ff;font-size:16px}"]
        }),
        __param(0, Inject(AUTH_IMAGES_URLS)),
        __param(1, Inject(AUTH_TRADUCTIONS)),
        __param(2, Inject(AUTH_STYLES))
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
        { type: Store },
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_TRADUCTIONS,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_STYLES,] }] }
    ]; };
    __decorate([
        ViewChild('email')
    ], ForgottenPasswordComponent.prototype, "emailInput", void 0);
    ForgottenPasswordComponent = __decorate([
        Component({
            selector: 'auth-lib-forgotten-password',
            template: "<mat-form-field>\n  <input matInput [placeholder]=\"emailPlaceholder\" #email>\n</mat-form-field>\n\n<button \n  mat-raised-button\n  type=\"button\" \n  (click)=\"send()\" \n  [disabled]=\"!(this.emailInput && this.emailInput.nativeElement && this.emailInput.nativeElement.value)\"\n  [ngStyle]=\"{\n    'background-color': buttonsBackgroundColor,\n    'color': buttonsColor\n  }\"\n>\n  {{ sendButtonTraduction }}\n</button>\n",
            styles: ["mat-form-field{font-size:12px;margin-right:30px;width:230px}"]
        }),
        __param(1, Inject(AUTH_TRADUCTIONS)),
        __param(2, Inject(AUTH_STYLES))
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
            username: ['', Validators.required],
            password: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
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
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_TRADUCTIONS,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_STYLES,] }] },
        { type: MatDialogRef },
        { type: FormBuilder },
        { type: Store }
    ]; };
    SignUpComponent = __decorate([
        Component({
            selector: 'auth-lib-sign-up',
            template: "<div id=\"container\">\n    <h2 mat-dialog-title>{{ signUpDialogTitle }}</h2>\n    <form [formGroup]=\"userForm\" (ngSubmit)=\"onSubmit()\">\n\n        <div id=\"columns\">\n            <div id=\"left-column\">\n                <mat-form-field>\n                    <input matInput [placeholder]=\"usernamePlaceholder\" formControlName=\"username\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"firstNamePlaceholder\" formControlName=\"firstName\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"emailPlaceholder\" formControlName=\"email\" autocomplete=\"off\">\n                </mat-form-field>\n            </div>\n\n            <div id=\"right-column\">\n                <mat-form-field>\n                    <input matInput type=\"password\" [placeholder]=\"passwordPlaceholder\" formControlName=\"password\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"lastNamePlaceholder\" formControlName=\"lastName\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"enterprisePlaceholder\" formControlName=\"enterprise\" autocomplete=\"off\">\n                </mat-form-field>\n            </div>\n        </div>\n\n        <button mat-raised-button type=\"submit\" [disabled]=\"userForm.invalid\" [ngStyle]=\"{\n            'background-color': buttonsBackgroundColor,\n            'color': buttonsColor\n          }\">\n            {{ signupButtonTraduction }}\n        </button>\n    </form>\n</div>\n",
            styles: ["#container{display:flex;flex-direction:column;width:600px}#container form{margin-top:20px;display:flex;flex-direction:column;justify-content:space-between}#container form #columns{display:flex;flex-direction:row;justify-content:space-between}#container form #columns #left-column{margin-right:20px}#container form #columns #left-column,#container form #columns #right-column{display:flex;flex-direction:column;justify-content:space-between;width:100%}#container form #columns mat-form-field{width:100%}#container button{margin-top:20px;-ms-grid-row-align:center;align-self:center}"]
        }),
        __param(0, Inject(AUTH_TRADUCTIONS)),
        __param(1, Inject(AUTH_STYLES))
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
        case AUTH_ACTIONS_TYPE.SIGN_UP:
            return __assign(__assign({}, state), { error: null, isSignUpLoading: true });
        case AUTH_ACTIONS_TYPE.SIGN_UP_FAILURE:
            return __assign(__assign({}, state), { error: action.payload, isSignUpLoading: false });
        case AUTH_ACTIONS_TYPE.SIGN_UP_SUCCESS:
            return __assign(__assign({}, state), { error: null, isSignUpLoading: false });
        case AUTH_ACTIONS_TYPE.LOG_IN:
            return __assign(__assign({}, state), { error: null, isLoginLoading: true });
        case AUTH_ACTIONS_TYPE.LOG_IN_SUCCESS:
            return __assign(__assign({}, state), { isAuthenticated: true, user: action.payload.user, error: null, usersList: action.payload.usersList, isLoginLoading: false });
        case AUTH_ACTIONS_TYPE.LOG_IN_FAILURE:
            return __assign(__assign({}, state), { error: action.payload, isLoginLoading: false });
        case AUTH_ACTIONS_TYPE.LOG_OUT:
            return initialState;
        case AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION_SUCCESS:
            var detailedUser = __assign(__assign({}, state.user), action.payload);
            return __assign(__assign({}, state), { user: detailedUser });
        case AUTH_ACTIONS_TYPE.CHANGE_PASSWORD:
        case AUTH_ACTIONS_TYPE.SEND_PASSWORD:
            return __assign(__assign({}, state), { isPasswordBeingChanged: true });
        case AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_SUCCESS:
        case AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_FAILURE:
        case AUTH_ACTIONS_TYPE.SEND_PASSWORD_SUCCESS:
        case AUTH_ACTIONS_TYPE.SEND_PASSWORD_FAILURE:
            return __assign(__assign({}, state), { isPasswordBeingChanged: false });
        case AUTH_ACTIONS_TYPE.UPDATE_USER:
            return __assign(__assign({}, state), { user: __assign(__assign({}, state.user), action.payload) });
        default:
            return state;
    }
}

var AuthEffects = /** @class */ (function () {
    function AuthEffects(resetActions, traductions, platformId, actions, authService, router, toastService, dialog, store) {
        var _this = this;
        this.resetActions = resetActions;
        this.traductions = traductions;
        this.platformId = platformId;
        this.actions = actions;
        this.authService = authService;
        this.router = router;
        this.toastService = toastService;
        this.dialog = dialog;
        this.store = store;
        this.OpenSignUpDialog$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.OPEN_SIGN_UP_DIALOG), tap(function () { return _this.dialogRef = _this.dialog.open(SignUpComponent); }));
        this.SignUp$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.SIGN_UP), map(function (action) { return action.payload; }), switchMap(function (user) { return _this.authService.createUser(user).pipe(map(function () { return new SignUpSuccess(); }), catchError(function (error) { return of(new SignUpFailure(error)); })); }));
        this.SignUpSuccess$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.SIGN_UP_SUCCESS), tap(function () {
            _this.toastService.success(get(_this.traductions || {}, 'messages.signupSuccess', 'Your account has been created!'));
        }));
        this.SignUpFailure$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.SIGN_UP_FAILURE), tap(function (error) { return _this.toastService.error(get(_this.traductions || {}, 'messages.signupFailure', 'Please try again with a new username.')); }));
        this.LogIn$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.LOG_IN), filter(function (action) { return isPlatformBrowser(_this.platformId); }), map(function (action) { return action.payload; }), switchMap(function (user) { return _this.authService.login(user).pipe(concatMap(function (loggedInUser) {
            sessionStorage.setItem('token', loggedInUser.token.token);
            return _this.authService.getUserInformation().pipe(map(function (_a) {
                var user = _a.user, usersList = _a.usersList;
                return new LogInSuccess({ user: user, usersList: usersList });
            }), catchError(function (error) { return of(new LogInFailure(error)); }));
        }), catchError(function (error) { return of(new LogInFailure(error)); })); }));
        this.LogInSuccess$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.LOG_IN_SUCCESS), filter(function (action) { return isPlatformBrowser(_this.platformId); }), withLatestFrom(this.store.pipe(select(selectUser))), tap(function (_a) {
            var _b = __read(_a, 2), action = _b[0], user = _b[1];
            var redirectedUrlAfterLogIn = sessionStorage.getItem('redirectedUrlAfterLogIn');
            if (redirectedUrlAfterLogIn && isPlatformBrowser(_this.platformId)) {
                _this.router.navigateByUrl(redirectedUrlAfterLogIn);
                sessionStorage.removeItem('redirectedUrlAfterLogIn');
            }
            else {
                _this.router.navigateByUrl(user.redirectUrlAfterLogin);
            }
            _this.toastService.success(get(_this.traductions || {}, 'messages.loginSuccess', 'Hi! Nice to see you again!'));
        }));
        this.LogInFailure$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.LOG_IN_FAILURE), tap(function (error) { return _this.toastService.error(get(_this.traductions || {}, 'messages.loginFailure', 'Wrong credentials. Please check again.')); }));
        this.LogOut$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.LOG_OUT), filter(function (action) { return isPlatformBrowser(_this.platformId); }), switchMap(function (action) {
            sessionStorage.removeItem('token');
            _this.router.navigate(['log-in']);
            return (_this.resetActions || []).map(function (resetAction) { return new resetAction(); });
        }));
        this.LoadUserInformation$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION), switchMap(function (action) { return _this.authService.getUserInformation().pipe(map(function (_a) {
            var user = _a.user, usersList = _a.usersList;
            return new LoadUserInformationSuccess(user);
        }), catchError(function (error) { return of(new LoadUserInformationFailure(error)); })); }));
        this.ChangePassword$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.CHANGE_PASSWORD), switchMap(function (action) { return _this.authService.changePassword(action.payload).pipe(map(function () { return new ChangePasswordSuccess(); }), catchError(function (error) { return of(new ChangePasswordFailure(error)); })); }));
        this.ChangePasswordSuccess$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_SUCCESS), tap(function () { return _this.toastService.success(get(_this.traductions || {}, 'messages.changePasswordSuccess', 'Your password has been successfully changed!')); }));
        this.ChangePasswordFailure$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_FAILURE), tap(function (error) { return _this.toastService.error(get(_this.traductions || {}, 'messages.changePasswordFailure', 'Wrong current password. Please try again.')); }));
        this.OpenForgottenPasswordDialog$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.OPEN_FORGOTTEN_PASSWORD_DIALOG), tap(function () { return _this.dialogRef = _this.dialog.open(ForgottenPasswordComponent); }));
        this.SendPassword$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.SEND_PASSWORD), tap(function () {
            _this.dialogRef.close();
        }), switchMap(function (action) { return _this.authService.sendPassword(action.payload).pipe(map(function () { return new SendPasswordSuccess(); }), catchError(function (error) { return of(new SendPasswordFailure(error)); })); }));
        this.SendPasswordSuccess$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.SEND_PASSWORD_SUCCESS), tap(function () { return _this.toastService.success(get(_this.traductions || {}, 'messages.passwordResetSuccess', 'An email for resetting your password has been sent to your address.')); }));
        this.SendPasswordFailure$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.SEND_PASSWORD_FAILURE), tap(function () { return _this.toastService.error(get(_this.traductions || {}, 'messages.passwordResetFailure', 'An error occured. Please try again.')); }));
    }
    AuthEffects.ctorParameters = function () { return [
        { type: Array, decorators: [{ type: Inject, args: [AUTH_RESET_ACTIONS,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_TRADUCTIONS,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: Actions },
        { type: AuthService },
        { type: Router },
        { type: ToastrService },
        { type: MatDialog },
        { type: Store }
    ]; };
    __decorate([
        Effect({ dispatch: false })
    ], AuthEffects.prototype, "OpenSignUpDialog$", void 0);
    __decorate([
        Effect()
    ], AuthEffects.prototype, "SignUp$", void 0);
    __decorate([
        Effect({ dispatch: false })
    ], AuthEffects.prototype, "SignUpSuccess$", void 0);
    __decorate([
        Effect({ dispatch: false })
    ], AuthEffects.prototype, "SignUpFailure$", void 0);
    __decorate([
        Effect()
    ], AuthEffects.prototype, "LogIn$", void 0);
    __decorate([
        Effect({ dispatch: false })
    ], AuthEffects.prototype, "LogInSuccess$", void 0);
    __decorate([
        Effect({ dispatch: false })
    ], AuthEffects.prototype, "LogInFailure$", void 0);
    __decorate([
        Effect()
    ], AuthEffects.prototype, "LogOut$", void 0);
    __decorate([
        Effect()
    ], AuthEffects.prototype, "LoadUserInformation$", void 0);
    __decorate([
        Effect()
    ], AuthEffects.prototype, "ChangePassword$", void 0);
    __decorate([
        Effect({ dispatch: false })
    ], AuthEffects.prototype, "ChangePasswordSuccess$", void 0);
    __decorate([
        Effect({ dispatch: false })
    ], AuthEffects.prototype, "ChangePasswordFailure$", void 0);
    __decorate([
        Effect({ dispatch: false })
    ], AuthEffects.prototype, "OpenForgottenPasswordDialog$", void 0);
    __decorate([
        Effect()
    ], AuthEffects.prototype, "SendPassword$", void 0);
    __decorate([
        Effect({ dispatch: false })
    ], AuthEffects.prototype, "SendPasswordSuccess$", void 0);
    __decorate([
        Effect({ dispatch: false })
    ], AuthEffects.prototype, "SendPasswordFailure$", void 0);
    AuthEffects = __decorate([
        Injectable(),
        __param(0, Inject(AUTH_RESET_ACTIONS)),
        __param(1, Inject(AUTH_TRADUCTIONS)),
        __param(2, Inject(PLATFORM_ID))
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
                { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
            ]
        };
    };
    var AuthModule_1;
    AuthModule = AuthModule_1 = __decorate([
        NgModule({
            declarations: [LogInComponent, ForgottenPasswordComponent, SignUpComponent],
            imports: [
                CommonModule,
                HttpClientModule,
                RouterModule,
                ReactiveFormsModule,
                StoreModule.forFeature('auth', authReducer),
                EffectsModule.forFeature([AuthEffects]),
                BrowserAnimationsModule,
                MatCardModule,
                MatDialogModule,
                MatButtonModule,
                MatInputModule,
                MatProgressSpinnerModule,
                ToastrModule.forRoot({
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

/*
 * Public API Surface of angular-auth-lib
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AUTH_ACTIONS_TYPE, AUTH_API_URLS, AUTH_IMAGES_URLS, AUTH_RESET_ACTIONS, AUTH_STYLES, AUTH_TRADUCTIONS, AuthGuard, AuthModule, AuthService, ChangePassword, ChangePasswordFailure, ChangePasswordSuccess, ForgottenPasswordComponent, LoadUserInformation, LoadUserInformationFailure, LoadUserInformationSuccess, LogIn, LogInComponent, LogInFailure, LogInSuccess, LogOut, OpenForgottenPasswordDialog, OpenSignUpDialog, SendPassword, SendPasswordFailure, SendPasswordSuccess, SignUp, SignUpComponent, SignUpFailure, SignUpSuccess, TokenInterceptor, UpdateUser, authReducer, initialState, selectAuthState, selectIsAuthenticated, selectIsLoginLoading, selectIsPasswordBeingChanged, selectIsSignUpLoading, selectLogInError, selectUser, selectUsersList, ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, AuthEffects as ɵa };
//# sourceMappingURL=angular-auth-lib.js.map
