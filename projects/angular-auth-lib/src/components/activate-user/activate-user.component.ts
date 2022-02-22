import { Component, ViewChild, ElementRef, Inject, OnInit, AfterViewInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { get } from '../../utils';
import { AUTH_TRADUCTIONS, AUTH_STYLES, AuthModuleConfig, AUTH_IMAGES_URLS } from '../../token';

import { AuthState } from '../../store/reducer';
import { SendActivationCode } from '../../store/actions';
import { selectIsSendActivationCodeLoading } from '../../store/selectors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'auth-lib-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.scss']
})
export class ActivateUserComponent implements OnInit, AfterViewInit {
  @ViewChild('activationCode') activationCodeInput: ElementRef;

  isSendActivationCodeLoading$ = this.store.pipe(select(selectIsSendActivationCodeLoading));

  activationCodePlaceholder = 'Enter your activation code';

  buttonsBackgroundColor = '#3f51b5';
  buttonsColor = 'white';
  sendActivationButtonTraduction = 'Send';

  constructor(
    private store: Store<AuthState>,
    private route: ActivatedRoute,
    @Inject(AUTH_TRADUCTIONS) private traductions: AuthModuleConfig['traductions'],
    @Inject(AUTH_STYLES) private styles: AuthModuleConfig['styles'],
    @Inject(AUTH_IMAGES_URLS) public images: AuthModuleConfig['images']
  ) { }

  ngOnInit() {
    this.sendActivationButtonTraduction = get(this.traductions || {}, 'buttons.sendActivationCode', this.sendActivationButtonTraduction);
    this.activationCodePlaceholder = get(this.traductions || {}, 'form.activationCodePlaceholder', this.activationCodePlaceholder);
    this.buttonsBackgroundColor = get(this.styles || {}, 'buttonsBackgroundColor', this.buttonsBackgroundColor);
    this.buttonsColor = get(this.styles || {}, 'buttonsColor', this.buttonsColor);
  }

  ngAfterViewInit() {
    const activationCode = this.route.snapshot.paramMap.get('activationCode');
    if (activationCode) {
      setTimeout(() => {
        this.activationCodeInput.nativeElement.value = activationCode;
        this.activationCodeInput.nativeElement.disabled = true;
        this.onSubmitActivationCode();
      });
    }
  }

  onSubmitActivationCode() {
    const activationCode = this.activationCodeInput.nativeElement.value;
    if (activationCode) {
      this.store.dispatch(new SendActivationCode(activationCode));
    }
  }
}
