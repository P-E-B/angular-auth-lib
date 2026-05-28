import { Routes } from '@angular/router';

import { ActivateUserComponent, LogInComponent } from 'angular-auth-lib';

import { TestComponent } from './components/test/test.component';

export const routes: Routes = [
  { path: '', component: TestComponent, pathMatch: 'full' },
  { path: 'log-in', component: LogInComponent },
  { path: 'activation/:activationCode', component: ActivateUserComponent },
];
