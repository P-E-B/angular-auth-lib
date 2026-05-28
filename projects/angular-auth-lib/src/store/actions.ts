import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { User } from '../models/user.models';

/**
 * NgRx 20 action group for the auth feature.
 *
 * Prefer importing this grouped object in new code:
 *   `store.dispatch(AuthActions.logIn({ payload: user }))`
 *
 * Legacy PascalCase aliases (e.g. `LogIn`, `SignUp`, …) are re-exported below
 * so existing imports keep resolving.
 */
export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'Open Sign Up Dialog': emptyProps(),
        'Sign Up': props<{ payload: Partial<User> }>(),
        'Sign Up Success': emptyProps(),
        'Sign Up Failure': props<{ payload: HttpErrorResponse }>(),

        'Send Activation Code': props<{ payload: string }>(),
        'Send Activation Code Success': emptyProps(),
        'Send Activation Code Failure': props<{ payload: HttpErrorResponse }>(),

        'Log In': props<{ payload: Partial<User> }>(),
        'Log In Success': props<{
            payload: {
                user: User;
                usersList: { id: number; firstName: string; lastName: string }[];
            };
        }>(),
        'Log In Failure': props<{ payload: HttpErrorResponse }>(),

        'Log Out': emptyProps(),

        'Load User Information': emptyProps(),
        'Load User Information Success': props<{ payload: User }>(),
        'Load User Information Failure': props<{ payload: HttpErrorResponse }>(),

        'Change Password': props<{ payload: { currentPassword: string; nextPassword: string } }>(),
        'Change Password Success': emptyProps(),
        'Change Password Failure': props<{ payload: HttpErrorResponse }>(),

        'Open Forgotten Password Dialog': emptyProps(),
        'Send Password': props<{ payload: string }>(),
        'Send Password Success': emptyProps(),
        'Send Password Failure': props<{ payload: HttpErrorResponse }>(),

        'Update User': props<{ payload: Partial<User> }>(),

        'Reset Auth State': emptyProps(),
    },
});

// ---------------------------------------------------------------------------
// Back-compat individual exports
// ---------------------------------------------------------------------------
// The library historically exported one class per action. The destructured
// constants below keep those import paths working while pointing at the new
// action creators. Dispatch syntax changes from `new LogIn(user)` to
// `LogIn({ payload: user })`.
// ---------------------------------------------------------------------------

export const {
    openSignUpDialog: OpenSignUpDialog,
    signUp: SignUp,
    signUpSuccess: SignUpSuccess,
    signUpFailure: SignUpFailure,
    sendActivationCode: SendActivationCode,
    sendActivationCodeSuccess: SendActivationCodeSuccess,
    sendActivationCodeFailure: SendActivationCodeFailure,
    logIn: LogIn,
    logInSuccess: LogInSuccess,
    logInFailure: LogInFailure,
    logOut: LogOut,
    loadUserInformation: LoadUserInformation,
    loadUserInformationSuccess: LoadUserInformationSuccess,
    loadUserInformationFailure: LoadUserInformationFailure,
    changePassword: ChangePassword,
    changePasswordSuccess: ChangePasswordSuccess,
    changePasswordFailure: ChangePasswordFailure,
    openForgottenPasswordDialog: OpenForgottenPasswordDialog,
    sendPassword: SendPassword,
    sendPasswordSuccess: SendPasswordSuccess,
    sendPasswordFailure: SendPasswordFailure,
    updateUser: UpdateUser,
    resetAuthState: ResetAuthState,
} = AuthActions;

/**
 * @deprecated The string-literal action types are now derived from
 * `createActionGroup`. This map is kept so existing
 * `ofType(AUTH_ACTIONS_TYPE.X)` / switch-case call sites keep compiling, but
 * prefer passing the action creator directly: `ofType(AuthActions.logIn)`.
 *
 * Note: the literal string values changed as part of the migration
 * (e.g. `'[Auth] User tries to log in'` → `'[Auth] Log In'`).
 */
export const AUTH_ACTIONS_TYPE = {
    OPEN_SIGN_UP_DIALOG: OpenSignUpDialog.type,
    SIGN_UP: SignUp.type,
    SIGN_UP_SUCCESS: SignUpSuccess.type,
    SIGN_UP_FAILURE: SignUpFailure.type,

    SEND_ACTIVATION_CODE: SendActivationCode.type,
    SEND_ACTIVATION_CODE_SUCCESS: SendActivationCodeSuccess.type,
    SEND_ACTIVATION_CODE_FAILURE: SendActivationCodeFailure.type,

    LOG_IN: LogIn.type,
    LOG_IN_SUCCESS: LogInSuccess.type,
    LOG_IN_FAILURE: LogInFailure.type,

    LOG_OUT: LogOut.type,

    LOAD_USER_INFORMATION: LoadUserInformation.type,
    LOAD_USER_INFORMATION_SUCCESS: LoadUserInformationSuccess.type,
    LOAD_USER_INFORMATION_FAILURE: LoadUserInformationFailure.type,

    CHANGE_PASSWORD: ChangePassword.type,
    CHANGE_PASSWORD_SUCCESS: ChangePasswordSuccess.type,
    CHANGE_PASSWORD_FAILURE: ChangePasswordFailure.type,

    OPEN_FORGOTTEN_PASSWORD_DIALOG: OpenForgottenPasswordDialog.type,
    SEND_PASSWORD: SendPassword.type,
    SEND_PASSWORD_SUCCESS: SendPasswordSuccess.type,
    SEND_PASSWORD_FAILURE: SendPasswordFailure.type,

    UPDATE_USER: UpdateUser.type,

    RESET_AUTH_STATE: ResetAuthState.type,
} as const;

export type AUTH_ACTIONS_TYPE = (typeof AUTH_ACTIONS_TYPE)[keyof typeof AUTH_ACTIONS_TYPE];

/**
 * @deprecated Union of every auth action shape. Kept for legacy reducers that
 * `switch (action.type)`. New code should use `createReducer` / `on()` and let
 * NgRx infer the action type.
 */
export type Actions =
    | ReturnType<typeof OpenSignUpDialog>
    | ReturnType<typeof SignUp>
    | ReturnType<typeof SignUpSuccess>
    | ReturnType<typeof SignUpFailure>
    | ReturnType<typeof SendActivationCode>
    | ReturnType<typeof SendActivationCodeSuccess>
    | ReturnType<typeof SendActivationCodeFailure>
    | ReturnType<typeof LogIn>
    | ReturnType<typeof LogInSuccess>
    | ReturnType<typeof LogInFailure>
    | ReturnType<typeof LogOut>
    | ReturnType<typeof LoadUserInformation>
    | ReturnType<typeof LoadUserInformationSuccess>
    | ReturnType<typeof LoadUserInformationFailure>
    | ReturnType<typeof ChangePassword>
    | ReturnType<typeof ChangePasswordSuccess>
    | ReturnType<typeof ChangePasswordFailure>
    | ReturnType<typeof OpenForgottenPasswordDialog>
    | ReturnType<typeof SendPassword>
    | ReturnType<typeof SendPasswordSuccess>
    | ReturnType<typeof SendPasswordFailure>
    | ReturnType<typeof UpdateUser>
    | ReturnType<typeof ResetAuthState>;
