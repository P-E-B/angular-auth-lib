# Angular Auth Library

The purpose of this library is to refactor all code necessary to implement a basic authentication feature in an Angular project powered by NgRx (actions, reducer, effects and selectors).
**The library needs less than 10 minutes to be implemented**. Start the clock now and let's get started!

It contains:
* a service
* an auth guard
* a token interceptor
* a basic user model you can extend in your application
* a store powered by NgRx (actions, reducer, effects and selectors)
* three components: 
  1. `LogInComponent` which allows users to login
  2. `ForgottenPasswordComponent` which allows users to get new passwords
  3. `SignUpComponent` which allows users to create an account with basic fields (username, password, first name, last name, email, enterprise). The field enterprise is not required. Please note that `SignUpComponent` is implemented as a dialog. So user just has to click on a button dispatching the action `OpenSignUpDialog` to access the signup form.

P.S.: Refresh token feature is not yet implemented. In the meantime, increase the duration of the access token life.


## Repo

Source code is available at: https://github.com/P-E-B/angular-auth-lib.git


## Change log

* **0.0.12**: Adding UpdateUser action to manage user in real time
* **0.0.11**: Adding BaseUser interface and User is now extending it
* **0.0.10**: Adding support for SSR
* **0.0.9**: Adding `isSignUpLoading` selector
* **0.0.8**: Improving README.md
* **0.0.7**: Improving README.md and `auth.service.ts`
* **0.0.6**: Improving README.md
* **0.0.5**: Adding `SignUpComponent`
* **0.0.4**: [**BREAKING CHANGE**] Adding more flexibility for customization. `AuthModuleConfig` has been modified
* **0.0.3**: Improving README.md
* **0.0.2**: Improving README.md
* **0.0.1**: Initial commit


## Installation

Install the library: `npm i angular-auth-lib`.

Install the peer dependencies. NPM will print them on your screen. You can also find them in the library `package.json` file.

Now begin the coding implementation as described below.


## Quickstart (Go to next section - Documentation and configuration - to get more information)

I will suppose here that you have:
* an Angular 9 project running with full NgRx store (actions, effects, selectors and reducer). **Effects are required** since the library uses this great feature.
* the library and its dependencies installed
* a back-end implementing the required routes and sending the required information to the front-end (please refer to **Documentation and configuration section**)

### Learn required parameters to pass to AuthModule

The AuthModule **requires** the following parameters (please refer to its interface to see the other options):
1. **REQUIRED** `accessTokenUrl`: the back-end url to retrieve an access token (JWT for example). **The response body must have a key called `access`containing the `token`**
2. **REQUIRED** `sendBackPasswordUrl`: the back-end url to send a new password back to the user via a SMTP server (via mail)
3. **REQUIRED** `loginBackgroundImageUrl`: the url to retrieve the background-image of the login page
4. **REQUIRED** `logoImageUrl`: the url to retrieve your logo and print it on the login page
5. **REQUIRED** `userInformationUrl`: the back-end url to retrieve information of the user (username, first name, etc.). **The response body must have a key called `user`containing the user properties**

For the module to work as expected, each user sent to the frontend must have basic properties including:
* **REQUIRED** `token` when login is successful
* **REQUIRED** `redirectUrlAfterLogin` to tell the router where to route the user after successful login
* **REQUIRED** `allowedUrls` to let the Guard (if implemented) know if the desired url is allowed. Obviously, ensure permissions on the backend are well set as well

Here is an example of a user who can access `'home'` and will be redirected to it after successful login:

```json
{
	"id" : 1,
	"username" : "paul",
	"allowedUrls" : [
		"home"
	],
	"dateJoined" : "2020-04-27T00:26:59.482740+02:00",
	"email" : "paul.emile.brotons@gmail.com",
	"enterprise" : "MongoDB",
	"firstName" : "Paul-Emile",
	"lastName" : "Brotons",
	"passwordHash" : "azerty",
  "redirectUrlAfterLogin" : "home"
}
```

### Set up the AuthModule in your Root NgModule
For a basic configuration, add the `AuthModule` under your `StoreModule` and `EffectsModule` in the **imports** array section of your Root NgModule. You may have to turn off the runtime checks of the `StoreModule`.

```ts
...
StoreModule.forRoot({...}),
EffectsModule.forRoot([...]),
...
/* fill the required urls below */
AuthModule.forRoot({
  urls: {
    accessTokenUrl: <accessTokenUrl>,
    userInformationUrl: <userInformationUrl>,
    changePasswordUrl: <changePasswordUrl>,
    sendBackPasswordUrl: <sendBackPasswordUrl>,
    signUpUrl: <signUpUrl>
  },
  images: {
    loginBackgroundImageUrl: <loginBackgroundImageUrl>,
    logoImageUrl: <logoImageUrl>
  }
})
```

