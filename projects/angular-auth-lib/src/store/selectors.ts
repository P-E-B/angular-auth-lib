import { createSelector } from '@ngrx/store';

import { authFeature } from './reducer';

export const { selectAuthState, selectIsAuthenticated } = authFeature;

/**
 * Typed user selector factory. The auth feature stores the user record as
 * `unknown`; call this once with your application's user type to get a
 * strongly-typed memoized selector.
 *
 * @example
 * ```ts
 * export const selectCurrentUser = selectAuthUser<MyUser>();
 * // …
 * readonly user = this.store.selectSignal(selectCurrentUser);
 * ```
 */
export const selectAuthUser = <TUser>() =>
    createSelector(authFeature.selectUser, (user): TUser | null => user as TUser | null);
