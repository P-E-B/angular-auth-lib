import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Observable, map, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectIsAuthenticated, selectUser } from '../store/selectors';

/**
 * Functional route guard that grants access when the current user is
 * authenticated and the requested route's path is present in the user's
 * `allowedUrls`. Otherwise it stores the attempted URL (browser only) and
 * redirects to `/log-in`.
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
): Observable<boolean> => {
  const store = inject(Store);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  return runAuthCheck(store, router, platformId, route, state);
};

/**
 * @deprecated Use the functional {@link authGuard} (`CanActivateFn`) instead.
 * Class-based route guards are no longer recommended since Angular v15 and the
 * `CanActivate` interface was removed in v18+. This wrapper is kept solely for
 * backward compatibility with existing route configs (`canActivate: [AuthGuard]`)
 * and will be removed in a future major version.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return runAuthCheck(this.store, this.router, this.platformId, route, state);
  }
}

/** Shared implementation used by both the functional guard and the deprecated class wrapper. */
function runAuthCheck(
  store: Store,
  router: Router,
  platformId: object,
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> {
  return store.select(selectUser).pipe(
    withLatestFrom(store.select(selectIsAuthenticated)),
    map(([user, isAuthenticated]) => {
      const path = route.routeConfig?.path ?? '';
      const isAllowed = !!user && user.allowedUrls.includes(path);

      if (isAllowed && isAuthenticated) {
        return true;
      }

      if (isAllowed && isPlatformBrowser(platformId)) {
        sessionStorage.setItem('redirectedUrlAfterLogIn', state.url);
      }
      router.navigate(['log-in']);
      return false;
    })
  );
}
