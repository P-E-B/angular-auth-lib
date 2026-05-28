/**
 * Auth-related contracts.
 *
 * The library treats the application's user record as an opaque value — it is
 * fetched from `userInformationUrl`, stored in the auth feature state, and
 * surfaced via {@link selectAuthUser}. The library never reads fields off it;
 * route authorization and post-login redirect are resolved through the
 * `canActivate` / `redirectAfterLogin` callbacks on {@link AuthModuleConfig}.
 */

/** Decoded JWT access token (and optional refresh token). */
export interface Token {
  token: string;
  /** Epoch milliseconds — kept primitive so NgRx serializability checks pass. */
  expiringDate: number;
  /** Optional long-lived refresh token returned alongside the access token. */
  refreshToken?: string;
}

/**
 * Credentials posted verbatim to `accessTokenUrl`. The library never reads
 * fields off this object, so consumers may dispatch
 * `AuthActions.logIn({ payload })` with any backend-specific shape; this
 * interface is exported as the common-case convenience.
 */
export interface AuthCredentials {
  email: string;
  password: string;
}
