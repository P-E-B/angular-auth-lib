import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
    selectAuthState,
    (state: AuthState) => state.isAuthenticated
);

export const selectLogInError = createSelector(
    selectAuthState,
    (state: AuthState) => state.error
);

export const selectUser = createSelector(
    selectAuthState,
    (state: AuthState) => state.user
);

export const selectIsPasswordBeingChanged = createSelector(
    selectAuthState,
    (state: AuthState) => state.isPasswordBeingChanged
);

export const selectUsersList = createSelector(
    selectAuthState,
    (state: AuthState) => state.usersList
); // list of colleagues of the current user for example
