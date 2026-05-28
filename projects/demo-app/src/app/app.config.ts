import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { provideAuth, tokenInterceptor } from 'angular-auth-lib';

import { routes } from './app.routes';

/** Back-end base URL — adjust to your environment. */
export const API_PREFIX = 'http://localhost:5000/api';

/** Demo-app user shape returned by `userInformationUrl`. */
export interface DemoUser {
  id: string;
  email: string;
  roles: string[];
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({}),
    provideEffects(),
    provideStoreDevtools({ maxAge: 20 }),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideAuth<DemoUser>({
      urls: {
        accessTokenUrl: `${API_PREFIX}/log-in`,
        refreshTokenUrl: `${API_PREFIX}/refresh`,
        userInformationUrl: `${API_PREFIX}/user-information`,
      },
      behavior: {
        canActivate: (user, route) => {
          const required = route.data?.['role'] as string | undefined;
          return required ? !!user && user.roles.includes(required) : true;
        },
        redirectAfterLogin: () => '/test',
        loginRoute: 'log-in',
      },
    }),
  ],
};
