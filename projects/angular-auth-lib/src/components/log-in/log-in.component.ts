import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';

import { get } from 'lodash';

import { User } from '../../models/user.models';
import { AuthState } from '../../store/reducer';
import { OpenForgottenPasswordDialog, LogIn } from '../../store/actions';
import { selectIsPasswordBeingChanged } from '../../store/selectors';
import { AUTH_IMAGES_URLS, AuthModuleConfig, AUTH_TRADUCTIONS, AUTH_STYLES } from '../../token';

@Component({
  selector: 'auth-lib-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  isPasswordBeingChanged$ = this.store.pipe(select(selectIsPasswordBeingChanged));
  userForm: FormGroup;

  usernamePlaceholder = 'Username';
  passwordPlaceholder = 'Password';
  forgottenPassword = 'Forgot your password?';

  loginButtonTraduction = 'Log in';
  buttonsBackgroundColor = '#3f51b5';
  buttonsColor = 'white';

  constructor(
    @Inject(AUTH_IMAGES_URLS) public images: AuthModuleConfig['images'],
    @Inject(AUTH_TRADUCTIONS) private traductions: AuthModuleConfig['traductions'],
    @Inject(AUTH_STYLES) private styles: AuthModuleConfig['styles'],
    private formBuilder: FormBuilder,
    private store: Store<AuthState>
  ) {
  }

  ngOnInit() {
    this.usernamePlaceholder = get(this.traductions || {}, 'form.usernamePlaceholder', this.usernamePlaceholder);
    this.passwordPlaceholder = get(this.traductions || {}, 'form.passwordPlaceholder', this.passwordPlaceholder);
    this.forgottenPassword = get(this.traductions || {}, 'buttons.passwordForgotten', this.forgottenPassword);

    this.loginButtonTraduction = get(this.traductions || {}, 'buttons.login', this.loginButtonTraduction);
    this.buttonsBackgroundColor = get(this.styles || {}, 'buttonsBackgroundColor', this.buttonsBackgroundColor);
    this.buttonsColor = get(this.styles || {}, 'buttonsColor', this.buttonsColor);

    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  openDialog() {
    this.store.dispatch(new OpenForgottenPasswordDialog());
  }

  onSubmit() {
    const newUser: Partial<User> = {
      username: this.userForm.value['username'],
      password: this.userForm.value['password']
    };
    this.store.dispatch(new LogIn(newUser));
  }
}
