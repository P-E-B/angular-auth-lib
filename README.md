# Angular Auth Library

Headless JWT authentication for **Angular 20+** with **NgRx** — token interceptor with automatic refresh, route guard, and an opaque user store. **Bring your own UI.**

```sh
npm i angular-auth-lib @ngrx/store @ngrx/effects
```

That's it. Everything else is already in your Angular app.


## What you get

* `provideAuth<TUser>(config)` — single bootstrap call
* `tokenInterceptor` — attaches `Bearer` to your API origins only; refreshes-and-retries on expiry/401
* `authGuard` — functional `CanActivateFn`; you supply the authorization predicate
* `AuthService` — `login`, `refreshToken`, `getToken`, `storeToken`, `getUserInformation`
* `AuthActions` — `logIn`, `logOut`, `refreshToken`, `loadUserInformation`, `updateUser`, `resetAuthState` (+ `…Success`/`…Failure`)
* `AuthState` — `{ isAuthenticated: boolean; user: unknown }`
* `selectIsAuthenticated`, `selectAuthUser<TUser>()`, `selectAuthState`

The library never assumes a shape for your user record. It fetches it, stores it, and hands it back typed.


## Quickstart

```ts
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideAuth, tokenInterceptor } from 'angular-auth-lib';

interface MyUser {
  id: string;
  email: string;
  roles: string[];
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideEffects(),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideAuth<MyUser>({
      urls: {
        accessTokenUrl: '/api/token',
        refreshTokenUrl: '/api/token/refresh',   // optional
        userInformationUrl: '/api/me',           // optional
      },
      behavior: {
        // REQUIRED — no permissive default. Return true for allow-all.
        canActivate: (user, route) => {
          const role = route.data?.['role'] as string | undefined;
          return role ? !!user && user.roles.includes(role) : true;
        },
        redirectAfterLogin: () => '/dashboard',  // default '/'
        loginRoute: 'signin',                    // default 'log-in'
      },
    }),
  ],
};
```

```ts
// app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from 'angular-auth-lib';

export const routes: Routes = [
  { path: 'signin', component: MyLoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard], data: { role: 'admin' } },
];
```


## Your login component

The library ships no UI. Dispatch `AuthActions.logIn` with whatever credential shape your backend expects — it's posted verbatim.

```ts
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions, AuthCredentials } from 'angular-auth-lib';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input type="email" formControlName="email" />
      <input type="password" formControlName="password" />
      <button type="submit" [disabled]="form.invalid">Log in</button>
    </form>
  `,
})
export class MyLoginComponent {
  private readonly store = inject(Store);

  readonly form = inject(NonNullableFormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  submit(): void {
    const payload: AuthCredentials = this.form.getRawValue();
    this.store.dispatch(AuthActions.logIn({ payload }));
  }
}
```

`AuthCredentials` is `{ email; password }` for convenience, but `logIn` accepts `unknown` — pass `{ username, password }`, `{ phone, otp }`, anything.


## Reading the user

```ts
import { selectAuthUser, selectIsAuthenticated, AuthActions } from 'angular-auth-lib';

const selectCurrentUser = selectAuthUser<MyUser>();

@Component({ /* … */ })
export class HeaderComponent {
  private readonly store = inject(Store);

  readonly user = this.store.selectSignal(selectCurrentUser);
  readonly isAuthenticated = this.store.selectSignal(selectIsAuthenticated);

  logout(): void {
    this.store.dispatch(AuthActions.logOut());
  }
}
```

```html
@if (user(); as u) {
  <span>{{ u.email }}</span>
  <button (click)="logout()">Log out</button>
}
```


## Reacting to auth events

Toasts, analytics, side-effects — listen to the actions in your own effect:

```ts
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from 'angular-auth-lib';

@Injectable()
export class AppNotificationEffects {
  private readonly actions$ = inject(Actions);
  private readonly snackBar = inject(MatSnackBar);

  loginFailed$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.logInFailure),
      tap(() => this.snackBar.open('Wrong credentials', 'Dismiss')),
    ),
    { dispatch: false },
  );

  // Reset other feature slices on logout
  logout$ = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.logOut), map(() => resetCartState())),
  );
}
```


## Backend contract

| Endpoint | Method | Request body | Response body |
|---|---|---|---|
| `accessTokenUrl` | POST | your credentials object, verbatim | `{ "access": "<jwt>", "refresh"?: "<token>" }` |
| `refreshTokenUrl` | POST | `{ "refresh": "<token>" }` | `{ "access": "<jwt>", "refresh"?: "<token>" }` |
| `userInformationUrl` | GET | — | your user object, verbatim |

The access token must be a JWT with an `exp` claim. The library decodes `exp` for proactive refresh; it never verifies the signature (your server does).


## Refresh tokens

Set `urls.refreshTokenUrl` to opt in. When the backend returns a `refresh` field on login, `tokenInterceptor` keeps the session alive transparently:

* **Proactive** — if the JWT's `exp` is within 30 s, refresh before sending.
* **Reactive** — on `401`, refresh and replay the original request once.

Concurrent requests share a single in-flight refresh. If the refresh itself fails, `AuthActions.logOut` is dispatched and the original error re-thrown.


## Login flow

```
dispatch logIn({ payload })
  → POST accessTokenUrl → token stored in sessionStorage
  → GET userInformationUrl (if configured) → user stored in state
  → dispatch logInSuccess({ payload: { user } })
  → navigate to ?returnUrl (if set by guard) or behavior.redirectAfterLogin() or '/'
