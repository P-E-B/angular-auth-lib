import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import get from 'lodash-es/get';

import { AuthState } from '../../store/reducer';
import { User } from '../../models/user.models';
import { SignUp } from '../../store/actions';
import { AUTH_TRADUCTIONS, AuthModuleConfig, AUTH_STYLES } from '../../token';

@Component({
  selector: 'auth-lib-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  userForm: FormGroup;

  usernamePlaceholder = 'Username';
  passwordPlaceholder = 'Password';
  firstNamePlaceholder = 'First name';
  lastNamePlaceholder = 'Last name';
  emailPlaceholder = 'Email';
  enterprisePlaceholder = 'Enterprise';

  signUpDialogTitle = 'Sign Up';

  signupButtonTraduction = 'Log in';
  buttonsBackgroundColor = '#3f51b5';
  buttonsColor = 'white';

  constructor(
    @Inject(AUTH_TRADUCTIONS) private traductions: AuthModuleConfig['traductions'],
    @Inject(AUTH_STYLES) private styles: AuthModuleConfig['styles'],
    public dialogRef: MatDialogRef<SignUpComponent>,
    private formBuilder: FormBuilder,
    private store: Store<AuthState>
  ) { }

  ngOnInit() {
    this.usernamePlaceholder = get(this.traductions || {}, 'form.usernamePlaceholder', this.usernamePlaceholder);
    this.passwordPlaceholder = get(this.traductions || {}, 'form.passwordPlaceholder', this.passwordPlaceholder);
    this.firstNamePlaceholder = get(this.traductions || {}, 'form.firstNamePlaceholder', this.firstNamePlaceholder);
    this.lastNamePlaceholder = get(this.traductions || {}, 'form.lastNamePlaceholder', this.lastNamePlaceholder);
    this.emailPlaceholder = get(this.traductions || {}, 'form.emailPlaceholder', this.emailPlaceholder);
    this.enterprisePlaceholder = get(this.traductions || {}, 'form.enterprisePlaceholder', this.enterprisePlaceholder);

    this.signUpDialogTitle = get(this.traductions || {}, 'dialogs.signup', this.signUpDialogTitle);

    this.signupButtonTraduction = get(this.traductions || {}, 'buttons.signup', this.signupButtonTraduction);
    this.buttonsBackgroundColor = get(this.styles || {}, 'buttonsBackgroundColor', this.buttonsBackgroundColor);
    this.buttonsColor = get(this.styles || {}, 'buttonsColor', this.buttonsColor);

    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      enterprise: ''
    });
  }

  onSubmit() {
    const newUser: Partial<User> = {
      username: this.userForm.value['username'],
      password: this.userForm.value['password'],
      firstName: this.userForm.value['firstName'],
      lastName: this.userForm.value['lastName'],
      email: this.userForm.value['email'],
      enterprise: this.userForm.value['enterprise'] || null
    };
    this.store.dispatch(new SignUp(newUser));
    this.dialogRef.close()
  }
}
