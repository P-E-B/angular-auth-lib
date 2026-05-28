/**
 * @deprecated The demo app now uses standalone bootstrap (`bootstrapApplication`).
 * This file is kept only as a back-compat re-export shim for the `API_PREFIX`
 * constant, which moved to `./app.config`. Import from `./app.config` directly.
 *
 * The `AppModule` NgModule has been removed — see `main.ts` and `app.config.ts`.
 */
export { API_PREFIX, authModuleConfig } from './app.config';
