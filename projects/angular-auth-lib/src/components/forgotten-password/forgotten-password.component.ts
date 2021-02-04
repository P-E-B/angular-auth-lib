import { Component, ViewChild, ElementRef, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { get } from '../../utils';

import { AuthState } from '../../store/reducer';
import { SendPassword } from '../../store/actions';
import { AUTH_TRADUCTIONS, AUTH_STYLES, AuthModuleConfig } from '../../token';

@Component({
  selector: 'auth-lib-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {
  @ViewChild('email') emailInput: ElementRef;

  emailPlaceholder = 'Your email';
  sendButtonTraduction = 'Send';

  buttonsBackgroundColor = '#3f51b5';
  buttonsColor = 'white';

  constructor(
    private store: Store<AuthState>,
    @Inject(AUTH_TRADUCTIONS) private traductions: AuthModuleConfig['traductions'],
    @Inject(AUTH_STYLES) private styles: AuthModuleConfig['styles'],
  ) { }

  ngOnInit() {
    this.emailPlaceholder = get(this.traductions || {}, 'form.emailPlaceholder', this.emailPlaceholder);
    this.sendButtonTraduction = get(this.traductions || {}, 'buttons.send', this.sendButtonTraduction);

    this.buttonsBackgroundColor = get(this.styles || {}, 'buttonsBackgroundColor', this.buttonsBackgroundColor);
    this.buttonsColor = get(this.styles || {}, 'buttonsColor', this.buttonsColor);
  }

  send() {
    this.store.dispatch(new SendPassword(this.emailInput.nativeElement.value));
  }
}
