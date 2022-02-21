import { __decorate, __param } from 'tslib';
import { InjectionToken, Inject, PLATFORM_ID, ɵɵdefineInjectable, ɵɵinject, Injectable, Component, ViewChild, NgModule } from '@angular/core';
import { HttpParams, HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { map, withLatestFrom, tap, switchMap, catchError, filter, concatMap } from 'rxjs/operators';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { createFeatureSelector, createSelector, select, Store, StoreModule } from '@ngrx/store';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ofType, Actions, Effect, EffectsModule } from '@ngrx/effects';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';

const AUTH_API_URLS = new InjectionToken('Auth api related urls');
const AUTH_IMAGES_URLS = new InjectionToken('Images urls');
const AUTH_TRADUCTIONS = new InjectionToken('Traductions');
const AUTH_RESET_ACTIONS = new InjectionToken('Reset actions');
const AUTH_STYLES = new InjectionToken('Styling');

let AuthService = class AuthService {
    constructor(apiUrls, platformId, http) {
        this.apiUrls = apiUrls;
        this.platformId = platformId;
        this.http = http;
    }
    decodeToken(token) {
        const tokenParts = token.split(/\./);
        const tokenDecoded = JSON.parse(window.atob(tokenParts[1]));
        const expiringDate = new Date(tokenDecoded.exp * 1000);
        return { token: token, expiringDate: expiringDate };
    }
    getToken() {
        const token = isPlatformBrowser(this.platformId) ? sessionStorage.getItem('token') : null;
        return token ? this.decodeToken(token) : null;
    }
    getAccessToken(user) {
        const body = { username: user.username, password: user.password };
        return this.http.post(this.apiUrls.accessTokenUrl, body).pipe(map((tokenData) => this.decodeToken(tokenData['access'])));
    }
    getRefreshToken(token) {
        const body = { refresh: token.token };
        return this.http.post(this.apiUrls.refreshTokenUrl, body).pipe(map((tokenData) => this.decodeToken(tokenData['access'])));
    }
    login(user) {
        return this.getAccessToken(user).pipe(map((token) => (Object.assign(Object.assign({}, user), { token: token }))));
    }
    getUserInformation() {
        return this.http.get(this.apiUrls.userInformationUrl).pipe(map((result) => ({
            usersList: result.usersList,
            user: Object.assign(Object.assign({}, result.user), { dateJoined: new Date(result.user.dateJoined) })
        })));
    }
    changePassword(passwordChanges) {
        return this.http.put(this.apiUrls.changePasswordUrl, passwordChanges);
    }
    sendPassword(mail) {
        return this.http.post(this.apiUrls.sendBackPasswordUrl, { email: mail });
    }
    sendActivationCode(activationCode) {
        const params = new HttpParams().append('activationCode', activationCode);
        return this.http.get(this.apiUrls.sendActivationCodeUrl, { params });
    }
    createUser(user) {
        return this.http.post(this.apiUrls.signUpUrl, user);
    }
};
AuthService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_API_URLS,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: HttpClient }
];
AuthService.ɵprov = ɵɵdefineInjectable({ factory: function AuthService_Factory() { return new AuthService(ɵɵinject(AUTH_API_URLS), ɵɵinject(PLATFORM_ID), ɵɵinject(HttpClient)); }, token: AuthService, providedIn: "root" });
AuthService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(0, Inject(AUTH_API_URLS)),
    __param(1, Inject(PLATFORM_ID))
], AuthService);

