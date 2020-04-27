import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent, AuthGuard } from 'angular-auth-lib';
import { TestComponent } from './components/test/test.component';


const routes: Routes = [
  { path: '', component: LogInComponent, pathMatch: 'full' },
  { path: 'log-in', component: LogInComponent },
  { path: 'home', component: TestComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
