import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, filter, map, of, switchMap, tap } from 'rxjs';

import { AuthActions } from './actions';
import { AuthService } from '../services/auth.service';
import { AUTH_API_URLS, AUTH_BEHAVIOR } from '../token';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly apiUrls = inject(AUTH_API_URLS);
  private readonly behavior = inject(AUTH_BEHAVIOR);

  private get loginRoute(): string {
    return this.behavior.loginRoute ?? 'log-in';
  }

  logIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logIn),
      filter(() => isPlatformBrowser(this.platformId)),
      switchMap(({ payload }) =>
        this.authService.login(payload).pipe(
          concatMap((token) => {
            this.authService.storeToken(token);
            if (!this.apiUrls.userInformationUrl) {
              return of(AuthActions.logInSuccess({ payload: { user: null } }));
            }
            return this.authService.getUserInformation().pipe(
              map((user) => AuthActions.logInSuccess({ payload: { user } })),
              catchError((error: HttpErrorResponse) => {
                this.authService.storeToken(null);
                return of(AuthActions.logInFailure({ payload: error }));
              })
            );
          }),
          catchError((error: HttpErrorResponse) => of(AuthActions.logInFailure({ payload: error })))
        )
      )
    )
  );

  logInSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logInSuccess),
        filter(() => isPlatformBrowser(this.platformId)),
        tap(({ payload }) => {
          // Open-redirect guard: only honour `returnUrl` when it is a
          // root-relative path. Rejects `//evil.com`, absolute URLs, and
          // scheme prefixes so a crafted login link cannot bounce the user
          // to an attacker-controlled origin after authentication.
          const raw = this.route.snapshot.queryParamMap.get('returnUrl');
          const returnUrl = raw && /^\/(?!\/)/.test(raw) ? raw : null;
          this.router.navigateByUrl(
            returnUrl ?? this.behavior.redirectAfterLogin?.(payload.user) ?? '/'
          );
        })
      ),
    { dispatch: false }
  );

  logInFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logInFailure),
        tap(() => this.authService.storeToken(null))
      ),
    { dispatch: false }
  );

  logOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logOut),
        filter(() => isPlatformBrowser(this.platformId)),
        tap(() => {
          this.authService.storeToken(null);
          this.router.navigate([this.loginRoute]);
        })
      ),
    { dispatch: false }
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      filter(() => this.authService.canRefresh),
      switchMap(() =>
        this.authService.refreshToken().pipe(
          map((token) => AuthActions.refreshTokenSuccess({ payload: token })),
          catchError((error: HttpErrorResponse) => of(AuthActions.refreshTokenFailure({ payload: error })))
        )
      )
    )
  );

  loadUserInformation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUserInformation),
      switchMap(() =>
        this.authService.getUserInformation().pipe(
          map((user) => AuthActions.loadUserInformationSuccess({ payload: user })),
          catchError((error: HttpErrorResponse) => of(AuthActions.loadUserInformationFailure({ payload: error })))
        )
      )
    )
  );
}
