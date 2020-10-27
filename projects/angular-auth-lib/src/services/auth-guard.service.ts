import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { selectUser, selectIsAuthenticated } from '../store/selectors';
import { AuthState } from '../store/reducer';
import { User } from '../models/user.models';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store<AuthState>,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(selectUser),
      withLatestFrom(this.store.pipe(select(selectIsAuthenticated))),
      map(([user, isAuthenticated]: [User, boolean]) => {
        if (user && user.allowedUrls.includes(route.routeConfig.path) && isAuthenticated) {
          return true;
        } else {
          if (user && user.allowedUrls.includes(route.routeConfig.path) && isPlatformBrowser(this.platformId)) {
            sessionStorage.setItem('redirectedUrlAfterLogIn', state.url);
          }
          this.router.navigate(['log-in']);
          return false;
        }
      })
    );
  }
}
