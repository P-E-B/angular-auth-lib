import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent, AuthGuard, ActivateUserComponent } from 'angular-auth-lib';
import { TestComponent } from './components/test/test.component';


const routes: Routes = [
  { path: '', component: TestComponent, pathMatch: 'full' },
  { path: 'log-in', component: LogInComponent },
  { path: 'activation/:activationCode', component: ActivateUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
