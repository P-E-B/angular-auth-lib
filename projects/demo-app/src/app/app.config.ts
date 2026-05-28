import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { AuthModuleConfig, provideAuth, tokenInterceptor } from 'angular-auth-lib';

import { routes } from './app.routes';

/** Back-end base URL — adjust to your environment. */
export const API_PREFIX = 'http://localhost:5000/api';

export const authModuleConfig: AuthModuleConfig = {
  urls: {
    accessTokenUrl: `${API_PREFIX}/log-in`,
    userInformationUrl: `${API_PREFIX}/user-information`,
    changePasswordUrl: `${API_PREFIX}/user-management`,
    sendBackPasswordUrl: `${API_PREFIX}/user-management`,
    signUpUrl: `${API_PREFIX}/sign-up`,
    sendActivationCodeUrl: `${API_PREFIX}/activation`,
  },
  images: {
    loginBackgroundImageUrl:
      'https://firebasestorage.googleapis.com/v0/b/co-investir.appspot.com/o/fallback_cwebp_images%2Flogin-background-image-min.jpeg?alt=media&token=13d96afb-e7f5-496a-ae09-73203400f02c',
    logoImageUrl:
      'https://firebasestorage.googleapis.com/v0/b/co-investir.appspot.com/o/logos%2Fco-investir-logo.png?alt=media&token=7533305c-8e80-4d86-9377-5d9deee1a15d',
  },
  traductions: {
    dialogs: {
      signup: 'Création de ton compte',
    },
    buttons: {
      login: 'Connecte toi',
      send: 'Envoyer',
      passwordForgotten: 'Mot de passe oublié ?',
      signup: 'Envoyer',
      sendActivationCode: 'Envoyer',
    },
    form: {
      usernamePlaceholder: 'Ton email',
      passwordPlaceholder: 'Mot de passe',
      emailPlaceholder: 'Ton email',
      firstNamePlaceholder: 'Ton prénom',
      lastNamePlaceholder: 'Ton nom de famille',
      enterprisePlaceholder: '',
      activationCodePlaceholder: "Ton code d'activation",
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
      changePasswordFailure: 'Un problème est survenu',
    },
  },
  styles: {
    buttonsBackgroundColor: 'red',
    buttonsColor: 'white',
  },
  resetActions: [],
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({}),
    provideEffects(),
    provideStoreDevtools({ maxAge: 20 }),
    provideAnimations(),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideAuth(authModuleConfig),
  ],
};
