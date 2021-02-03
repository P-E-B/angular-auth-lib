import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Store, select } from '@ngrx/store';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { map, switchMap, catchError, tap, withLatestFrom, concatMap, filter } from 'rxjs/operators';

import get from 'lodash-es/get';

import {
  AUTH_ACTIONS_TYPE,
  LogIn,
  LogInSuccess,
  LogInFailure,
  LogOut,
  SignUp,
  SignUpFailure,
  SignUpSuccess,
  ChangePassword,
  ChangePasswordSuccess,
  ChangePasswordFailure,
  LoadUserInformationSuccess,
  LoadUserInformationFailure,
  LoadUserInformation,
  SendPassword,
  SendPasswordSuccess,
  SendPasswordFailure
} from './actions';
import { selectUser } from './selectors';
import { User } from '../models/user.models';
import { AuthService } from '../services/auth.service';
import { ForgottenPasswordComponent } from '../components/forgotten-password/forgotten-password.component';
import { AUTH_RESET_ACTIONS, AUTH_TRADUCTIONS, AuthModuleConfig } from '../token';
import { AuthState } from './reducer';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { isPlatformBrowser } from '@angular/common';


@Injectable()
export class AuthEffects {
  private dialogRef: MatDialogRef<SignUpComponent | ForgottenPasswordComponent>;

  constructor(
    @Inject(AUTH_RESET_ACTIONS) private resetActions: any[],
    @Inject(AUTH_TRADUCTIONS) private traductions: AuthModuleConfig['traductions'],
    @Inject(PLATFORM_ID) private platformId: any,
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastrService,
    private dialog: MatDialog,
    private store: Store<AuthState>
  ) { }

  @Effect({ dispatch: false })
  OpenSignUpDialog$ = this.actions.pipe(
    ofType(AUTH_ACTIONS_TYPE.OPEN_SIGN_UP_DIALOG),
    tap(() => this.dialogRef = this.dialog.open(SignUpComponent))
  );

  @Effect()
  SignUp$ = this.actions.pipe(
    ofType(AUTH_ACTIONS_TYPE.SIGN_UP),
    map((action: SignUp) => action.payload),
    switchMap((user: User) => this.authService.createUser(user).pipe(
      map(() => new SignUpSuccess()),
      catchError((error: HttpErrorResponse) => of(new SignUpFailure(error)))
    ))
  );

  @Effect({ dispatch: false })
  SignUpSuccess$ = this.actions.pipe(
    ofType(AUTH_ACTIONS_TYPE.SIGN_UP_SUCCESS),
    tap(() => {
      this.toastService.success(
        get(this.traductions || {}, 'messages.signupSuccess', 'Your account has been created!')
      )
    })
  );

  @Effect({ dispatch: false })
  SignUpFailure$ = this.actions.pipe(
    ofType(AUTH_ACTIONS_TYPE.SIGN_UP_FAILURE),
    tap((error: HttpErrorResponse) => this.toastService.error(
      get(this.traductions || {}, 'messages.signupFailure', 'Please try again with a new username.')
    ))
  );

  @Effect()
  LogIn$ = this.actions.pipe(
    ofType(AUTH_ACTIONS_TYPE.LOG_IN),
    filter((action: LogIn) => isPlatformBrowser(this.platformId)),
    map((action: LogIn) => action.payload),
    switchMap((user: User) => this.authService.login(user).pipe(
      concatMap((loggedInUser: User) => {
        sessionStorage.setItem('token', loggedInUser.token.token);
        return this.authService.getUserInformation().pipe(
          map(({user, usersList}) => new LogInSuccess({ user, usersList })),
          catchError((error: HttpErrorResponse) => of(new LogInFailure(error)))
        );
      }),
      catchError((error: HttpErrorResponse) => of(new LogInFailure(error)))
    ))
  );

