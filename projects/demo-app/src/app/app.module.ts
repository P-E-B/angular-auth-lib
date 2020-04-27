import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthModule } from 'angular-auth-lib';
import { AuthModuleConfig } from 'angular-auth-lib/token';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TestComponent } from './components/test/test.component';

export const API_PREFIX = 'http://localhost:5000/api'; // back-end url you have to set up

const authModuleConfig: AuthModuleConfig = {
  urls: {
    accessTokenUrl: `${API_PREFIX}/log-in`,
    userInformationUrl: `${API_PREFIX}/user-information`,
    changePasswordUrl: `${API_PREFIX}/user-management`,
    sendBackPasswordUrl: `${API_PREFIX}/user-management`,
    signUpUrl: `${API_PREFIX}/sign-up`
  },
  images: {
    loginBackgroundImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
    logoImageUrl: 'https://image.flaticon.com/icons/svg/1420/1420337.svg'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    AuthModule.forRoot(authModuleConfig),
    StoreDevtoolsModule.instrument({
      maxAge: 20
    }),
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
