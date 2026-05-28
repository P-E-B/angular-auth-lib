import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideToastr } from 'ngx-toastr';

import { authFeature } from './store/reducer';
import { AuthEffects } from './store/effects';
import {
  AuthModuleConfig,
  AUTH_API_URLS,
  AUTH_IMAGES_URLS,
  AUTH_TRADUCTIONS,
  AUTH_RESET_ACTIONS,
  AUTH_STYLES
} from './token';

/**
 * Registers the `angular-auth-lib` feature for a standalone Angular application.
 *
 * Wires up:
 *  - the `AUTH_*` configuration tokens,
 *  - the NgRx `auth` feature state + effects,
 *  - `ngx-toastr` defaults used by the auth effects.
 *
 * The **host application** remains responsible for providing the root
 * infrastructure that a library must not own:
 *  - `provideHttpClient(withInterceptors([tokenInterceptor]))` — register the
 *    auth token interceptor on your own `HttpClient` configuration,
 *  - `provideAnimations()` / `provideAnimationsAsync()`,
 *  - `provideStore()` and root `provideEffects()`,
 *  - `provideRouter(...)`.
 *
 * @example
 * ```ts
 * // app.config.ts
 * import { ApplicationConfig } from '@angular/core';
 * import { provideHttpClient, withInterceptors } from '@angular/common/http';
 * import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
 * import { provideStore } from '@ngrx/store';
 * import { provideEffects } from '@ngrx/effects';
 * import { provideAuth, tokenInterceptor } from 'angular-auth-lib';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideStore(),
 *     provideEffects(),
 *     provideHttpClient(withInterceptors([tokenInterceptor])),
 *     provideAnimationsAsync(),
 *     provideAuth({
 *       urls: { ... },
 *       images: { ... }
 *     })
 *   ]
 * };
 * ```
 */
export function provideAuth(config: AuthModuleConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: AUTH_API_URLS, useValue: config.urls },
    { provide: AUTH_IMAGES_URLS, useValue: config.images },
    { provide: AUTH_TRADUCTIONS, useValue: config.traductions },
    { provide: AUTH_RESET_ACTIONS, useValue: config.resetActions },
    { provide: AUTH_STYLES, useValue: config.styles },
    provideState(authFeature),
    provideEffects(AuthEffects),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ]);
}
