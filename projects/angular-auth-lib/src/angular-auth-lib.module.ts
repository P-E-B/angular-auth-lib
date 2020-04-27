import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ToastrModule } from 'ngx-toastr';

import { authReducer } from './store/reducer';
import { AuthEffects } from './store/effects';
import { TokenInterceptor } from './services/token.interceptor';
import { AuthGuard } from './services/auth-guard.service';
import { LogInComponent } from './components/log-in/log-in.component';
import { ForgottenPasswordComponent } from './components/forgotten-password/forgotten-password.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

import {
  AuthModuleConfig,
  AUTH_API_URLS,
  AUTH_IMAGES_URLS,
  AUTH_TRADUCTIONS,
  AUTH_RESET_ACTIONS,
  AUTH_STYLES
} from './token';


@NgModule({
  declarations: [LogInComponent, ForgottenPasswordComponent, SignUpComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  entryComponents: [ForgottenPasswordComponent],
  exports: [LogInComponent, ForgottenPasswordComponent],
  providers: [AuthGuard]
})
export class AuthModule {
  static forRoot(config: AuthModuleConfig): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: AUTH_API_URLS, useValue: config.urls },
        { provide: AUTH_IMAGES_URLS, useValue: config.images },
        { provide: AUTH_TRADUCTIONS, useValue: config.traductions },
        { provide: AUTH_RESET_ACTIONS, useValue: config.resetActions },
        { provide: AUTH_STYLES, useValue: config.styles },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
      ]
    };
  }
}
