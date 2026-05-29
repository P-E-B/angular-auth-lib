import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';

import { authFeature, AuthState } from './reducer';
import { AuthActions } from './actions';

describe('authFeature.reducer', () => {
    const reducer = authFeature.reducer;
    const INIT = { type: '@@init' } as Action;

    let initial: AuthState;

    beforeEach(() => {
        initial = reducer(undefined, INIT);
    });

    it('returns the initial state for an unknown action', () => {
        expect(initial).toEqual({
            isAuthenticated: false,
            isLoading: false,
            user: null,
        });
    });

    describe('rehydrate', () => {
        it('sets isAuthenticated from hasToken = true', () => {
            const state = reducer(initial, AuthActions.rehydrate({ hasToken: true }));

            expect(state.isAuthenticated).toBeTrue();
            expect(state.isLoading).toBeFalse();
            expect(state.user).toBeNull();
        });

        it('sets isAuthenticated from hasToken = false and preserves the rest of state', () => {
            const before: AuthState = { isAuthenticated: true, isLoading: false, user: { id: 1 } };

            const state = reducer(before, AuthActions.rehydrate({ hasToken: false }));

            expect(state.isAuthenticated).toBeFalse();
            expect(state.user).toEqual({ id: 1 });
        });
    });

    describe('logIn', () => {
        it('sets isLoading', () => {
            const state = reducer(initial, AuthActions.logIn({ payload: { email: 'a@b.c', password: 'pw' } }));

            expect(state.isLoading).toBeTrue();
            expect(state.isAuthenticated).toBeFalse();
            expect(state.user).toBeNull();
        });
    });

    describe('logInSuccess', () => {
        it('sets isAuthenticated + user and clears isLoading', () => {
            const before: AuthState = { ...initial, isLoading: true };
            const user = { id: 7, email: 'a@b.c' };

            const state = reducer(before, AuthActions.logInSuccess({ payload: { user } }));

            expect(state).toEqual({
                isAuthenticated: true,
                isLoading: false,
                user,
            });
        });
    });

    describe('logInFailure', () => {
        it('clears isLoading', () => {
            const before: AuthState = { ...initial, isLoading: true };
            const error = new HttpErrorResponse({ status: 401 });

            const state = reducer(before, AuthActions.logInFailure({ payload: error }));

            expect(state.isLoading).toBeFalse();
            expect(state.isAuthenticated).toBeFalse();
            expect(state.user).toBeNull();
        });
    });

    describe('loadUserInformationSuccess', () => {
        it('sets user', () => {
            const before: AuthState = { ...initial, isAuthenticated: true };
            const user = { id: 42, name: 'Jane' };

            const state = reducer(before, AuthActions.loadUserInformationSuccess({ payload: user }));

            expect(state.user).toBe(user);
            expect(state.isAuthenticated).toBeTrue();
            expect(state.isLoading).toBeFalse();
        });
    });

    describe('updateUser', () => {
        it('sets user', () => {
            const before: AuthState = { isAuthenticated: true, isLoading: false, user: { id: 1, name: 'old' } };
            const next = { id: 1, name: 'new' };

            const state = reducer(before, AuthActions.updateUser({ payload: next }));

            expect(state.user).toBe(next);
            expect(state.isAuthenticated).toBeTrue();
        });
    });

    describe('logOut', () => {
        it('returns the initial state', () => {
            const before: AuthState = { isAuthenticated: true, isLoading: true, user: { id: 1 } };

            const state = reducer(before, AuthActions.logOut());

            expect(state).toEqual(initial);
        });
    });

    describe('resetAuthState', () => {
        it('returns the initial state', () => {
            const before: AuthState = { isAuthenticated: true, isLoading: false, user: { id: 9 } };

            const state = reducer(before, AuthActions.resetAuthState());

            expect(state).toEqual(initial);
        });
    });
});