const selectAuthState = createFeatureSelector('auth');
const ɵ0 = (state) => state.isAuthenticated;
const selectIsAuthenticated = createSelector(selectAuthState, ɵ0);
const ɵ1 = (state) => state.error;
const selectLogInError = createSelector(selectAuthState, ɵ1);
const ɵ2 = (state) => state.user;
const selectUser = createSelector(selectAuthState, ɵ2);
const ɵ3 = (state) => state.isPasswordBeingChanged;
const selectIsPasswordBeingChanged = createSelector(selectAuthState, ɵ3);
const ɵ4 = (state) => state.usersList;
const selectUsersList = createSelector(selectAuthState, ɵ4); // list of colleagues of the current user for example
const ɵ5 = (state) => state.isSignUpLoading;
const selectIsSignUpLoading = createSelector(selectAuthState, ɵ5);
const ɵ6 = (state) => state.isSendActivationCodeLoading;
const selectIsSendActivationCodeLoading = createSelector(selectAuthState, ɵ6);
const ɵ7 = (state) => state.isUserActivated;
const selectIsActivated = createSelector(selectAuthState, ɵ7);
const ɵ8 = (state) => state.isUserCreated;
const selectIsUserCreated = createSelector(selectAuthState, ɵ8);
const ɵ9 = (state) => state.isLoginLoading;
const selectIsLoginLoading = createSelector(selectAuthState, ɵ9);

let AuthGuard = class AuthGuard {
    constructor(store, router, platformId) {
        this.store = store;
        this.router = router;
        this.platformId = platformId;
    }
    canActivate(route, state) {
        return this.store.pipe(select(selectUser), withLatestFrom(this.store.pipe(select(selectIsAuthenticated))), map(([user, isAuthenticated]) => {
            if (user && user.allowedUrls.includes(route.routeConfig.path) && isAuthenticated) {
                return true;
            }
            else {
                if (user && user.allowedUrls.includes(route.routeConfig.path) && isPlatformBrowser(this.platformId)) {
                    sessionStorage.setItem('redirectedUrlAfterLogIn', state.url);
                }
                this.router.navigate(['log-in']);
                return false;
            }
        }));
    }
};
AuthGuard.ctorParameters = () => [
    { type: Store },
    { type: Router },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
AuthGuard.ɵprov = ɵɵdefineInjectable({ factory: function AuthGuard_Factory() { return new AuthGuard(ɵɵinject(Store), ɵɵinject(Router), ɵɵinject(PLATFORM_ID)); }, token: AuthGuard, providedIn: "root" });
AuthGuard = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(2, Inject(PLATFORM_ID))
], AuthGuard);

