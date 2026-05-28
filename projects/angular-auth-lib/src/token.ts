import { InjectionToken } from '@angular/core';
import type { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

/** API endpoint URLs consumed by {@link AuthService}. */
export interface AuthUrlsConfig {
  /** POST — exchanges credentials for `{ access, refresh? }`. */
  accessTokenUrl: string;
  /** POST — exchanges `{ refresh }` for a fresh `{ access, refresh? }`. */
  refreshTokenUrl?: string;
  /**
   * GET — returns the authenticated user record. Optional: when omitted the
   * login effect skips the fetch and `AuthState.user` stays `null`.
   */
  userInformationUrl?: string;
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
}

export interface AuthModuleConfig<TUser = unknown> {
  urls: AuthUrlsConfig;
  behavior: AuthBehaviorConfig<TUser>;
}

export const AUTH_API_URLS = new InjectionToken<AuthUrlsConfig>('Auth api urls');
export const AUTH_BEHAVIOR = new InjectionToken<AuthBehaviorConfig>('Auth behavior callbacks');
