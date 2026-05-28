# Angular Auth Library

Drop-in authentication for **Angular 20+** apps backed by **NgRx**, **RxJS** and **Angular Material** — login, sign-up, password reset and account activation, with a fully wired store (actions, reducer, effects, selectors), a route guard and an HTTP token interceptor.

Ships as **standalone components** with a single `provideAuth()` entry point. Set up in under 10 minutes.

It contains:

* `AuthService`
* `authGuard` (functional `CanActivateFn`)
* `tokenInterceptor` (functional `HttpInterceptorFn`)
* a `User` model you can extend
* an NgRx feature (`authFeature`, actions, effects, selectors)
* four standalone components:
  1. `LogInComponent` — login form
  2. `ForgottenPasswordComponent` — request a new password
  3. `SignUpComponent` — create an account (username, password, first/last name, email, optional enterprise). Opens as a Material dialog via the `OpenSignUpDialog` action.
  4. `ActivateUserComponent` — activate an account from an emailed code/link

> Refresh-token support is not yet implemented — extend your access-token lifetime in the meantime.


## Repo

Source code: <https://github.com/P-E-B/angular-auth-lib.git>


## Installation

```sh
npm i angular-auth-lib
npm i @angular/material @angular/cdk @ngrx/store @ngrx/effects ngx-toastr
```


## Quickstart

You'll need:

* an Angular 20 standalone app with NgRx (`provideStore()` + `provideEffects()`)
* a backend implementing the auth endpoints (see **Configuration** below)

### 1. Register `provideAuth()` in your app config

```ts
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideAuth, tokenInterceptor } from 'angular-auth-lib';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideEffects(),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideAnimationsAsync(),
    provideAuth({
      urls: {
        accessTokenUrl: '/api/log-in',
        userInformationUrl: '/api/user-information',
        sendBackPasswordUrl: '/api/user-management',
        changePasswordUrl: '/api/user-management',
        signUpUrl: '/api/sign-up',
        sendActivationCodeUrl: '/api/activation',
      },
      images: {
        loginBackgroundImageUrl: 'assets/login-bg.jpg',
        logoImageUrl: 'assets/logo.png',
      },
    }),
  ],
};
```

```ts
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
```

### 2. Add routes and guard

> ⚠️ The login route **must** use the path `'log-in'` — the guard and effects redirect to it by that literal.

```ts
// app.routes.ts
import { Routes } from '@angular/router';
import { LogInComponent, ActivateUserComponent, authGuard } from 'angular-auth-lib';

export const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'log-in', component: LogInComponent },
  { path: 'activate', component: ActivateUserComponent },
  { path: 'example', canActivate: [authGuard], component: ExampleComponent },
  { path: '**', redirectTo: '' },
];
```

### 3. Global styles

```scss
// styles.scss
@use '@angular/material/prebuilt-themes/azure-blue.css';
@use 'ngx-toastr/toastr';

@import url('https://fonts.googleapis.com/css?family=Roboto:400,700|Material+Icons');

#toast-container > div { opacity: 1; }
button:focus { outline: none; }
body { margin: 0; }
```

That's it — you have a login page, an auth store, a guard and a token interceptor.


## Backend contract

The library expects:

* **`accessTokenUrl`** (POST) — response body must contain `{ "access": "<token>" }`
* **`userInformationUrl`** (GET) — response body must contain `{ "user": { ... } }`

Each user object sent to the frontend must include:

* `token` — when login succeeds
* `redirectUrlAfterLogin` — where the router sends the user after login
* `allowedUrls` — paths the guard will permit (enforce permissions on the backend too)

```json
{
  "id": 1,
  "username": "paul",
  "allowedUrls": ["home"],
  "dateJoined": "2020-04-27T00:26:59.482740+02:00",
  "email": "paul.emile.brotons@gmail.com",
  "enterprise": "MongoDB",
  "firstName": "Paul-Emile",
  "lastName": "Brotons",
  "redirectUrlAfterLogin": "home",
  "isActivated": true
}
```


## Configuration

Full `AuthModuleConfig`:

```ts
export interface AuthModuleConfig {
  urls: {
    accessTokenUrl: string;
    userInformationUrl: string;
    sendBackPasswordUrl: string;
    refreshTokenUrl?: string;
    changePasswordUrl?: string;
    signUpUrl?: string;
    sendActivationCodeUrl?: string;
  };
  images: {
    loginBackgroundImageUrl: string;
    logoImageUrl: string;
  };
  traductions?: {
    dialogs?: { signup?: string };
    buttons?: {
      login?: string; send?: string; passwordForgotten?: string;
      signup?: string; sendActivationCode?: string;
    };
    form?: {
      usernamePlaceholder?: string; passwordPlaceholder?: string;
      emailPlaceholder?: string; firstNamePlaceholder?: string;
      lastNamePlaceholder?: string; enterprisePlaceholder?: string;
      activationCodePlaceholder?: string;
    };
    messages?: {
      loginSuccess?: string; loginFailure?: string;
      signupSuccess?: string; signupFailure?: string;
      sendActivationCodeSuccess?: string; sendActivationCodeFailure?: string;
      passwordResetSuccess?: string; passwordResetFailure?: string;
      changePasswordSuccess?: string; changePasswordFailure?: string;
    };
  };
  styles?: {
    buttonsColor?: string;            // default 'white'
    buttonsBackgroundColor?: string;  // default '#3f51b5'
  };
  resetActions?: Array<() => Action>; // dispatched on logout to clear other slices
}
```

