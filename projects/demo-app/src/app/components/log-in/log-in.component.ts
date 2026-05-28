import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions, AuthCredentials } from 'angular-auth-lib';

/**
 * Minimal host-app login form. The library is headless — consumers own the UI
 * and dispatch `AuthActions.logIn` with whatever credential shape their backend
 * expects.
 */
@Component({
  selector: 'app-log-in',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <label>Email <input type="email" formControlName="email" /></label>
      <label>Password <input type="password" formControlName="password" /></label>
      <button type="submit" [disabled]="form.invalid">Log in</button>
    </form>
  `,
})
export class LogInComponent {
  private readonly store = inject(Store);

  readonly form = inject(NonNullableFormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  submit(): void {
    const payload: AuthCredentials = this.form.getRawValue();
    this.store.dispatch(AuthActions.logIn({ payload }));
  }
}