```

When `authGuard` denies access, it returns a `UrlTree` to `behavior.loginRoute` with `?returnUrl=<attempted-url>`. The login-success effect honours `returnUrl` only when it's a root-relative path — absolute and protocol-relative URLs are rejected to prevent open-redirect attacks.


## API reference

### `AuthModuleConfig<TUser>`

```ts
interface AuthModuleConfig<TUser = unknown> {
  urls: {
    accessTokenUrl: string;
    refreshTokenUrl?: string;
    userInformationUrl?: string;
  };
  behavior: {
    canActivate: (user: TUser | null, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => boolean;
    redirectAfterLogin?: (user: TUser | null) => string;  // default '/'
    loginRoute?: string;                                   // default 'log-in'
  };
}
```

### `AuthActions`

| Action | Payload |
|---|---|
| `logIn` | `{ payload: unknown }` — posted verbatim to `accessTokenUrl` |
| `logInSuccess` | `{ payload: { user: unknown } }` |
| `logInFailure` | `{ payload: HttpErrorResponse }` |
| `logOut` | — |
| `refreshToken` | — |
| `refreshTokenSuccess` | `{ payload: Token }` |
| `refreshTokenFailure` | `{ payload: HttpErrorResponse }` |
| `loadUserInformation` | — |
| `loadUserInformationSuccess` | `{ payload: unknown }` |
| `loadUserInformationFailure` | `{ payload: HttpErrorResponse }` |
| `updateUser` | `{ payload: unknown }` — replaces `state.user` |
| `resetAuthState` | — |

### Types

```ts
interface Token { token: string; expiringDate: number; refreshToken?: string }
interface AuthCredentials { email: string; password: string }
interface AuthState { isAuthenticated: boolean; user: unknown | null }
```


## Migrating from 1.x

2.0 is a headless rewrite — UI components, account-management flows, and presentation config are gone. The core auth machinery (interceptor, guard, refresh, store) is unchanged in behaviour.

| 1.x | 2.0 |
|---|---|
| `npm i @angular/material @angular/cdk ngx-toastr` | — (no UI peers) |
| `LogInComponent`, `SignUpComponent`, `ForgottenPasswordComponent`, `ActivateUserComponent` | build your own; dispatch `AuthActions.logIn` |
| `provideAuth({ urls, images, traductions, styles, resetActions })` | `provideAuth<TUser>({ urls, behavior })` |
| `User`/`BaseUser` with `id`, `firstName`, `allowedUrls`, `redirectUrlAfterLogin`, … | your own type via `selectAuthUser<TUser>()` |
| guard reads `user.allowedUrls` | `behavior.canActivate(user, route, state)` — **required** |
| effects read `user.redirectUrlAfterLogin` | `behavior.redirectAfterLogin(user)` |
| `userInformationUrl` returns `{ user, usersList }` | returns the user object directly |
| `LogIn({ payload })`, `LogOut()`, … | `AuthActions.logIn({ payload })`, `AuthActions.logOut()` |
| `selectUser`, `selectUsersList`, `selectIsLoginLoading`, `selectLogInError`, … | `selectIsAuthenticated`, `selectAuthUser<T>()`, `selectAuthState` |
| `SignUp`, `ChangePassword`, `SendPassword`, `SendActivationCode` actions | removed — call your own backend |
| toast on success/failure | listen to `AuthActions.*` in your own effect |
| `resetActions: [resetX]` | `on(AuthActions.logOut, () => initialState)` in your reducer |
| login route must be `'log-in'` | `behavior.loginRoute` |
| `Token.expiringDate: Date` | `number` (epoch ms — NgRx-serializable) |


## Change log

* **2.0.0** — **BREAKING** headless rewrite
  * Removed all UI components, `ngx-toastr`, `@angular/material`, `@angular/forms` peers
  * Removed `BaseUser`/`User` — user record is opaque; new `selectAuthUser<TUser>()` and `provideAuth<TUser>()`
  * Removed account-management actions (`signUp`, `changePassword`, `sendPassword`, `sendActivationCode`) and `usersList`
  * Removed PascalCase action aliases — use `AuthActions.*`
  * `AuthState` reduced to `{ isAuthenticated, user }`
  * New required `behavior.canActivate` callback (fail-closed); new `redirectAfterLogin`, `loginRoute`
  * `authGuard` returns `UrlTree` with `?returnUrl=`; login effect validates it against open-redirect
  * `Token.expiringDate` is now epoch ms
  * Peer deps: `@angular/{core,common,router}` `^20`, `@ngrx/{store,effects}` `^20`, `rxjs` `^7`

* **1.1.0** — Refresh-token support; removed 1.0-deprecated APIs
* **1.0.0** — Angular 20 rewrite (standalone, signals, `provideAuth`)
* **0.0.1–0.0.16** — see git history


## Repo

Source: <https://github.com/P-E-B/angular-auth-lib.git> · MIT