User model:

```ts
export interface Token { token: string; expiringDate: Date; }

export interface BaseUser {
  id: number;
  username?: string;
  firstName: string;
  lastName: string;
  email: string;
  enterprise?: string | null;
  dateJoined: Date;
  redirectUrlAfterLogin: string;
  allowedUrls: string[];
  isActivated: boolean;
  token?: Token;
  password?: string; // only present on the login request
}

export interface User extends BaseUser {
  [attribute: string]: unknown; // extend with your own backend fields
}
```


## Using the store in your components

Read state with `selectSignal`, dispatch with action creators:

```ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectUser, selectIsPasswordBeingChanged, ChangePassword } from 'angular-auth-lib';

@Component({
  selector: 'app-user-page',
  imports: [ReactiveFormsModule],
  templateUrl: './user-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPageComponent {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  user = this.store.selectSignal(selectUser);
  isPasswordBeingChanged = this.store.selectSignal(selectIsPasswordBeingChanged);

  userForm = this.fb.nonNullable.group({ currentPassword: '', nextPassword: '' });

  resetPassword() {
    this.store.dispatch(ChangePassword({ payload: this.userForm.getRawValue() }));
    this.userForm.reset();
  }
}
```

```html
@if (user(); as u) {
  <h2>Hello {{ u.firstName }}</h2>
}
@if (isPasswordBeingChanged()) {
  <mat-progress-spinner mode="indeterminate" />
}
```


## Actions & selectors

**Actions** (also available grouped as `AuthActions.*`):

| Action | Payload |
|---|---|
| `LogIn` | `{ payload: Partial<User> }` |
| `LogOut` | — |
| `OpenSignUpDialog` | — |
| `SignUp` | `{ payload: Partial<User> }` |
| `SendActivationCode` | `{ payload: string }` |
| `ChangePassword` | `{ payload: { currentPassword: string; nextPassword: string } }` |
| `OpenForgottenPasswordDialog` | — |
| `SendPassword` | `{ payload: string }` |
| `UpdateUser` | `{ payload: Partial<User> }` |
| `LoadUserInformation` | — |
| `ResetAuthState` | — |

Each has matching `…Success` / `…Failure` actions for effects you may want to react to.

**Selectors:** `selectAuthState`, `selectUser`, `selectIsAuthenticated`, `selectLogInError`, `selectIsLoginLoading`, `selectIsPasswordBeingChanged`, `selectIsSignUpLoading`, `selectIsSendActivationCodeLoading`, `selectIsUserCreated`, `selectIsActivated`, `selectUsersList`.


## NgModule consumers

`AuthModule.forRoot(config)` still exists (deprecated) and delegates to `provideAuth()`. You must still register `HttpClient`, animations and the token interceptor yourself.


## Migrating from 0.x

| 0.x | 1.0 |
|---|---|
| `AuthModule.forRoot(cfg)` in `imports` | `provideAuth(cfg)` in `providers` |
| `canActivate: [AuthGuard]` | `canActivate: [authGuard]` |
| `HTTP_INTERCEPTORS` → `TokenInterceptor` | `provideHttpClient(withInterceptors([tokenInterceptor]))` |
| `store.dispatch(new LogIn(user))` | `store.dispatch(LogIn({ payload: user }))` |
| `store.pipe(select(selectUser))` | `store.selectSignal(selectUser)` |
| `resetActions: [ResetAppState]` (class) | `resetActions: [resetAppState]` (creator) |
| `User[k]: any` | `User[k]: unknown` — cast custom fields |
| Action type `'[Auth] User tries to log in'` | `'[Auth] Log In'` — match via `AUTH_ACTIONS_TYPE.*` |


## Change log

* **1.0.0** — **BREAKING** Angular 20 rewrite
  * Standalone components, signals, `inject()`, `@if`/`@for` control flow, OnPush
  * New `provideAuth(config)` entry point for `bootstrapApplication`
  * Functional `authGuard` / `tokenInterceptor` (class versions kept, deprecated)
  * NgRx 20: `createActionGroup`, `createFeature` — actions are now **creator functions**, not classes (`LogIn({ payload })` instead of `new LogIn(payload)`)
  * Library no longer bundles `HttpClientModule` / `BrowserAnimationsModule` — host app provides them
  * Strict types: `User[k]` is `unknown`, `AuthState` fields are nullable
  * Peer deps: Angular `^20`, NgRx `^20`, RxJS `^7`, ngx-toastr `^19`

* **0.0.16** — `SignUpSuccess` no longer closes the dialog; activation-code support
* **0.0.15** — Removed lodash-es
* **0.0.14** — lodash → lodash-es for tree-shaking
* **0.0.13** — `isLoading` selector
* **0.0.12** — `UpdateUser` action
* **0.0.11** — `BaseUser` interface
* **0.0.10** — SSR support
* **0.0.9** — `isSignUpLoading` selector
* **0.0.5** — `SignUpComponent`
* **0.0.4** — [BREAKING] `AuthModuleConfig` reshaped
* **0.0.1** — Initial release
