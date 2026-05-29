import { EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';

import { Store, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { authFeature } from './store/reducer';
import { AuthEffects } from './store/effects';
import { AuthActions } from './store/actions';
import { AuthService } from './services/auth.service';
import { AuthModuleConfig, AUTH_API_URLS, AUTH_BEHAVIOR } from './token';

/**
 * Registers the `angular-auth-lib` feature for a standalone Angular application.
 *
 * Wires up the `AUTH_*` configuration tokens, the NgRx `auth` feature
 * state + effects, and a bootstrap initializer that rehydrates
 * `isAuthenticated` from any token already in storage — so the route guard
 * sees the correct state on first navigation after a page refresh.
 *
 * The library is headless — it ships no UI components and no notification
 * provider; consumers attach their own login screen and react to
 * `AuthActions.logInSuccess` / `logInFailure` etc. for user feedback.
 *
 * The **host application** remains responsible for the root infrastructure:
 *  - `provideHttpClient(withInterceptors([tokenInterceptor]))`,
 *  - `provideStore()` and root `provideEffects()`,
 *  - `provideRouter(...)`.
 *
 * @example
 * ```ts
 * // app.config.ts
 * import { ApplicationConfig } from '@angular/core';
 * import { provideHttpClient, withInterceptors } from '@angular/common/http';
 * import { provideStore } from '@ngrx/store';
 * import { provideEffects } from '@ngrx/effects';
 * import { provideAuth, tokenInterceptor } from 'angular-auth-lib';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideStore(),
 *     provideEffects(),
 *     provideHttpClient(withInterceptors([tokenInterceptor])),
 *     provideAuth<MyUser>({
 *       urls: { accessTokenUrl: '/api/token', userInformationUrl: '/api/me' },
 *       behavior: {
 *         canActivate: (user, route) => !!user && user.roles.includes(route.data?.['role']),
 *         redirectAfterLogin: () => '/dashboard',
 *         loginRoute: 'signin',
 *       },
 *     }),
 *   ],
 * };
 * ```
 */
export function provideAuth<TUser = unknown>(config: AuthModuleConfig<TUser>): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: AUTH_API_URLS, useValue: config.urls },
    { provide: AUTH_BEHAVIOR, useValue: config.behavior },
    provideState(authFeature),
    provideEffects(AuthEffects),
    // Synchronously restore `isAuthenticated` from storage *before* the router
    // resolves the initial navigation, so `authGuard` doesn't bounce a
    // returning user to the login route. The follow-up user fetch runs as an
    // effect (`rehydrate$`) and does not block bootstrap.
    provideAppInitializer(() => {
      const hasToken = inject(AuthService).getToken() !== null;
      inject(Store).dispatch(AuthActions.rehydrate({ hasToken }));
    }),
  ]);
}
