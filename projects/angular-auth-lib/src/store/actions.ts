import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { Token } from '../models/user.models';

/**
 * NgRx action group for the auth feature.
 *
 * Dispatch via the grouped object:
 *   `store.dispatch(AuthActions.logIn({ payload: credentials }))`
 *
 * The `logIn` payload is `unknown` and is posted verbatim to `accessTokenUrl`;
 * the library never inspects it. Export {@link AuthCredentials} for the
 * common-case `{ email, password }` shape.
 */
export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        /**
         * Dispatched at bootstrap by `provideAuth()` to restore
         * `isAuthenticated` from a token already in storage. The follow-up
         * user fetch (if `userInformationUrl` is set) runs as an effect.
         */
        'Rehydrate': props<{ hasToken: boolean }>(),

        'Log In': props<{ payload: unknown }>(),
        'Log In Success': props<{ payload: { user: unknown } }>(),
        'Log In Failure': props<{ payload: HttpErrorResponse }>(),

        'Log Out': emptyProps(),

        'Refresh Token': emptyProps(),
        'Refresh Token Success': props<{ payload: Token }>(),
        'Refresh Token Failure': props<{ payload: HttpErrorResponse }>(),

        'Load User Information': emptyProps(),
        'Load User Information Success': props<{ payload: unknown }>(),
        'Load User Information Failure': props<{ payload: HttpErrorResponse }>(),

        'Update User': props<{ payload: unknown }>(),

        'Reset Auth State': emptyProps(),
    },
});
