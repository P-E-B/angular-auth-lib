import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { get } from '../../utils';

import { SignUp } from '../../store/actions';
import { selectIsSignUpLoading } from '../../store/selectors';
import { User } from '../../models/user.models';
import { AUTH_STYLES, AUTH_TRADUCTIONS } from '../../token';

@Component({
  selector: 'auth-lib-sign-up',
  imports: [
    ReactiveFormsModule,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {
  private readonly traductions = inject(AUTH_TRADUCTIONS) ?? {};
  private readonly styles = inject(AUTH_STYLES) ?? {};
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly store = inject(Store);

  /** Public so consumers / effects can close the dialog through it. */
  readonly dialogRef = inject<MatDialogRef<SignUpComponent>>(MatDialogRef);

  /** Loading flag from the auth store as a signal (NgRx 20 selectSignal). */
  readonly isSignUpLoading = this.store.selectSignal(selectIsSignUpLoading);

  readonly userForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    enterprise: ''
  });

  // ---- i18n / styling (config-derived constants, resolved once at construction) ----
  usernamePlaceholder = get(this.traductions, 'form.usernamePlaceholder', 'Username');
  passwordPlaceholder = get(this.traductions, 'form.passwordPlaceholder', 'Password');
  firstNamePlaceholder = get(this.traductions, 'form.firstNamePlaceholder', 'First name');
  lastNamePlaceholder = get(this.traductions, 'form.lastNamePlaceholder', 'Last name');
  emailPlaceholder = get(this.traductions, 'form.emailPlaceholder', 'Email');
  enterprisePlaceholder = get(this.traductions, 'form.enterprisePlaceholder', 'Enterprise');

  signUpDialogTitle = get(this.traductions, 'dialogs.signup', 'Sign Up');
  signupButtonTraduction = get(this.traductions, 'buttons.signup', 'Log in');

  buttonsBackgroundColor = get(this.styles, 'buttonsBackgroundColor', '#3f51b5');
  buttonsColor = get(this.styles, 'buttonsColor', 'white');

  onSubmitUser(): void {
    const value = this.userForm.getRawValue();
    const newUser: Partial<User> = {
      username: value.username,
      password: value.password,
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      enterprise: value.enterprise || null,
      isActivated: false
    };
    this.store.dispatch(SignUp({ payload: newUser }));
  }
}
