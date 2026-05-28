import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';

import { get } from '../../utils';

import { SendPassword } from '../../store/actions';
import { AUTH_STYLES, AUTH_TRADUCTIONS } from '../../token';

@Component({
  selector: 'auth-lib-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrl: './forgotten-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class ForgottenPasswordComponent {
  private readonly store = inject(Store);
  private readonly traductions = inject(AUTH_TRADUCTIONS);
  private readonly styles = inject(AUTH_STYLES);

  /**
   * Typed reactive control for the email address.
   * Replaces the legacy `@ViewChild('email') emailInput: ElementRef` +
   * `nativeElement.value` read used prior to Angular 20.
   */
  readonly email = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email]
  });

  readonly emailPlaceholder: string = get(this.traductions ?? {}, 'form.emailPlaceholder', 'Your email');
  readonly sendButtonTraduction: string = get(this.traductions ?? {}, 'buttons.send', 'Send');

  readonly buttonsBackgroundColor: string = get(this.styles ?? {}, 'buttonsBackgroundColor', '#3f51b5');
  readonly buttonsColor: string = get(this.styles ?? {}, 'buttonsColor', 'white');

  send(): void {
    this.store.dispatch(SendPassword({ payload: this.email.value }));
  }
}
