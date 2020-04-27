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
        };
        buttons?: {
            login?: string;
            send?: string;
            passwordForgotten?: string;
            signup?: string;
        };
        form?: {
            usernamePlaceholder?: string;
            passwordPlaceholder?: string;
            emailPlaceholder?: string;
            firstNamePlaceholder?: string;
            lastNamePlaceholder?: string;
            enterprisePlaceholder?: string;
        };
        messages?: {
            loginSuccess?: string;
            loginFailure?: string;
            signupSuccess?: string;
            signupFailure?: string;
            passwordResetSuccess?: string;
            passwordResetFailure?: string;
            changePasswordSuccess?: string;
            changePasswordFailure?: string;
        };
    };
    styles?: {
        buttonsColor?: string;
        buttonsBackgroundColor?: string;
    };
    resetActions?: any[];
}
export declare const AUTH_API_URLS: InjectionToken<{
    accessTokenUrl: string;
    userInformationUrl: string;
    sendBackPasswordUrl: string;
    refreshTokenUrl?: string;
    changePasswordUrl?: string;
    signUpUrl?: string;
}>;
export declare const AUTH_IMAGES_URLS: InjectionToken<{
    loginBackgroundImageUrl: string;
    logoImageUrl: string;
}>;
export declare const AUTH_TRADUCTIONS: InjectionToken<{
    dialogs?: {
        signup?: string;
    };
    buttons?: {
        login?: string;
        send?: string;
        passwordForgotten?: string;
        signup?: string;
    };
    form?: {
        usernamePlaceholder?: string;
        passwordPlaceholder?: string;
        emailPlaceholder?: string;
        firstNamePlaceholder?: string;
        lastNamePlaceholder?: string;
        enterprisePlaceholder?: string;
    };
    messages?: {
        loginSuccess?: string;
        loginFailure?: string;
        signupSuccess?: string;
        signupFailure?: string;
        passwordResetSuccess?: string;
        passwordResetFailure?: string;
        changePasswordSuccess?: string;
        changePasswordFailure?: string;
    };
}>;
export declare const AUTH_RESET_ACTIONS: InjectionToken<any[]>;
export declare const AUTH_STYLES: InjectionToken<{
    buttonsColor?: string;
    buttonsBackgroundColor?: string;
}>;