let TokenInterceptor = class TokenInterceptor {
    constructor(authService) {
        this.authService = authService;
    }
    intercept(request, next) {
        const token = this.authService.getToken();
        if (token) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${token.token}`
                }
            });
        }
        return next.handle(request);
    }
};
TokenInterceptor.ctorParameters = () => [
    { type: AuthService }
];
TokenInterceptor = __decorate([
    Injectable()
], TokenInterceptor);

function get(object, path, defaultValue = null) {
    const nestedKeys = path.split('.');
    let currentPathValue = object;
    for (let key of nestedKeys) {
        currentPathValue = currentPathValue[key] || null;
        if (typeof currentPathValue !== 'object' && currentPathValue !== null) {
            return currentPathValue;
        }
        else if (currentPathValue === null) {
            return defaultValue || null;
        }
    }
    return defaultValue || null;
}

var AUTH_ACTIONS_TYPE;
(function (AUTH_ACTIONS_TYPE) {
    AUTH_ACTIONS_TYPE["OPEN_SIGN_UP_DIALOG"] = "[Auth] User wants to sign up";
    AUTH_ACTIONS_TYPE["SIGN_UP"] = "[Auth] User tries to sign up";
    AUTH_ACTIONS_TYPE["SIGN_UP_SUCCESS"] = "[Auth] Sign up success";
    AUTH_ACTIONS_TYPE["SIGN_UP_FAILURE"] = "[Auth] Sign up failure";
    AUTH_ACTIONS_TYPE["SEND_ACTIVATION_CODE"] = "[Auth] User sends his activation code";
    AUTH_ACTIONS_TYPE["SEND_ACTIVATION_CODE_SUCCESS"] = "[Auth] Success while sending the activation";
    AUTH_ACTIONS_TYPE["SEND_ACTIVATION_CODE_FAILURE"] = "[Auth] Activation code failure";
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
    AUTH_ACTIONS_TYPE["RESET_AUTH_STATE"] = "[Auth] Reset Auth state";
})(AUTH_ACTIONS_TYPE || (AUTH_ACTIONS_TYPE = {}));
class OpenSignUpDialog {
    constructor() {
        this.type = AUTH_ACTIONS_TYPE.OPEN_SIGN_UP_DIALOG;
    }
}
class SignUp {
    constructor(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.SIGN_UP;
    }
}
class SignUpSuccess {
    constructor() {
        this.type = AUTH_ACTIONS_TYPE.SIGN_UP_SUCCESS;
    }
}
class SignUpFailure {
    constructor(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.SIGN_UP_FAILURE;
    }
}
class SendActivationCode {
    constructor(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.SEND_ACTIVATION_CODE;
    }
}
class SendActivationCodeSuccess {
    constructor() {
        this.type = AUTH_ACTIONS_TYPE.SEND_ACTIVATION_CODE_SUCCESS;
    }
}
class SendActivationCodeFailure {
    constructor(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.SEND_ACTIVATION_CODE_FAILURE;
    }
}
class LogIn {
    constructor(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.LOG_IN;
    }
}
class LogInSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.LOG_IN_SUCCESS;
    }
}
class LogInFailure {
    constructor(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.LOG_IN_FAILURE;
    }
}
class LogOut {
    constructor() {
        this.type = AUTH_ACTIONS_TYPE.LOG_OUT;
    }
}
class LoadUserInformation {
    constructor() {
        this.type = AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION;
    }
}
class LoadUserInformationSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION_SUCCESS;
    }
}
class LoadUserInformationFailure {
    constructor(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION_FAILURE;
    }
}
class ChangePassword {
    constructor(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.CHANGE_PASSWORD;
    }
}
class ChangePasswordSuccess {
    constructor() {
        this.type = AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_SUCCESS;
    }
}
class ChangePasswordFailure {
    constructor(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_FAILURE;
    }
}
class OpenForgottenPasswordDialog {
    constructor() {
        this.type = AUTH_ACTIONS_TYPE.OPEN_FORGOTTEN_PASSWORD_DIALOG;
    }
}
class SendPassword {
    constructor(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.SEND_PASSWORD;
    }
}
class SendPasswordSuccess {
    constructor() {
        this.type = AUTH_ACTIONS_TYPE.SEND_PASSWORD_SUCCESS;
    }
}
class SendPasswordFailure {
    constructor(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.SEND_PASSWORD_FAILURE;
    }
}
class UpdateUser {
    constructor(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.UPDATE_USER;
    }
}
class ResetAuthState {
    constructor() {
        this.type = AUTH_ACTIONS_TYPE.RESET_AUTH_STATE;
    }
}

let LogInComponent = class LogInComponent {
    constructor(images, traductions, styles, formBuilder, store) {
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
    ngOnInit() {
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
    }
    openDialog() {
        this.store.dispatch(new OpenForgottenPasswordDialog());
    }
    onSubmit() {
        const newUser = {
            username: this.userForm.value['username'],
            password: this.userForm.value['password']
        };
        this.store.dispatch(new LogIn(newUser));
    }
};
LogInComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_IMAGES_URLS,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_TRADUCTIONS,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_STYLES,] }] },
    { type: FormBuilder },
    { type: Store }
];
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

let ForgottenPasswordComponent = class ForgottenPasswordComponent {
    constructor(store, traductions, styles) {
        this.store = store;
        this.traductions = traductions;
        this.styles = styles;
        this.emailPlaceholder = 'Your email';
        this.sendButtonTraduction = 'Send';
        this.buttonsBackgroundColor = '#3f51b5';
        this.buttonsColor = 'white';
    }
    ngOnInit() {
        this.emailPlaceholder = get(this.traductions || {}, 'form.emailPlaceholder', this.emailPlaceholder);
        this.sendButtonTraduction = get(this.traductions || {}, 'buttons.send', this.sendButtonTraduction);
        this.buttonsBackgroundColor = get(this.styles || {}, 'buttonsBackgroundColor', this.buttonsBackgroundColor);
        this.buttonsColor = get(this.styles || {}, 'buttonsColor', this.buttonsColor);
    }
    send() {
        this.store.dispatch(new SendPassword(this.emailInput.nativeElement.value));
    }
};
ForgottenPasswordComponent.ctorParameters = () => [
    { type: Store },
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_TRADUCTIONS,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_STYLES,] }] }
];
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

let SignUpComponent = class SignUpComponent {
    constructor(traductions, styles, dialogRef, formBuilder, store) {
        this.traductions = traductions;
        this.styles = styles;
        this.dialogRef = dialogRef;
        this.formBuilder = formBuilder;
        this.store = store;
        this.isSignUpLoading$ = this.store.pipe(select(selectIsSignUpLoading));
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
    ngOnInit() {
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
    }
    onSubmitUser() {
        const newUser = {
            username: this.userForm.value['username'],
            password: this.userForm.value['password'],
            firstName: this.userForm.value['firstName'],
            lastName: this.userForm.value['lastName'],
            email: this.userForm.value['email'],
            enterprise: this.userForm.value['enterprise'] || null,
            isActivated: false
        };
        this.store.dispatch(new SignUp(newUser));
    }
};
SignUpComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_TRADUCTIONS,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_STYLES,] }] },
    { type: MatDialogRef },
    { type: FormBuilder },
    { type: Store }
];
SignUpComponent = __decorate([
    Component({
        selector: 'auth-lib-sign-up',
        template: "<div id=\"container\">\n    <h2 mat-dialog-title>{{ signUpDialogTitle }}</h2>\n    <form [formGroup]=\"userForm\" (ngSubmit)=\"onSubmitUser()\">\n\n        <div id=\"columns\">\n            <div id=\"left-column\">\n                <mat-form-field>\n                    <input matInput [placeholder]=\"usernamePlaceholder\" formControlName=\"username\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"firstNamePlaceholder\" formControlName=\"firstName\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"emailPlaceholder\" formControlName=\"email\" autocomplete=\"off\">\n                </mat-form-field>\n            </div>\n\n            <div id=\"right-column\">\n                <mat-form-field>\n                    <input matInput type=\"password\" [placeholder]=\"passwordPlaceholder\" formControlName=\"password\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"lastNamePlaceholder\" formControlName=\"lastName\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"enterprisePlaceholder\" formControlName=\"enterprise\" autocomplete=\"off\">\n                </mat-form-field>\n            </div>\n        </div>\n\n        <button\n            *ngIf=\"!(isSignUpLoading$ | async)\"\n            mat-raised-button\n            type=\"submit\"\n            [disabled]=\"userForm.invalid\"\n            [ngStyle]=\"{\n                'background-color': buttonsBackgroundColor,\n                'color': buttonsColor\n            }\"\n        >\n            {{ signupButtonTraduction }}\n        </button>\n        <mat-spinner *ngIf=\"isSignUpLoading$ | async\" [diameter]=\"36\"></mat-spinner>\n    </form>\n</div>\n",
        styles: ["#container{display:flex;flex-direction:column;width:600px}#container form{margin-top:20px;display:flex;flex-direction:column;justify-content:space-between}#container form #columns{display:flex;flex-direction:row;justify-content:space-between}#container form #columns #left-column{margin-right:20px}#container form #columns #left-column,#container form #columns #right-column{display:flex;flex-direction:column;justify-content:space-between;width:100%}#container mat-form-field{width:100%}#container button{margin-top:20px;-ms-grid-row-align:center;align-self:center}"]
    }),
    __param(0, Inject(AUTH_TRADUCTIONS)),
    __param(1, Inject(AUTH_STYLES))
], SignUpComponent);

let ActivateUserComponent = class ActivateUserComponent {
    constructor(store, route, traductions, styles, images) {
        this.store = store;
        this.route = route;
        this.traductions = traductions;
        this.styles = styles;
        this.images = images;
        this.isSendActivationCodeLoading$ = this.store.pipe(select(selectIsSendActivationCodeLoading));
        this.activationCodePlaceholder = 'Enter your activation code';
        this.buttonsBackgroundColor = '#3f51b5';
        this.buttonsColor = 'white';
        this.sendActivationButtonTraduction = 'Send';
    }
    ngOnInit() {
        this.sendActivationButtonTraduction = get(this.traductions || {}, 'buttons.sendActivationCode', this.sendActivationButtonTraduction);
        this.activationCodePlaceholder = get(this.traductions || {}, 'form.activationCodePlaceholder', this.activationCodePlaceholder);
        this.buttonsBackgroundColor = get(this.styles || {}, 'buttonsBackgroundColor', this.buttonsBackgroundColor);
        this.buttonsColor = get(this.styles || {}, 'buttonsColor', this.buttonsColor);
    }
    ngAfterViewInit() {
        const activationCode = this.route.snapshot.paramMap.get('activationCode');
        if (activationCode) {
            setTimeout(() => {
                this.activationCodeInput.nativeElement.value = activationCode;
                this.onSubmitActivationCode();
            });
        }
    }
    onSubmitActivationCode() {
        const activationCode = this.activationCodeInput.nativeElement.value;
        if (activationCode) {
            this.store.dispatch(new SendActivationCode(activationCode));
        }
    }
};
ActivateUserComponent.ctorParameters = () => [
    { type: Store },
    { type: ActivatedRoute },
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_TRADUCTIONS,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_STYLES,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_IMAGES_URLS,] }] }
];
__decorate([
    ViewChild('activationCode')
], ActivateUserComponent.prototype, "activationCodeInput", void 0);
ActivateUserComponent = __decorate([
    Component({
        selector: 'auth-lib-activate-user',
        template: "<div class=\"activate-password-container\" [ngStyle]=\"{'background-image': 'url(' + images.loginBackgroundImageUrl + ')'}\">\n  <mat-card class=\"mat-elevation-z8\">\n    <img *ngIf=\"images.logoImageUrl && images.logoImageUrl.length >= 1\" [src]=\"images.logoImageUrl\">\n      <mat-form-field>\n        <input matInput [placeholder]=\"activationCodePlaceholder\" #activationCode>\n      </mat-form-field>\n    \n      <button\n          *ngIf=\"!(isSendActivationCodeLoading$ | async)\"\n          mat-raised-button\n          type=\"button\"\n          [disabled]=\"!(this.activationCodeInput && this.activationCodeInput.nativeElement && this.activationCodeInput.nativeElement.value)\"\n          (click)=\"onSubmitActivationCode()\"\n          [ngStyle]=\"{\n            'background-color': buttonsBackgroundColor,\n            'color': buttonsColor\n          }\"\n      >\n          {{ sendActivationButtonTraduction }}\n      </button>\n      <mat-spinner *ngIf=\"isSendActivationCodeLoading$ | async\" [diameter]=\"36\"></mat-spinner>\n  </mat-card>\n</div>\n",
        styles: [".activate-password-container{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;width:100%;flex:1;background-size:cover}.activate-password-container mat-card{display:flex;flex-direction:column;justify-content:center;align-items:center;height:400px;width:400px;box-sizing:border-box;padding:2%}.activate-password-container mat-card img{display:block;max-width:200px;max-height:100px;width:auto;height:auto;margin-bottom:20px}.activate-password-container mat-card mat-form-field{width:75%;font-size:16px}.activate-password-container mat-card button,.activate-password-container mat-card mat-spinner{margin-top:20px}"]
    }),
    __param(2, Inject(AUTH_TRADUCTIONS)),
    __param(3, Inject(AUTH_STYLES)),
    __param(4, Inject(AUTH_IMAGES_URLS))
], ActivateUserComponent);

const initialState = {
    isAuthenticated: false,
    isSignUpLoading: false,
    isSendActivationCodeLoading: false,
    isUserActivated: null,
    isUserCreated: null,
    isLoginLoading: false,
    user: null,
    error: null,
    isPasswordBeingChanged: false,
    usersList: null
};
function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_ACTIONS_TYPE.SIGN_UP:
            return Object.assign(Object.assign({}, state), { error: null, isSignUpLoading: true });
        case AUTH_ACTIONS_TYPE.SIGN_UP_FAILURE:
            return Object.assign(Object.assign({}, state), { error: action.payload, isSignUpLoading: false, isUserCreated: false });
        case AUTH_ACTIONS_TYPE.SIGN_UP_SUCCESS:
            return Object.assign(Object.assign({}, state), { error: null, isSignUpLoading: false, isUserCreated: true });
        case AUTH_ACTIONS_TYPE.SEND_ACTIVATION_CODE:
            return Object.assign(Object.assign({}, state), { error: null, isSendActivationCodeLoading: true });
        case AUTH_ACTIONS_TYPE.SEND_ACTIVATION_CODE_FAILURE:
            return Object.assign(Object.assign({}, state), { error: action.payload, isSendActivationCodeLoading: false, isUserActivated: false });
        case AUTH_ACTIONS_TYPE.SEND_ACTIVATION_CODE_SUCCESS:
            return Object.assign(Object.assign({}, state), { error: null, isSendActivationCodeLoading: false, isUserActivated: true });
        case AUTH_ACTIONS_TYPE.LOG_IN:
            return Object.assign(Object.assign({}, state), { error: null, isLoginLoading: true });
        case AUTH_ACTIONS_TYPE.LOG_IN_SUCCESS:
            return Object.assign(Object.assign({}, state), { isAuthenticated: true, user: action.payload.user, error: null, usersList: action.payload.usersList, isLoginLoading: false });
        case AUTH_ACTIONS_TYPE.LOG_IN_FAILURE:
            return Object.assign(Object.assign({}, state), { error: action.payload, isLoginLoading: false });
        case AUTH_ACTIONS_TYPE.LOG_OUT:
            return initialState;
        case AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION_SUCCESS:
            const detailedUser = Object.assign(Object.assign({}, state.user), action.payload);
            return Object.assign(Object.assign({}, state), { user: detailedUser });
        case AUTH_ACTIONS_TYPE.CHANGE_PASSWORD:
        case AUTH_ACTIONS_TYPE.SEND_PASSWORD:
            return Object.assign(Object.assign({}, state), { isPasswordBeingChanged: true });
        case AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_SUCCESS:
        case AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_FAILURE:
        case AUTH_ACTIONS_TYPE.SEND_PASSWORD_SUCCESS:
        case AUTH_ACTIONS_TYPE.SEND_PASSWORD_FAILURE:
            return Object.assign(Object.assign({}, state), { isPasswordBeingChanged: false });
        case AUTH_ACTIONS_TYPE.UPDATE_USER:
            return Object.assign(Object.assign({}, state), { user: Object.assign(Object.assign({}, state.user), action.payload) });
        case AUTH_ACTIONS_TYPE.RESET_AUTH_STATE:
            return initialState;
        default:
            return state;
    }
}

let AuthEffects = class AuthEffects {
    constructor(resetActions, traductions, platformId, actions, authService, router, toastService, dialog, store) {
        this.resetActions = resetActions;
        this.traductions = traductions;
        this.platformId = platformId;
        this.actions = actions;
        this.authService = authService;
        this.router = router;
        this.toastService = toastService;
        this.dialog = dialog;
        this.store = store;
        this.OpenSignUpDialog$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.OPEN_SIGN_UP_DIALOG), tap(() => this.dialogRef = this.dialog.open(SignUpComponent)));
        this.SignUp$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.SIGN_UP), map((action) => action.payload), switchMap((user) => this.authService.createUser(user).pipe(map(() => new SignUpSuccess()), catchError((error) => of(new SignUpFailure(error))))));
        this.SignUpSuccess$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.SIGN_UP_SUCCESS), tap(() => {
            this.toastService.success(get(this.traductions || {}, 'messages.signupSuccess', 'Your account has been created!'));
            if (this.dialogRef) {
                this.dialogRef.close();
            }
        }));
        this.SignUpFailure$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.SIGN_UP_FAILURE), map((action) => action.payload), tap((error) => this.toastService.error(get(this.traductions || {}, 'messages.signupFailure', 'Please try again.'))));
        this.SendActivationCode$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.SEND_ACTIVATION_CODE), map((action) => action.payload), switchMap((activationCode) => this.authService.sendActivationCode(activationCode).pipe(map(() => new SendActivationCodeSuccess()), catchError((error) => of(new SendActivationCodeFailure(error))))));
        this.SendActivationCodeSuccess$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.SEND_ACTIVATION_CODE_SUCCESS), tap(() => {
            this.toastService.success(get(this.traductions || {}, 'messages.sendActivationCodeSuccess', 'Your account has been verified!'));
            this.router.navigate(['log-in']);
        }), map(() => new ResetAuthState()));
        this.SendActivationCodeFailure$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.SEND_ACTIVATION_CODE_FAILURE), tap((error) => this.toastService.error(get(this.traductions || {}, 'messages.sendActivationCodeFailure', 'Please try again with the correct code.'))));
        this.LogIn$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.LOG_IN), filter((action) => isPlatformBrowser(this.platformId)), map((action) => action.payload), switchMap((user) => this.authService.login(user).pipe(concatMap((loggedInUser) => {
            sessionStorage.setItem('token', loggedInUser.token.token);
            return this.authService.getUserInformation().pipe(map(({ user, usersList }) => new LogInSuccess({ user, usersList })), catchError((error) => of(new LogInFailure(error))));
        }), catchError((error) => of(new LogInFailure(error))))));
        this.LogInSuccess$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.LOG_IN_SUCCESS), filter((action) => isPlatformBrowser(this.platformId)), withLatestFrom(this.store.pipe(select(selectUser))), tap(([action, user]) => {
            const redirectedUrlAfterLogIn = sessionStorage.getItem('redirectedUrlAfterLogIn');
            if (redirectedUrlAfterLogIn && isPlatformBrowser(this.platformId)) {
                this.router.navigateByUrl(redirectedUrlAfterLogIn);
                sessionStorage.removeItem('redirectedUrlAfterLogIn');
            }
            else {
                this.router.navigateByUrl(user.redirectUrlAfterLogin);
            }
            this.toastService.success(get(this.traductions || {}, 'messages.loginSuccess', 'Hi! Nice to see you again!'));
        }));
        this.LogInFailure$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.LOG_IN_FAILURE), tap((error) => this.toastService.error(get(this.traductions || {}, 'messages.loginFailure', 'Wrong credentials. Please check again.'))));
        this.LogOut$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.LOG_OUT), filter((action) => isPlatformBrowser(this.platformId)), switchMap((action) => {
            sessionStorage.removeItem('token');
            this.router.navigate(['log-in']);
            return (this.resetActions || []).map((resetAction) => new resetAction());
        }));
        this.LoadUserInformation$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION), switchMap((action) => this.authService.getUserInformation().pipe(map(({ user, usersList }) => new LoadUserInformationSuccess(user)), catchError((error) => of(new LoadUserInformationFailure(error))))));
        this.ChangePassword$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.CHANGE_PASSWORD), switchMap((action) => this.authService.changePassword(action.payload).pipe(map(() => new ChangePasswordSuccess()), catchError((error) => of(new ChangePasswordFailure(error))))));
        this.ChangePasswordSuccess$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_SUCCESS), tap(() => this.toastService.success(get(this.traductions || {}, 'messages.changePasswordSuccess', 'Your password has been successfully changed!'))));
        this.ChangePasswordFailure$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_FAILURE), tap((error) => this.toastService.error(get(this.traductions || {}, 'messages.changePasswordFailure', 'Wrong current password. Please try again.'))));
        this.OpenForgottenPasswordDialog$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.OPEN_FORGOTTEN_PASSWORD_DIALOG), tap(() => this.dialogRef = this.dialog.open(ForgottenPasswordComponent)));
        this.SendPassword$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.SEND_PASSWORD), tap(() => {
            this.dialogRef.close();
        }), switchMap((action) => this.authService.sendPassword(action.payload).pipe(map(() => new SendPasswordSuccess()), catchError((error) => of(new SendPasswordFailure(error))))));
        this.SendPasswordSuccess$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.SEND_PASSWORD_SUCCESS), tap(() => this.toastService.success(get(this.traductions || {}, 'messages.passwordResetSuccess', 'An email for resetting your password has been sent to your address.'))));
        this.SendPasswordFailure$ = this.actions.pipe(ofType(AUTH_ACTIONS_TYPE.SEND_PASSWORD_FAILURE), tap(() => this.toastService.error(get(this.traductions || {}, 'messages.passwordResetFailure', 'An error occured. Please try again.'))));
    }
};
AuthEffects.ctorParameters = () => [
    { type: Array, decorators: [{ type: Inject, args: [AUTH_RESET_ACTIONS,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_TRADUCTIONS,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: Actions },
    { type: AuthService },
    { type: Router },
    { type: ToastrService },
    { type: MatDialog },
    { type: Store }
];
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
], AuthEffects.prototype, "SendActivationCode$", void 0);
__decorate([
    Effect()
], AuthEffects.prototype, "SendActivationCodeSuccess$", void 0);
__decorate([
    Effect({ dispatch: false })
], AuthEffects.prototype, "SendActivationCodeFailure$", void 0);
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

var AuthModule_1;
let AuthModule = AuthModule_1 = class AuthModule {
    static forRoot(config) {
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
    }
};
AuthModule = AuthModule_1 = __decorate([
    NgModule({
        declarations: [LogInComponent, ForgottenPasswordComponent, SignUpComponent, ActivateUserComponent],
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
        exports: [LogInComponent, ForgottenPasswordComponent, SignUpComponent, ActivateUserComponent],
        providers: [AuthGuard]
    })
], AuthModule);

/*
 * Public API Surface of angular-auth-lib
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AUTH_ACTIONS_TYPE, AUTH_API_URLS, AUTH_IMAGES_URLS, AUTH_RESET_ACTIONS, AUTH_STYLES, AUTH_TRADUCTIONS, ActivateUserComponent, AuthGuard, AuthModule, AuthService, ChangePassword, ChangePasswordFailure, ChangePasswordSuccess, ForgottenPasswordComponent, LoadUserInformation, LoadUserInformationFailure, LoadUserInformationSuccess, LogIn, LogInComponent, LogInFailure, LogInSuccess, LogOut, OpenForgottenPasswordDialog, OpenSignUpDialog, ResetAuthState, SendActivationCode, SendActivationCodeFailure, SendActivationCodeSuccess, SendPassword, SendPasswordFailure, SendPasswordSuccess, SignUp, SignUpComponent, SignUpFailure, SignUpSuccess, TokenInterceptor, UpdateUser, authReducer, initialState, selectAuthState, selectIsActivated, selectIsAuthenticated, selectIsLoginLoading, selectIsPasswordBeingChanged, selectIsSendActivationCodeLoading, selectIsSignUpLoading, selectIsUserCreated, selectLogInError, selectUser, selectUsersList, ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, AuthEffects as ɵa };
//# sourceMappingURL=angular-auth-lib.js.map
