import { Routes } from '@angular/router';

import { authGuard } from 'angular-auth-lib';

import { LogInComponent } from './components/log-in/log-in.component';
import { TestComponent } from './components/test/test.component';

export const routes: Routes = [
  { path: 'log-in', component: LogInComponent },
  { path: 'test', component: TestComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'test', pathMatch: 'full' },
];
