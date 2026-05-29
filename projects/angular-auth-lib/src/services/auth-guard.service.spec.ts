import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, firstValueFrom } from 'rxjs';

import { authGuard } from './auth-guard.service';
import { AUTH_BEHAVIOR, AuthBehaviorConfig } from '../token';
import { AuthState, authFeature } from '../store/reducer';

describe('authGuard', () => {
  const route = {} as ActivatedRouteSnapshot;
  const stateFor = (url: string) => ({ url }) as RouterStateSnapshot;

  function setup(authState: AuthState, behavior: AuthBehaviorConfig) {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideMockStore({ initialState: { [authFeature.name]: authState } }),
        { provide: AUTH_BEHAVIOR, useValue: behavior }
      ]
    });
    const router = TestBed.inject(Router);
    const run = (state: RouterStateSnapshot) =>
      firstValueFrom(
        TestBed.runInInjectionContext(() => authGuard(route, state)) as Observable<boolean | UrlTree>
      );
    return { router, run };
  }

  it('returns true when authenticated and behavior.canActivate allows the route', async () => {
    const user = { id: 1 };
    const canActivate = jasmine.createSpy('canActivate').and.returnValue(true);
    const { run } = setup({ isAuthenticated: true, isLoading: false, user }, { canActivate });

    const state = stateFor('/dashboard');
    const result = await run(state);

    expect(result).toBeTrue();
    expect(canActivate).toHaveBeenCalledOnceWith(user, route, state);
  });

  it('redirects to the default "log-in" route with returnUrl when not authenticated', async () => {
    const canActivate = jasmine.createSpy('canActivate').and.returnValue(true);
    const { router, run } = setup(
      { isAuthenticated: false, isLoading: false, user: null },
      { canActivate }
    );

    const result = await run(stateFor('/dashboard'));

    expect(result).toBeInstanceOf(UrlTree);
    expect(router.serializeUrl(result as UrlTree)).toBe('/log-in?returnUrl=%2Fdashboard');
    expect(canActivate).not.toHaveBeenCalled();
  });

  it('redirects when authenticated but behavior.canActivate denies the route', async () => {
    const { router, run } = setup(
      { isAuthenticated: true, isLoading: false, user: { id: 1 } },
      { canActivate: () => false }
    );

    const result = await run(stateFor('/admin'));

    expect(result).toBeInstanceOf(UrlTree);
    expect(router.serializeUrl(result as UrlTree)).toBe('/log-in?returnUrl=%2Fadmin');
  });

  it('redirects to the configured behavior.loginRoute when set', async () => {
    const { router, run } = setup(
      { isAuthenticated: false, isLoading: false, user: null },
      { canActivate: () => true, loginRoute: '/auth/login' }
    );

    const result = await run(stateFor('/dashboard'));

    expect(result).toBeInstanceOf(UrlTree);
    expect(router.serializeUrl(result as UrlTree)).toBe('/auth/login?returnUrl=%2Fdashboard');
  });
});
