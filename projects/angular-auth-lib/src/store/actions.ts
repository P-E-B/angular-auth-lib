import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.models';

export enum AUTH_ACTIONS_TYPE {
    OPEN_SIGN_UP_DIALOG = '[Auth] User wants to sign up',
    SIGN_UP = '[Auth] User tries to sign up',
    SIGN_UP_SUCCESS = '[Auth] Sign up success',
    SIGN_UP_FAILURE = '[Auth] Sign up failure',

    LOG_IN = '[Auth] User tries to log in',
    LOG_IN_SUCCESS = '[Auth] Log in success',
    LOG_IN_FAILURE = '[Auth] Log in failure',

    LOG_OUT = '[Auth] User logs out',

    LOAD_USER_INFORMATION = '[Auth] Loading of user information',
    LOAD_USER_INFORMATION_SUCCESS = '[Auth] Loading of user information success',
    LOAD_USER_INFORMATION_FAILURE = '[Auth] Loading of user information failure',

    CHANGE_PASSWORD = '[Auth] User changes his password',
    CHANGE_PASSWORD_SUCCESS = '[Auth] Password change success',
    CHANGE_PASSWORD_FAILURE = '[Auth] Password change failure',

    OPEN_FORGOTTEN_PASSWORD_DIALOG = '[Auth] User opens dialog for password resetting',
    SEND_PASSWORD = '[Auth] User has asked for having back a new password',
    SEND_PASSWORD_SUCCESS = '[Auth] User has received his password',
    SEND_PASSWORD_FAILURE = '[Auth] Error in the process of sending the password to the user',

    UPDATE_USER = '[Auth] Update of user'
}

export class OpenSignUpDialog implements Action {
    readonly type = AUTH_ACTIONS_TYPE.OPEN_SIGN_UP_DIALOG;
}

export class SignUp implements Action {
    readonly type = AUTH_ACTIONS_TYPE.SIGN_UP;
    constructor(public payload: Partial<User>) {}
}

export class SignUpSuccess implements Action {
    readonly type = AUTH_ACTIONS_TYPE.SIGN_UP_SUCCESS;
}

export class SignUpFailure implements Action {
    readonly type = AUTH_ACTIONS_TYPE.SIGN_UP_FAILURE;
    constructor(public payload: HttpErrorResponse) {}
}

export class LogIn implements Action {
    readonly type = AUTH_ACTIONS_TYPE.LOG_IN;
    constructor (public payload: Partial<User>) {}
}

export class LogInSuccess implements Action {
    readonly type = AUTH_ACTIONS_TYPE.LOG_IN_SUCCESS;
    constructor(public payload: {
        user: User,
        usersList: { id: number, firstName: string, lastName: string }[]
    }) {}
}

export class LogInFailure implements Action {
    readonly type = AUTH_ACTIONS_TYPE.LOG_IN_FAILURE;
    constructor(public payload: HttpErrorResponse) {}
}

export class LogOut implements Action {
    readonly type = AUTH_ACTIONS_TYPE.LOG_OUT;
}

export class LoadUserInformation implements Action {
    readonly type = AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION;
}

export class LoadUserInformationSuccess implements Action {
    readonly type = AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION_SUCCESS;
    constructor(public payload: User) {}
}

export class LoadUserInformationFailure implements Action {
    readonly type = AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION_FAILURE;
    constructor(public payload: HttpErrorResponse) {}
}

export class ChangePassword implements Action {
    readonly type = AUTH_ACTIONS_TYPE.CHANGE_PASSWORD;
    constructor(public payload: { currentPassword: string, nextPassword: string }) {}
}

export class ChangePasswordSuccess implements Action {
    readonly type = AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_SUCCESS;
}

export class ChangePasswordFailure implements Action {
    readonly type = AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_FAILURE;
    constructor(public payload: HttpErrorResponse) {}
}

export class OpenForgottenPasswordDialog implements Action {
    readonly type = AUTH_ACTIONS_TYPE.OPEN_FORGOTTEN_PASSWORD_DIALOG;
}

export class SendPassword implements Action {
    readonly type = AUTH_ACTIONS_TYPE.SEND_PASSWORD;
    constructor(public payload: string) {}
}

export class SendPasswordSuccess implements Action {
    readonly type = AUTH_ACTIONS_TYPE.SEND_PASSWORD_SUCCESS;
}

export class SendPasswordFailure implements Action {
    readonly type = AUTH_ACTIONS_TYPE.SEND_PASSWORD_FAILURE;
    constructor(public payload: HttpErrorResponse) {}
}

export class UpdateUser implements Action {
    readonly type = AUTH_ACTIONS_TYPE.UPDATE_USER;
    constructor(public payload: Partial<User>) {}
}

export type Actions = OpenSignUpDialog
    | SignUp
    | SignUpSuccess
    | SignUpFailure
    | LogIn
    | LogInSuccess
    | LogInFailure
    | LogOut
    | LoadUserInformation
    | LoadUserInformationSuccess
    | LoadUserInformationFailure
    | ChangePassword
    | ChangePasswordSuccess
    | ChangePasswordFailure
    | OpenForgottenPasswordDialog
    | SendPassword
    | SendPasswordSuccess
    | SendPasswordFailure
    | UpdateUser;
