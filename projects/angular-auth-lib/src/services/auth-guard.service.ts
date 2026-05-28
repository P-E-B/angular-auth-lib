import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';

import { Observable, map, take, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';

import { authFeature } from '../store/reducer';
import { AUTH_BEHAVIOR } from '../token';

/**
 * Functional route guard.
 *
 * Grants access when the user is authenticated **and** the application's
 * `AuthBehaviorConfig.canActivate` callback returns `true` for the current user
 * and route. Otherwise returns a `UrlTree` to the configured `loginRoute` with
 * the attempted URL preserved as `?returnUrl=` for the login effect to honour.
 *
 * The library does not assume any shape on the user record — authorization
 * logic lives entirely in the `canActivate` callback supplied to
 * `provideAuth({ behavior: { canActivate } })`.
 *
 * Usage:
 * ```ts
 * export const routes: Routes = [
 *   { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }
 * ];
 * ```
 */
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {
  const store = inject(Store);
  const router = inject(Router);
  const behavior = inject(AUTH_BEHAVIOR);

  return store.select(authFeature.selectIsAuthenticated).pipe(
    withLatestFrom(store.select(authFeature.selectUser)),
    take(1),
    map(([isAuthenticated, user]) => {
      if (isAuthenticated && behavior.canActivate(user, route, state)) {
        return true;
      }
      return router.createUrlTree([behavior.loginRoute ?? 'log-in'], {
        queryParams: { returnUrl: state.url },
      });
    })
  );
};
