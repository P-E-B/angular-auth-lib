import { NgModule, ModuleWithProviders } from '@angular/core';

import { LogInComponent } from './components/log-in/log-in.component';
import { ForgottenPasswordComponent } from './components/forgotten-password/forgotten-password.component';
import { ActivateUserComponent } from './components/activate-user/activate-user.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthModuleConfig } from './token';
import { provideAuth } from './provide-auth';

/**
 * Thin back-compat NgModule wrapper around the standalone auth components.
 *
 * @deprecated Prefer the standalone bootstrap API:
 *  - call {@link provideAuth} in your `ApplicationConfig.providers`, and
 *  - import `LogInComponent` / `ForgottenPasswordComponent` /
 *    `SignUpComponent` / `ActivateUserComponent` directly where used.
 *
 * This module no longer imports `HttpClientModule`, `BrowserAnimationsModule`,
 * Material modules, or NgRx `forFeature` modules — those concerns now live in
 * the standalone components themselves and in {@link provideAuth}.
 */
@NgModule({
  imports: [
    LogInComponent,
    ForgottenPasswordComponent,
    SignUpComponent,
    ActivateUserComponent
  ],
  exports: [
    LogInComponent,
    ForgottenPasswordComponent,
    SignUpComponent,
    ActivateUserComponent
  ]
})
export class AuthModule {
  /**
   * @deprecated Use {@link provideAuth} in a standalone `ApplicationConfig`.
   * This method is retained for NgModule-based consumers and simply delegates
   * to `provideAuth(config)`.
   */
  static forRoot(config: AuthModuleConfig): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [provideAuth(config)]
    };
  }
}
