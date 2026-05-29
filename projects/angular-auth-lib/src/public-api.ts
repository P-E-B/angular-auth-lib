/*
 * Public API Surface of angular-auth-lib
 */

export { AuthService } from './services/auth.service';
export { authGuard } from './services/auth-guard.service';
export { tokenInterceptor } from './services/token.interceptor';
export { AuthActions } from './store/actions';
export { authFeature } from './store/reducer';
export type { AuthState } from './store/reducer';
export { selectAuthState, selectIsAuthenticated, selectIsLoading, selectAuthUser } from './store/selectors';
export type { Token, AuthCredentials } from './models/user.models';
export type { AuthModuleConfig, AuthUrlsConfig, AuthBehaviorConfig, AuthTokenAdapter, AuthTokenStorage } from './token';
export { AUTH_API_URLS, AUTH_BEHAVIOR, AUTH_TOKEN_STORAGE } from './token';
export { provideAuth } from './provide-auth';