  @Effect({ dispatch: false })
  LogInSuccess$ = this.actions.pipe(
    ofType(AUTH_ACTIONS_TYPE.LOG_IN_SUCCESS),
    filter((action: LogInSuccess) => isPlatformBrowser(this.platformId)),
    withLatestFrom(this.store.pipe(select(selectUser))),
    tap(([action, user]: [LogInSuccess, User]) => {
      const redirectedUrlAfterLogIn = sessionStorage.getItem('redirectedUrlAfterLogIn');
      if (redirectedUrlAfterLogIn && isPlatformBrowser(this.platformId)) {
        this.router.navigateByUrl(redirectedUrlAfterLogIn)
        sessionStorage.removeItem('redirectedUrlAfterLogIn');
      } else {
        this.router.navigateByUrl(user.redirectUrlAfterLogin);
      }
      this.toastService.success(
        get(this.traductions || {}, 'messages.loginSuccess', 'Hi! Nice to see you again!')
      );
    })
  );

  @Effect({ dispatch: false })
  LogInFailure$ = this.actions.pipe(
    ofType(AUTH_ACTIONS_TYPE.LOG_IN_FAILURE),
    tap((error: HttpErrorResponse) => this.toastService.error(
      get(this.traductions || {}, 'messages.loginFailure', 'Wrong credentials. Please check again.')
    ))
  );

  @Effect()
  LogOut$ = this.actions.pipe(
    ofType(AUTH_ACTIONS_TYPE.LOG_OUT),
    filter((action: LogOut) => isPlatformBrowser(this.platformId)),
    switchMap((action: LogOut) => {
      sessionStorage.removeItem('token');
      this.router.navigate(['log-in']);
      return (this.resetActions || []).map((resetAction: any) => new resetAction())
    })
  );

  @Effect()
  LoadUserInformation$ = this.actions.pipe(
    ofType(AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION),
    switchMap((action: LoadUserInformation) => this.authService.getUserInformation().pipe(
      map(({user, usersList}) => new LoadUserInformationSuccess(user)),
      catchError((error: HttpErrorResponse) => of(new LoadUserInformationFailure(error)))
    ))
  );

  @Effect()
  ChangePassword$ = this.actions.pipe(
    ofType(AUTH_ACTIONS_TYPE.CHANGE_PASSWORD),
    switchMap((action: ChangePassword) => this.authService.changePassword(action.payload).pipe(
      map(() => new ChangePasswordSuccess()),
      catchError((error: HttpErrorResponse) => of(new ChangePasswordFailure(error)))
    ))
  );

  @Effect({ dispatch: false })
  ChangePasswordSuccess$ = this.actions.pipe(
    ofType(AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_SUCCESS),
    tap(() => this.toastService.success(
      get(this.traductions || {}, 'messages.changePasswordSuccess', 'Your password has been successfully changed!')
    ))
  );

  @Effect({ dispatch: false })
  ChangePasswordFailure$ = this.actions.pipe(
    ofType(AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_FAILURE),
    tap((error: HttpErrorResponse) => this.toastService.error(
      get(this.traductions || {}, 'messages.changePasswordFailure', 'Wrong current password. Please try again.')
    ))
  );

  @Effect({ dispatch: false })
  OpenForgottenPasswordDialog$ = this.actions.pipe(
    ofType(AUTH_ACTIONS_TYPE.OPEN_FORGOTTEN_PASSWORD_DIALOG),
    tap(() => this.dialogRef = this.dialog.open(ForgottenPasswordComponent))
  );

  @Effect()
  SendPassword$ = this.actions.pipe(
    ofType(AUTH_ACTIONS_TYPE.SEND_PASSWORD),
    tap(() => {
      this.dialogRef.close();
    }),
    switchMap((action: SendPassword) => this.authService.sendPassword(action.payload).pipe(
      map(() => new SendPasswordSuccess()),
      catchError((error: HttpErrorResponse) => of(new SendPasswordFailure(error)))
    ))
  );

  @Effect({ dispatch: false })
  SendPasswordSuccess$ = this.actions.pipe(
    ofType(AUTH_ACTIONS_TYPE.SEND_PASSWORD_SUCCESS),
    tap(() => this.toastService.success(
      get(this.traductions || {}, 'messages.passwordResetSuccess', 'An email for resetting your password has been sent to your address.')
    ))
  );

  @Effect({ dispatch: false })
  SendPasswordFailure$ = this.actions.pipe(
    ofType(AUTH_ACTIONS_TYPE.SEND_PASSWORD_FAILURE),
    tap(() => this.toastService.error(
      get(this.traductions || {}, 'messages.passwordResetFailure', 'An error occured. Please try again.')
    ))
  );
}
