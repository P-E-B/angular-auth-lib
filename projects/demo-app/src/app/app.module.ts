import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthModule } from 'angular-auth-lib';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TestComponent } from './components/test/test.component';
import { AuthModuleConfig } from 'projects/angular-auth-lib/src/token';

export const API_PREFIX = 'http://localhost:5000/api'; // back-end url you have to set up

const authModuleConfig: AuthModuleConfig = {
  urls: {
    accessTokenUrl: `${API_PREFIX}/log-in`,
    userInformationUrl: `${API_PREFIX}/user-information`,
    changePasswordUrl: `${API_PREFIX}/user-management`,
    sendBackPasswordUrl: `${API_PREFIX}/user-management`,
    signUpUrl: `${API_PREFIX}/sign-up`,
    sendActivationCodeUrl: `${API_PREFIX}/activation`,
  },
  images: {
    loginBackgroundImageUrl: 'https://firebasestorage.googleapis.com/v0/b/co-investir.appspot.com/o/fallback_cwebp_images%2Flogin-background-image-min.jpeg?alt=media&token=13d96afb-e7f5-496a-ae09-73203400f02c',
    logoImageUrl: 'https://firebasestorage.googleapis.com/v0/b/co-investir.appspot.com/o/logos%2Fco-investir-logo.png?alt=media&token=7533305c-8e80-4d86-9377-5d9deee1a15d'
  },
  traductions: {
    dialogs: {
      signup: 'Création de ton compte'
    },
    buttons: {
      login: 'Connecte toi',
      send: 'Envoyer',
      passwordForgotten: 'Mot de passe oublié ?',
      signup: 'Envoyer',
      sendActivationCode: 'Envoyer'
    },
    form: {
      usernamePlaceholder: "Ton email",
      passwordPlaceholder: 'Mot de passe',
      emailPlaceholder: 'Ton email',
      firstNamePlaceholder: 'Ton prénom',
      lastNamePlaceholder: 'Ton nom de famille',
      enterprisePlaceholder: '',
      activationCodePlaceholder: "Ton code d'activation"
    },
    messages: {
      loginSuccess: 'Heureux de te revoir',
      loginFailure: 'Informations erronées',
      signupSuccess: "Bravo ! Ton compte vient d'être créé",
      signupFailure: 'Un problème est survenu',
      sendActivationCodeSuccess: 'Ton compte a bien été vérifié',
      sendActivationCodeFailure: "Mauvais code d'activation",
      passwordResetSuccess: "Un nouveau de mot de passe t'a été envoyé",
      passwordResetFailure: 'Un problème est survenu',
      changePasswordSuccess: 'Ton mot de passe a bien été modifié',
      changePasswordFailure: 'Un problème est survenu'
    }
  },
  styles: {
    buttonsBackgroundColor: 'red',
    buttonsColor: 'white'
  },
  resetActions: []
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
