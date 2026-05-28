import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';

import { get } from '../../utils';

import { User } from '../../models/user.models';
import { LogIn, OpenForgottenPasswordDialog } from '../../store/actions';
import { selectIsLoginLoading, selectIsPasswordBeingChanged } from '../../store/selectors';
import { AUTH_IMAGES_URLS, AUTH_STYLES, AUTH_TRADUCTIONS, AuthModuleConfig } from '../../token';

@Component({
  selector: 'auth-lib-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class LogInComponent {
  private readonly store = inject(Store);
  private readonly traductions: AuthModuleConfig['traductions'] = inject(AUTH_TRADUCTIONS);
  private readonly styles: AuthModuleConfig['styles'] = inject(AUTH_STYLES);

  readonly images: AuthModuleConfig['images'] = inject(AUTH_IMAGES_URLS);

  /** Reactive store state as signals (preferred for templates / OnPush). */
  readonly isPasswordBeingChanged: Signal<boolean> = this.store.selectSignal(selectIsPasswordBeingChanged);
  readonly isLoginLoading: Signal<boolean> = this.store.selectSignal(selectIsLoginLoading);

  /** Strictly-typed, non-nullable login form. */
  readonly userForm = inject(NonNullableFormBuilder).group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  usernamePlaceholder = get(this.traductions || {}, 'form.usernamePlaceholder', 'Username');
  passwordPlaceholder = get(this.traductions || {}, 'form.passwordPlaceholder', 'Password');
  forgottenPassword = get(this.traductions || {}, 'buttons.passwordForgotten', 'Forgot your password?');
  loginButtonTraduction = get(this.traductions || {}, 'buttons.login', 'Log in');

  buttonsBackgroundColor = get(this.styles || {}, 'buttonsBackgroundColor', '#3f51b5');
  buttonsColor = get(this.styles || {}, 'buttonsColor', 'white');

  openDialog(): void {
    this.store.dispatch(OpenForgottenPasswordDialog());
  }

  onSubmit(): void {
    const { username, password } = this.userForm.getRawValue();
    const newUser: Partial<User> = { username, password };
    this.store.dispatch(LogIn({ payload: newUser }));
  }
}
