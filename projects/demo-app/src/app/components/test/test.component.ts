import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions, selectAuthUser } from 'angular-auth-lib';

import type { DemoUser } from '../../app.config';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent {
  private readonly store = inject(Store);

  readonly user = this.store.selectSignal(selectAuthUser<DemoUser>());

  logout(): void {
    this.store.dispatch(AuthActions.logOut());
  }
}
