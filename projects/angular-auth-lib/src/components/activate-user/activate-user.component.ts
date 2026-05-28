import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';

import { get } from '../../utils';
import { AUTH_IMAGES_URLS, AUTH_STYLES, AUTH_TRADUCTIONS, AuthModuleConfig } from '../../token';
import { SendActivationCode } from '../../store/actions';
import { selectIsSendActivationCodeLoading } from '../../store/selectors';

@Component({
  selector: 'auth-lib-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrl: './activate-user.component.scss',
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
export class ActivateUserComponent {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly traductions = inject<AuthModuleConfig['traductions']>(AUTH_TRADUCTIONS);
  private readonly styles = inject<AuthModuleConfig['styles']>(AUTH_STYLES);

  /** Public for template binding and back-compat with consumers reading the configured image URLs. */
  readonly images: AuthModuleConfig['images'] = inject(AUTH_IMAGES_URLS);

  /** Loading flag from the store as a signal (replaces the legacy `isSendActivationCodeLoading$` observable). */
  readonly isSendActivationCodeLoading = this.store.selectSignal(selectIsSendActivationCodeLoading);

  /** Typed, non-nullable control backing the activation-code input (replaces the legacy `@ViewChild` ElementRef). */
  readonly activationCode = new FormControl<string>('', { nonNullable: true });

  readonly activationCodePlaceholder: string =
    get(this.traductions || {}, 'form.activationCodePlaceholder', 'Enter your activation code');
  readonly sendActivationButtonTraduction: string =
    get(this.traductions || {}, 'buttons.sendActivationCode', 'Send');
  readonly buttonsBackgroundColor: string =
    get(this.styles || {}, 'buttonsBackgroundColor', '#3f51b5');
  readonly buttonsColor: string =
    get(this.styles || {}, 'buttonsColor', 'white');

  constructor() {
    // Auto-submit when an activation code is provided via the route (e.g. /activation/:activationCode).
    // Deferred via afterNextRender so the dispatch fires after the first DOM render — preserves
    // the original ngAfterViewInit + setTimeout timing and is SSR-safe.
    const code = this.route.snapshot.paramMap.get('activationCode');
    if (code) {
      this.activationCode.setValue(code);
      this.activationCode.disable();
      afterNextRender(() => this.onSubmitActivationCode());
    }
  }

  onSubmitActivationCode(): void {
    const code = this.activationCode.value;
    if (code) {
      this.store.dispatch(SendActivationCode({ payload: code }));
    }
  }
}