### Register the LogInComponent into your routing Module

You can now add `LogInComponent` in the routing. Please specify a path of `'log-in'`.

Use `AuthGuard` to prevent access to unauthorized components. Here is an example:

```ts
import { LogInComponent, AuthGuard } from 'angular-auth-lib';

const appRoutes: Routes = [
    { path: '', component: HomePageComponent, pathMatch: 'full' },
    { path: 'log-in', component: LogInComponent }, // path must be equal to 'log-in'
    { path: 'example', canActivate: [AuthGuard], component: ExampleComponent },
    ...
    { path: '**', redirectTo: '' }
];
```

### Add the following lines to your project root styles.scss

```scss
// material style
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700|Material+Icons');
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
// regular style toast
@import '~ngx-toastr/toastr.css';


#toast-container > div {
    opacity: 1;
}

 button:focus {
    outline: none;
}

body {
    margin: 0;
}
```

And that's it! Your application now has a basic authentication mechanism: a store to feed all your components with user data, a login page


## Documentation and configuration

### Interfaces of the library

See below all the parameters you can pass to the `AuthModule` in order to customize it:

```ts
export interface AuthModuleConfig {
    urls: {
      accessTokenUrl: string;
      userInformationUrl: string;
      sendBackPasswordUrl: string;
      refreshTokenUrl?: string;
      changePasswordUrl?: string;  // the back-end url to change password (it will require a UserPageComponent)
      signUpUrl?: string;  // the back-end url to sign up for a new user
    };
    images: {
      loginBackgroundImageUrl: string;
      logoImageUrl: string;
    };
    traductions?: {
      dialogs?: {
        signup?: string; // defaults to 'Sign Up'
      },
      buttons?: {
        login?: string; // defaults to 'Log in'
        send?: string; // defaults to 'Send'
        passwordForgotten?: string; // defaults to 'Forgot your password?'
        signup?: string; // defaults to 'Send'
      }
      form?: {
        usernamePlaceholder?: string; // defaults to 'Username'
        passwordPlaceholder?: string; // defaults to 'Password'
        emailPlaceholder?: string; // defaults to 'Your email'
        firstNamePlaceholder?: string; // defaults to 'First name'
        lastNamePlaceholder?: string; // defaults to 'Last name'
        enterprisePlaceholder?: string; // defaults to 'Enterprise'
      },
      messages?: {
        loginSuccess?: string; // defaults to 'Hi! Nice to see you again!'
        loginFailure?: string; // defaults to 'Wrong credentials. Please check again.'
        signupSuccess?: string; // defaults to 'Your account has been created!'
        signupFailure?: string; // defaults to 'Please try again with a new username.'
        passwordResetSuccess?: string; // defaults to 'An email for resetting your password has been sent to your address.'
        passwordResetFailure?: string; // defaults to 'An error occured. Please try again.'
        changePasswordSuccess?: string; // defaults to 'Your password has been successfully changed!'
        changePasswordFailure?: string; // defaults to 'Wrong current password. Please try again.'
      }
    };
    styles?: {
        buttonsColor?: string; // defaults to 'white'
        buttonsBackgroundColor?: string; // defaults to '#3f51b5'
    };
    resetActions?: any[]; // a list of actions to clean your store when users log out, defaults to empty array
}
```

You will find here the `User` interface, with all the fields needed by the library.
```ts
export interface Token {
    token: string;
    expiringDate: Date;
}

export interface BaseUser {
    id: number;
    username?: string;
    firstName: string;
    lastName: string;
    email: string;
    enterprise?: string;
    dateJoined: Date;
    redirectUrlAfterLogin: string;
    allowedUrls: string[];
    token?: Token;
    password?: string; // only when user sends its password to the backend for login. This should not be present afterwards.
}

export interface User extends BaseUser { // to be used by your application when needed
    [attribute: string]: any;
}
```

### Use the store to feed the rest of your application - Example use case

Below is an example of a simple component used for printing user information and **allowing user to change its password**.

```ts
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectUser, selectIsPasswordBeingChanged, ChangePassword } from 'angular-auth-lib';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  user$ = this.store.pipe(select(selectUser));
  isPasswordBeingChanged$ = this.store.pipe(select(selectIsPasswordBeingChanged)); // typical use case for a spinner
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      currentPassword: '',
      nextPassword: ''
    });
  }

  resetPassword() {
    this.store.dispatch(new ChangePassword(this.userForm.value)); // ChangePassword expects a payload of type { currentPassword: string, nextPassword: string }
    this.userForm.reset();
  }
}
```
