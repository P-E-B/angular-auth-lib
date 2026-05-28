import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { LogOut, OpenSignUpDialog } from 'angular-auth-lib';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
  imports: [MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent {
  private store = inject(Store);

  logout(): void {
    this.store.dispatch(LogOut());
  }

  signup(): void {
    this.store.dispatch(OpenSignUpDialog());
  }
}
