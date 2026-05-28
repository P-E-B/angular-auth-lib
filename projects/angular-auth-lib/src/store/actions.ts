import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { Token, User } from '../models/user.models';

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

        'Refresh Token': emptyProps(),
        'Refresh Token Success': props<{ payload: Token }>(),
        'Refresh Token Failure': props<{ payload: HttpErrorResponse }>(),

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
    refreshToken: RefreshToken,
    refreshTokenSuccess: RefreshTokenSuccess,
    refreshTokenFailure: RefreshTokenFailure,
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
