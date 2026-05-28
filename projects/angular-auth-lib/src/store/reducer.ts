import { createFeature, createReducer, on } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { User } from '../models/user.models';
import * as UserActions from './actions';

export interface AuthState {
    isAuthenticated: boolean;
    isSignUpLoading: boolean;
    isSendActivationCodeLoading: boolean;
    isUserActivated: boolean | null;
    isUserCreated: boolean | null;
    isLoginLoading: boolean;
    user: User | null;
    error: HttpErrorResponse | null;
    isPasswordBeingChanged: boolean;
    usersList: { id: number; firstName: string; lastName: string }[] | null;
}

export const initialState: AuthState = {
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

export const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialState,

        on(UserActions.SignUp, (state): AuthState => ({
            ...state,
            error: null,
            isSignUpLoading: true
        })),
        on(UserActions.SignUpFailure, (state, { payload }): AuthState => ({
            ...state,
            error: payload,
            isSignUpLoading: false,
            isUserCreated: false
        })),
        on(UserActions.SignUpSuccess, (state): AuthState => ({
            ...state,
            error: null,
            isSignUpLoading: false,
            isUserCreated: true
        })),

        on(UserActions.SendActivationCode, (state): AuthState => ({
            ...state,
            error: null,
            isSendActivationCodeLoading: true
        })),
        on(UserActions.SendActivationCodeFailure, (state, { payload }): AuthState => ({
            ...state,
            error: payload,
            isSendActivationCodeLoading: false,
            isUserActivated: false
        })),
        on(UserActions.SendActivationCodeSuccess, (state): AuthState => ({
            ...state,
            error: null,
            isSendActivationCodeLoading: false,
            isUserActivated: true
        })),

        on(UserActions.LogIn, (state): AuthState => ({
            ...state,
            error: null,
            isLoginLoading: true
        })),
        on(UserActions.LogInSuccess, (state, { payload }): AuthState => ({
            ...state,
            isAuthenticated: true,
            user: payload.user,
            error: null,
            usersList: payload.usersList,
            isLoginLoading: false
        })),
        on(UserActions.LogInFailure, (state, { payload }): AuthState => ({
            ...state,
            error: payload,
            isLoginLoading: false
        })),

        on(UserActions.LogOut, (): AuthState => initialState),

        on(UserActions.LoadUserInformationSuccess, (state, { payload }): AuthState => ({
            ...state,
            user: { ...state.user, ...payload }
        })),

        on(
            UserActions.ChangePassword,
            UserActions.SendPassword,
            (state): AuthState => ({ ...state, isPasswordBeingChanged: true })
        ),
        on(
            UserActions.ChangePasswordSuccess,
            UserActions.ChangePasswordFailure,
            UserActions.SendPasswordSuccess,
            UserActions.SendPasswordFailure,
            (state): AuthState => ({ ...state, isPasswordBeingChanged: false })
        ),

        on(UserActions.UpdateUser, (state, { payload }): AuthState => ({
            ...state,
            user: { ...state.user, ...payload } as User
        })),

        on(UserActions.ResetAuthState, (): AuthState => initialState)
    )
});
