import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.models';
export declare enum AUTH_ACTIONS_TYPE {
    OPEN_SIGN_UP_DIALOG = "[Auth] User wants to sign up",
    SIGN_UP = "[Auth] User tries to sign up",
    SIGN_UP_SUCCESS = "[Auth] Sign up success",
    SIGN_UP_FAILURE = "[Auth] Sign up failure",
    SEND_ACTIVATION_CODE = "[Auth] User sends his activation code",
    SEND_ACTIVATION_CODE_SUCCESS = "[Auth] Success while sending the activation",
    SEND_ACTIVATION_CODE_FAILURE = "[Auth] Activation code failure",
    LOG_IN = "[Auth] User tries to log in",
    LOG_IN_SUCCESS = "[Auth] Log in success",
    LOG_IN_FAILURE = "[Auth] Log in failure",
    LOG_OUT = "[Auth] User logs out",
    LOAD_USER_INFORMATION = "[Auth] Loading of user information",
    LOAD_USER_INFORMATION_SUCCESS = "[Auth] Loading of user information success",
    LOAD_USER_INFORMATION_FAILURE = "[Auth] Loading of user information failure",
    CHANGE_PASSWORD = "[Auth] User changes his password",
    CHANGE_PASSWORD_SUCCESS = "[Auth] Password change success",
    CHANGE_PASSWORD_FAILURE = "[Auth] Password change failure",
    OPEN_FORGOTTEN_PASSWORD_DIALOG = "[Auth] User opens dialog for password resetting",
    SEND_PASSWORD = "[Auth] User has asked for having back a new password",
    SEND_PASSWORD_SUCCESS = "[Auth] User has received his password",
    SEND_PASSWORD_FAILURE = "[Auth] Error in the process of sending the password to the user",
    UPDATE_USER = "[Auth] Update of user",
    RESET_AUTH_STATE = "[Auth] Reset Auth state"
}
export declare class OpenSignUpDialog implements Action {
    readonly type = AUTH_ACTIONS_TYPE.OPEN_SIGN_UP_DIALOG;
}
export declare class SignUp implements Action {
    payload: Partial<User>;
    readonly type = AUTH_ACTIONS_TYPE.SIGN_UP;
    constructor(payload: Partial<User>);
}
export declare class SignUpSuccess implements Action {
    readonly type = AUTH_ACTIONS_TYPE.SIGN_UP_SUCCESS;
}
export declare class SignUpFailure implements Action {
    payload: HttpErrorResponse;
    readonly type = AUTH_ACTIONS_TYPE.SIGN_UP_FAILURE;
    constructor(payload: HttpErrorResponse);
}
export declare class SendActivationCode implements Action {
    payload: string;
    readonly type = AUTH_ACTIONS_TYPE.SEND_ACTIVATION_CODE;
    constructor(payload: string);
}
export declare class SendActivationCodeSuccess implements Action {
    readonly type = AUTH_ACTIONS_TYPE.SEND_ACTIVATION_CODE_SUCCESS;
}
export declare class SendActivationCodeFailure implements Action {
    payload: HttpErrorResponse;
    readonly type = AUTH_ACTIONS_TYPE.SEND_ACTIVATION_CODE_FAILURE;
    constructor(payload: HttpErrorResponse);
}
export declare class LogIn implements Action {
    payload: Partial<User>;
    readonly type = AUTH_ACTIONS_TYPE.LOG_IN;
    constructor(payload: Partial<User>);
}
export declare class LogInSuccess implements Action {
    payload: {
        user: User;
        usersList: {
            id: number;
            firstName: string;
            lastName: string;
        }[];
    };
    readonly type = AUTH_ACTIONS_TYPE.LOG_IN_SUCCESS;
    constructor(payload: {
        user: User;
        usersList: {
            id: number;
            firstName: string;
            lastName: string;
        }[];
    });
}
export declare class LogInFailure implements Action {
    payload: HttpErrorResponse;
    readonly type = AUTH_ACTIONS_TYPE.LOG_IN_FAILURE;
    constructor(payload: HttpErrorResponse);
}
export declare class LogOut implements Action {
    readonly type = AUTH_ACTIONS_TYPE.LOG_OUT;
}
export declare class LoadUserInformation implements Action {
    readonly type = AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION;
}
export declare class LoadUserInformationSuccess implements Action {
    payload: User;
    readonly type = AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION_SUCCESS;
    constructor(payload: User);
}
export declare class LoadUserInformationFailure implements Action {
    payload: HttpErrorResponse;
    readonly type = AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION_FAILURE;
    constructor(payload: HttpErrorResponse);
}
export declare class ChangePassword implements Action {
    payload: {
        currentPassword: string;
        nextPassword: string;
    };
    readonly type = AUTH_ACTIONS_TYPE.CHANGE_PASSWORD;
    constructor(payload: {
        currentPassword: string;
        nextPassword: string;
    });
}
export declare class ChangePasswordSuccess implements Action {
    readonly type = AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_SUCCESS;
}
export declare class ChangePasswordFailure implements Action {
    payload: HttpErrorResponse;
    readonly type = AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_FAILURE;
    constructor(payload: HttpErrorResponse);
}
export declare class OpenForgottenPasswordDialog implements Action {
    readonly type = AUTH_ACTIONS_TYPE.OPEN_FORGOTTEN_PASSWORD_DIALOG;
}
export declare class SendPassword implements Action {
    payload: string;
    readonly type = AUTH_ACTIONS_TYPE.SEND_PASSWORD;
    constructor(payload: string);
}
export declare class SendPasswordSuccess implements Action {
    readonly type = AUTH_ACTIONS_TYPE.SEND_PASSWORD_SUCCESS;
}
export declare class SendPasswordFailure implements Action {
    payload: HttpErrorResponse;
    readonly type = AUTH_ACTIONS_TYPE.SEND_PASSWORD_FAILURE;
    constructor(payload: HttpErrorResponse);
}
export declare class UpdateUser implements Action {
    payload: Partial<User>;
    readonly type = AUTH_ACTIONS_TYPE.UPDATE_USER;
    constructor(payload: Partial<User>);
}
export declare class ResetAuthState implements Action {
    readonly type = AUTH_ACTIONS_TYPE.RESET_AUTH_STATE;
}
export declare type Actions = OpenSignUpDialog | SignUp | SignUpSuccess | SignUpFailure | SendActivationCode | SendActivationCodeSuccess | SendActivationCodeFailure | LogIn | LogInSuccess | LogInFailure | LogOut | LoadUserInformation | LoadUserInformationSuccess | LoadUserInformationFailure | ChangePassword | ChangePasswordSuccess | ChangePasswordFailure | OpenForgottenPasswordDialog | SendPassword | SendPasswordSuccess | SendPasswordFailure | UpdateUser | ResetAuthState;
