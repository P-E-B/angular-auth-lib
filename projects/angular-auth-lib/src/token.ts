import { InjectionToken } from '@angular/core';
import type { Action } from '@ngrx/store';

/** API endpoint URLs consumed by {@link AuthService}. */
export interface AuthUrlsConfig {
  accessTokenUrl: string;
  userInformationUrl: string;
  sendBackPasswordUrl: string;
  refreshTokenUrl?: string;
  changePasswordUrl?: string;
  signUpUrl?: string;
  sendActivationCodeUrl?: string;
}

/** Image asset URLs rendered by the auth components. */
export interface AuthImagesConfig {
  loginBackgroundImageUrl: string;
  logoImageUrl: string;
}

/** Optional i18n strings for the auth components and toast messages. */
export interface AuthTraductionsConfig {
  dialogs?: {
    signup?: string;
  };
  buttons?: {
    login?: string;
    send?: string;
    passwordForgotten?: string;
    signup?: string;
    sendActivationCode?: string;
  };
  form?: {
    usernamePlaceholder?: string;
    passwordPlaceholder?: string;
    emailPlaceholder?: string;
    firstNamePlaceholder?: string;
    lastNamePlaceholder?: string;
    enterprisePlaceholder?: string;
    activationCodePlaceholder?: string;
  };
  messages?: {
    loginSuccess?: string;
    loginFailure?: string;
    signupSuccess?: string;
    signupFailure?: string;
    sendActivationCodeSuccess?: string;
    sendActivationCodeFailure?: string;
    passwordResetSuccess?: string;
    passwordResetFailure?: string;
    changePasswordSuccess?: string;
    changePasswordFailure?: string;
  };
}

/** Optional styling overrides for the auth components. */
export interface AuthStylesConfig {
  buttonsColor?: string;
  buttonsBackgroundColor?: string;
}

/**
 * Zero-argument NgRx action factories dispatched on `LogOut` to reset
 * downstream feature state. Typically `createAction()` / `createActionGroup`
 * creators. Consumed by `AuthEffects` as `resetAction()`.
 */
export type AuthResetActions = Array<() => Action>;

export interface AuthModuleConfig {
  urls: AuthUrlsConfig;
  images: AuthImagesConfig;
  traductions?: AuthTraductionsConfig;
  styles?: AuthStylesConfig;
  resetActions?: AuthResetActions;
}

export const AUTH_API_URLS = new InjectionToken<AuthModuleConfig['urls']>('Auth api related urls');
export const AUTH_IMAGES_URLS = new InjectionToken<AuthModuleConfig['images']>('Images urls');
export const AUTH_TRADUCTIONS = new InjectionToken<AuthModuleConfig['traductions']>('Traductions');
export const AUTH_RESET_ACTIONS = new InjectionToken<AuthModuleConfig['resetActions']>('Reset actions');
export const AUTH_STYLES = new InjectionToken<AuthModuleConfig['styles']>('Styling');
