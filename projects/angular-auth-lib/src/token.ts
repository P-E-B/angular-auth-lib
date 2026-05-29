import { InjectionToken, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import type { Token } from './models/user.models';

/** API endpoint URLs consumed by {@link AuthService}. */
export interface AuthUrlsConfig {
  /** POST — exchanges credentials for an access (+ optional refresh) token. */
  accessTokenUrl: string;
  /** POST — exchanges `{ refresh }` for a fresh access token. */
  refreshTokenUrl?: string;
  /**
   * GET — returns the authenticated user record. Optional: when omitted the
   * login effect skips the fetch and `AuthState.user` stays `null`.
   */
  userInformationUrl?: string;
  /**
   * POST — invalidates the refresh token server-side on `logOut`. Optional:
   * when omitted logout is client-only (storage cleared, no network call).
   */
  logoutUrl?: string;
}

/**
 * Adapter for backends whose token endpoint doesn't return
 * `{ access, refresh? }`. Map the raw response into a {@link Token} yourself.
 *
 * @example OAuth2
 * ```ts
 * tokenAdapter: {
 *   parse: (raw: { access_token: string; refresh_token?: string; expires_in: number }) => ({
 *     token: raw.access_token,
 *     refreshToken: raw.refresh_token,
 *     expiringDate: Date.now() + raw.expires_in * 1000,
 *   }),
 *   buildRefreshBody: (refresh) => ({ grant_type: 'refresh_token', refresh_token: refresh }),
 * }
 * ```
 */
export interface AuthTokenAdapter {
  /** Map the raw login/refresh response body to a {@link Token}. */
  parse: (raw: unknown) => Token;
  /**
   * Build the POST body for `refreshTokenUrl` from the stored refresh token.
   * @default `(refresh) => ({ refresh })`
   */
  buildRefreshBody?: (refresh: string) => unknown;
}

/**
 * Application-supplied behaviour callbacks. The library treats the user record
 * as opaque (`unknown`); these callbacks let the host app derive routing
 * decisions from its own user shape.
 *
 * @typeParam TUser - The application's user type as returned by
 *                    `userInformationUrl`.
 */
export interface AuthBehaviorConfig<TUser = unknown> {
  /**
   * Route authorization predicate evaluated by {@link authGuard} for an
   * authenticated user. **Required** — there is no permissive default; supply
   * `() => true` explicitly if every authenticated user may access every
   * guarded route.
   */
  canActivate: (user: TUser | null, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => boolean;
  /**
   * URL to navigate to after a successful login when no `returnUrl` query
   * parameter was set by the guard.
   * @default `'/'`
   */
  redirectAfterLogin?: (user: TUser | null) => string;
  /**
   * Route the guard and the logout effect navigate to for unauthenticated
   * access.
   * @default `'log-in'`
   */
  loginRoute?: string;
  /**
   * Milliseconds before `Token.expiringDate` at which the interceptor
   * proactively refreshes instead of waiting for a 401.
   * @default `30_000`
   */
  refreshSkewMs?: number;
  /**
   * Build the auth header(s) attached to outgoing requests.
   * @default `(token) => ({ Authorization: \`Bearer ${token}\` })`
   */
  authHeader?: (accessToken: string) => Record<string, string>;
  /**
   * Additional origins (e.g. `'https://api.example.com'`) the interceptor
   * should attach the auth header to, beyond same-origin and the origins of
   * `urls.*`. Never list third-party origins you don't control.
   */
  allowedOrigins?: string[];
  /** See {@link AuthTokenAdapter}. */
  tokenAdapter?: AuthTokenAdapter;
}

export interface AuthModuleConfig<TUser = unknown> {
  urls: AuthUrlsConfig;
  behavior: AuthBehaviorConfig<TUser>;
}

/**
 * Pluggable token persistence. Default is `sessionStorage` in the browser and
 * an in-memory no-op under SSR. Supply `localStorage`, a cookie-backed
 * implementation, or a namespaced wrapper via
 * `{ provide: AUTH_TOKEN_STORAGE, useValue: ... }`.
 */
export type AuthTokenStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

const NOOP_STORAGE: AuthTokenStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

export const AUTH_API_URLS = new InjectionToken<AuthUrlsConfig>('Auth api urls');
export const AUTH_BEHAVIOR = new InjectionToken<AuthBehaviorConfig>('Auth behavior callbacks');
export const AUTH_TOKEN_STORAGE = new InjectionToken<AuthTokenStorage>('Auth token storage', {
  providedIn: 'root',
  factory: () => (isPlatformBrowser(inject(PLATFORM_ID)) ? sessionStorage : NOOP_STORAGE),
});
