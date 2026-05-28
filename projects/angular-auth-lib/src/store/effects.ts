import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Action, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { catchError, concatMap, filter, map, of, switchMap, tap } from 'rxjs';

import { get } from '../utils';

import {
  ChangePassword,
  ChangePasswordFailure,
  ChangePasswordSuccess,
  LoadUserInformation,
  LoadUserInformationFailure,
  LoadUserInformationSuccess,
  LogIn,
  LogInFailure,
  LogInSuccess,
  LogOut,
  OpenForgottenPasswordDialog,
  OpenSignUpDialog,
  ResetAuthState,
  SendActivationCode,
  SendActivationCodeFailure,
  SendActivationCodeSuccess,
  SendPassword,
  SendPasswordFailure,
  SendPasswordSuccess,
  SignUp,
  SignUpFailure,
  SignUpSuccess
} from './actions';
import { selectUser } from './selectors';
import { User } from '../models/user.models';
import { AuthService } from '../services/auth.service';
import { ForgottenPasswordComponent } from '../components/forgotten-password/forgotten-password.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { AUTH_RESET_ACTIONS, AUTH_TRADUCTIONS, AuthModuleConfig } from '../token';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastrService);
  private readonly dialog = inject(MatDialog);
  private readonly store = inject(Store);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly resetActions = inject<AuthModuleConfig['resetActions']>(AUTH_RESET_ACTIONS);
  private readonly traductions = inject<AuthModuleConfig['traductions']>(AUTH_TRADUCTIONS);

  private dialogRef: MatDialogRef<SignUpComponent | ForgottenPasswordComponent> | null = null;

  OpenSignUpDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OpenSignUpDialog),
        tap(() => (this.dialogRef = this.dialog.open(SignUpComponent)))
      ),
    { dispatch: false }
  );

  SignUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SignUp),
      map((action) => action.payload),
      switchMap((user) =>
        this.authService.createUser(user as User).pipe(
          map(() => SignUpSuccess()),
          catchError((error: HttpErrorResponse) => of(SignUpFailure({ payload: error })))
        )
      )
    )
  );

  SignUpSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SignUpSuccess),
        tap(() =>
          this.toastService.success(
            get(this.traductions || {}, 'messages.signupSuccess', 'Your account has been created!')
          )
        )
      ),
    { dispatch: false }
  );

  SignUpFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SignUpFailure),
        tap(() =>
          this.toastService.error(
            get(this.traductions || {}, 'messages.signupFailure', 'Please try again.')
          )
        )
      ),
    { dispatch: false }
  );

  SendActivationCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SendActivationCode),
      map((action) => action.payload),
      switchMap((activationCode) =>
        this.authService.sendActivationCode(activationCode).pipe(
          map(() => SendActivationCodeSuccess()),
          catchError((error: HttpErrorResponse) => of(SendActivationCodeFailure({ payload: error })))
        )
      )
    )
  );

  SendActivationCodeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SendActivationCodeSuccess),
      tap(() => {
        this.toastService.success(
          get(this.traductions || {}, 'messages.sendActivationCodeSuccess', 'Your account has been verified!')
        );
        if (this.dialogRef) {
          this.dialogRef.close();
          this.router.navigate(['log-in']);
        }
      }),
      map(() => ResetAuthState())
    )
  );

  SendActivationCodeFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SendActivationCodeFailure),
        tap(() =>
          this.toastService.error(
            get(this.traductions || {}, 'messages.sendActivationCodeFailure', 'Please try again with the correct code.')
          )
        )
      ),
    { dispatch: false }
  );

  LogIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LogIn),
      filter(() => isPlatformBrowser(this.platformId)),
      map((action) => action.payload),
      switchMap((user) =>
        this.authService.login(user as User).pipe(
          concatMap((loggedInUser: User) => {
            sessionStorage.setItem('token', loggedInUser.token!.token);
            return this.authService.getUserInformation().pipe(
              map(({ user, usersList }) => LogInSuccess({ payload: { user, usersList } })),
              catchError((error: HttpErrorResponse) => {
                sessionStorage.removeItem('token');
                return of(LogInFailure({ payload: error }));
              })
            );
          }),
          catchError((error: HttpErrorResponse) => of(LogInFailure({ payload: error })))
        )
      )
    )
  );

  LogInSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LogInSuccess),
        filter(() => isPlatformBrowser(this.platformId)),
        concatLatestFrom(() => this.store.select(selectUser)),
        tap(([, user]) => {
          const redirectedUrlAfterLogIn = sessionStorage.getItem('redirectedUrlAfterLogIn');
          if (redirectedUrlAfterLogIn && isPlatformBrowser(this.platformId)) {
            this.router.navigateByUrl(redirectedUrlAfterLogIn);
            sessionStorage.removeItem('redirectedUrlAfterLogIn');
          } else if (user) {
            this.router.navigateByUrl(user.redirectUrlAfterLogin);
          }
          this.toastService.success(
            get(this.traductions || {}, 'messages.loginSuccess', 'Hi! Nice to see you again!')
          );
        })
      ),
    { dispatch: false }
  );

  LogInFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LogInFailure),
        tap(() => {
          if (isPlatformBrowser(this.platformId)) {
            sessionStorage.removeItem('token');
          }
          this.toastService.error(
            get(this.traductions || {}, 'messages.loginFailure', 'Wrong credentials. Please check again.')
          );
        })
      ),
    { dispatch: false }
  );

  LogOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LogOut),
      filter(() => isPlatformBrowser(this.platformId)),
      switchMap(() => {
        sessionStorage.removeItem('token');
        this.router.navigate(['log-in']);
        return (this.resetActions || []).map((resetAction): Action => resetAction());
      })
    )
  );

  LoadUserInformation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadUserInformation),
      switchMap(() =>
        this.authService.getUserInformation().pipe(
          map(({ user }) => LoadUserInformationSuccess({ payload: user })),
          catchError((error: HttpErrorResponse) => of(LoadUserInformationFailure({ payload: error })))
        )
      )
    )
  );

  ChangePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChangePassword),
      switchMap((action) =>
        this.authService.changePassword(action.payload).pipe(
          map(() => ChangePasswordSuccess()),
          catchError((error: HttpErrorResponse) => of(ChangePasswordFailure({ payload: error })))
        )
      )
    )
  );

  ChangePasswordSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ChangePasswordSuccess),
        tap(() =>
          this.toastService.success(
            get(this.traductions || {}, 'messages.changePasswordSuccess', 'Your password has been successfully changed!')
          )
        )
      ),
    { dispatch: false }
  );

  ChangePasswordFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ChangePasswordFailure),
        tap(() =>
          this.toastService.error(
            get(this.traductions || {}, 'messages.changePasswordFailure', 'Wrong current password. Please try again.')
          )
        )
      ),
    { dispatch: false }
  );

  OpenForgottenPasswordDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OpenForgottenPasswordDialog),
        tap(() => (this.dialogRef = this.dialog.open(ForgottenPasswordComponent)))
      ),
    { dispatch: false }
  );

  SendPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SendPassword),
      tap(() => this.dialogRef?.close()),
      switchMap((action) =>
        this.authService.sendPassword(action.payload).pipe(
          map(() => SendPasswordSuccess()),
          catchError((error: HttpErrorResponse) => of(SendPasswordFailure({ payload: error })))
        )
      )
    )
  );

  SendPasswordSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SendPasswordSuccess),
        tap(() =>
          this.toastService.success(
            get(
              this.traductions || {},
              'messages.passwordResetSuccess',
              'An email for resetting your password has been sent to your address.'
            )
          )
        )
      ),
    { dispatch: false }
  );

  SendPasswordFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SendPasswordFailure),
        tap(() =>
          this.toastService.error(
            get(this.traductions || {}, 'messages.passwordResetFailure', 'An error occured. Please try again.')
          )
        )
      ),
    { dispatch: false }
  );
}
