import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogOut, AuthState, OpenSignUpDialog } from 'angular-auth-lib';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  constructor(private store: Store<AuthState>) { }

  logout() {
    this.store.dispatch(new LogOut());
  }

  signup() {
    this.store.dispatch(new OpenSignUpDialog());
  }
}
