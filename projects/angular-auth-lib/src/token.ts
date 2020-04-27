import { InjectionToken } from '@angular/core';

export interface AuthModuleConfig {
    urls: {
      accessTokenUrl: string;
      userInformationUrl: string;
      sendBackPasswordUrl: string;
      refreshTokenUrl?: string;
      changePasswordUrl?: string;
      signUpUrl?: string;
    };
    images: {
      loginBackgroundImageUrl: string;
      logoImageUrl: string;
    };
    traductions?: {
      dialogs?: {
        signup?: string;
      }
      buttons?: {
        login?: string;
        send?: string;
        passwordForgotten?: string;
        signup?: string;
      }
      form?: {
        usernamePlaceholder?: string;
        passwordPlaceholder?: string;
        emailPlaceholder?: string;
        firstNamePlaceholder?: string;
        lastNamePlaceholder?: string;
        enterprisePlaceholder?: string;
      },
      messages?: {
        loginSuccess?: string;
        loginFailure?: string;
        signupSuccess?: string;
        signupFailure?: string;
        passwordResetSuccess?: string;
        passwordResetFailure?: string;
        changePasswordSuccess?: string;
        changePasswordFailure?: string;
      }
    };
    styles?: {
        buttonsColor?: string;
        buttonsBackgroundColor?: string;
    };
    resetActions?: any[];
}

export const AUTH_API_URLS = new InjectionToken<AuthModuleConfig['urls']>('Auth api related urls');
export const AUTH_IMAGES_URLS = new InjectionToken<AuthModuleConfig['images']>('Images urls');
export const AUTH_TRADUCTIONS = new InjectionToken<AuthModuleConfig['traductions']>('Traductions');
export const AUTH_RESET_ACTIONS = new InjectionToken<AuthModuleConfig['resetActions']>('Reset actions');
export const AUTH_STYLES = new InjectionToken<AuthModuleConfig['styles']>('Styling');
