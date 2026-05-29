import { createFeature, createReducer, on } from '@ngrx/store';

import { AuthActions } from './actions';

/**
 * Auth feature state. The user record is held as `unknown` so the library
 * imposes no shape on it; consumers retrieve it typed via `selectAuthUser<T>()`.
 */
export interface AuthState {
    isAuthenticated: boolean;
    /** True while a `logIn` request is in flight. */
    isLoading: boolean;
    user: unknown | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
};

export const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialState,

        on(AuthActions.rehydrate, (state, { hasToken }): AuthState => ({
            ...state,
            isAuthenticated: hasToken,
        })),

        on(AuthActions.logIn, (state): AuthState => ({ ...state, isLoading: true })),

        on(AuthActions.logInSuccess, (state, { payload }): AuthState => ({
            ...state,
            isAuthenticated: true,
            isLoading: false,
            user: payload.user,
        })),

        on(AuthActions.logInFailure, (state): AuthState => ({ ...state, isLoading: false })),

        on(
            AuthActions.loadUserInformationSuccess,
            AuthActions.updateUser,
            (state, { payload }): AuthState => ({ ...state, user: payload })
        ),

        on(AuthActions.logOut, AuthActions.resetAuthState, (): AuthState => initialState)
    ),
});
