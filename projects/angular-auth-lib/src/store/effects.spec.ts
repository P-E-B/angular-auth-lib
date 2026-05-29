import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Subject, of, throwError } from 'rxjs';

import { AuthEffects } from './effects';
import { AuthActions } from './actions';
import { AuthService } from '../services/auth.service';
import { AUTH_API_URLS, AUTH_BEHAVIOR, AUTH_TOKEN_STORAGE, AuthBehaviorConfig, AuthUrlsConfig } from '../token';
import { Token } from '../models/user.models';

describe('AuthEffects', () => {
    let actions$: Subject<Action>;
    let effects: AuthEffects;
    let authService: jasmine.SpyObj<AuthService>;
    let router: jasmine.SpyObj<Router>;
    let queryParams: Record<string, string>;

    const user = { id: 1, email: 'a@b.c' };
    const token: Token = { token: 'h.e30.s', expiringDate: Date.now() + 60_000 };

    const urls: AuthUrlsConfig = {
        accessTokenUrl: '/api/token',
        userInformationUrl: '/api/me',
    };

    const behavior: AuthBehaviorConfig = {
        canActivate: () => true,
        loginRoute: 'log-in',
    };

    const setup = (apiUrls: AuthUrlsConfig = urls) => {
        actions$ = new Subject();
        queryParams = {};
        authService = jasmine.createSpyObj<AuthService>(
            'AuthService',
            ['login', 'logout', 'getUserInformation', 'storeToken', 'getToken'],
            { canRefresh: false }
        );
        router = jasmine.createSpyObj<Router>('Router', ['navigate', 'navigateByUrl']);

        TestBed.configureTestingModule({
            providers: [
                AuthEffects,
                provideMockActions(() => actions$),
                { provide: AuthService, useValue: authService },
                { provide: Router, useValue: router },
                {
                    provide: ActivatedRoute,
                    useValue: { snapshot: { get queryParamMap() { return convertToParamMap(queryParams); } } },
                },
                { provide: PLATFORM_ID, useValue: 'browser' },
                { provide: AUTH_API_URLS, useValue: apiUrls },
                { provide: AUTH_BEHAVIOR, useValue: behavior },
                { provide: AUTH_TOKEN_STORAGE, useValue: { getItem: () => null, setItem: () => {}, removeItem: () => {} } },
            ],
        });
        effects = TestBed.inject(AuthEffects);
    };

    describe('logInSuccess$', () => {
        beforeEach(() => setup());

        it('navigates to a root-relative returnUrl', () => {
            queryParams = { returnUrl: '/foo' };
            effects.logInSuccess$.subscribe();
            actions$.next(AuthActions.logInSuccess({ payload: { user } }));
            expect(router.navigateByUrl).toHaveBeenCalledOnceWith('/foo');
        });

        it('rejects protocol-relative //evil.com and falls back to "/"', () => {
            queryParams = { returnUrl: '//evil.com' };
            effects.logInSuccess$.subscribe();
            actions$.next(AuthActions.logInSuccess({ payload: { user } }));
            expect(router.navigateByUrl).toHaveBeenCalledOnceWith('/');
        });

        it('rejects absolute https://x and falls back to "/"', () => {
            queryParams = { returnUrl: 'https://x' };
            effects.logInSuccess$.subscribe();
            actions$.next(AuthActions.logInSuccess({ payload: { user } }));
            expect(router.navigateByUrl).toHaveBeenCalledOnceWith('/');
        });
    });

    describe('rehydrate$', () => {
        it('fetches the user when a token is present and userInformationUrl is set', () => {
            setup();
            authService.getUserInformation.and.returnValue(of(user));
            const emitted: Action[] = [];
            effects.rehydrate$.subscribe((a) => emitted.push(a));

            actions$.next(AuthActions.rehydrate({ hasToken: true }));

            expect(authService.getUserInformation).toHaveBeenCalled();
            expect(emitted).toEqual([AuthActions.loadUserInformationSuccess({ payload: user })]);
        });

        it('is a no-op when hasToken is false or userInformationUrl is unset', () => {
            setup({ accessTokenUrl: '/api/token' });
            const emitted: Action[] = [];
            effects.rehydrate$.subscribe((a) => emitted.push(a));

            actions$.next(AuthActions.rehydrate({ hasToken: true }));
            actions$.next(AuthActions.rehydrate({ hasToken: false }));

            expect(authService.getUserInformation).not.toHaveBeenCalled();
            expect(emitted).toEqual([]);
        });
    });

    describe('logOut$', () => {
        it('calls authService.logout then navigates to the login route', () => {
            setup();
            authService.logout.and.returnValue(of(void 0));
            effects.logOut$.subscribe();

            actions$.next(AuthActions.logOut());

            expect(authService.logout).toHaveBeenCalled();
            expect(router.navigate).toHaveBeenCalledOnceWith(['log-in']);
        });
    });

    describe('logIn$', () => {
        it('stores the token, fetches the user and dispatches logInSuccess', () => {
            setup();
            authService.login.and.returnValue(of(token));
            authService.getUserInformation.and.returnValue(of(user));
            const emitted: Action[] = [];
            effects.logIn$.subscribe((a) => emitted.push(a));

            actions$.next(AuthActions.logIn({ payload: { email: 'a@b.c', password: 'pw' } }));

            expect(authService.storeToken).toHaveBeenCalledWith(token);
            expect(emitted).toEqual([AuthActions.logInSuccess({ payload: { user } })]);
        });

        it('dispatches logInFailure when login() errors', () => {
            setup();
            const err = new HttpErrorResponse({ status: 401 });
            authService.login.and.returnValue(throwError(() => err));
            const emitted: Action[] = [];
            effects.logIn$.subscribe((a) => emitted.push(a));

            actions$.next(AuthActions.logIn({ payload: {} }));

            expect(authService.storeToken).not.toHaveBeenCalled();
            expect(emitted).toEqual([AuthActions.logInFailure({ payload: err })]);
        });
    });
});
