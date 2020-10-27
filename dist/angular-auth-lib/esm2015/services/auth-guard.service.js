import { __decorate, __param } from "tslib";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { map, withLatestFrom } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { selectUser, selectIsAuthenticated } from '../store/selectors';
import { isPlatformBrowser } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@angular/router";
let AuthGuard = class AuthGuard {
    constructor(store, router, platformId) {
        this.store = store;
        this.router = router;
        this.platformId = platformId;
    }
    canActivate(route, state) {
        return this.store.pipe(select(selectUser), withLatestFrom(this.store.pipe(select(selectIsAuthenticated))), map(([user, isAuthenticated]) => {
            if (user && user.allowedUrls.includes(route.routeConfig.path) && isAuthenticated) {
                return true;
            }
            else {
                if (user && user.allowedUrls.includes(route.routeConfig.path) && isPlatformBrowser(this.platformId)) {
                    sessionStorage.setItem('redirectedUrlAfterLogIn', state.url);
                }
                this.router.navigate(['log-in']);
                return false;
            }
        }));
    }
};
AuthGuard.ctorParameters = () => [
    { type: Store },
    { type: Router },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
AuthGuard.ɵprov = i0.ɵɵdefineInjectable({ factory: function AuthGuard_Factory() { return new AuthGuard(i0.ɵɵinject(i1.Store), i0.ɵɵinject(i2.Router), i0.ɵɵinject(i0.PLATFORM_ID)); }, token: AuthGuard, providedIn: "root" });
AuthGuard = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(2, Inject(PLATFORM_ID))
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1ndWFyZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1hdXRoLWxpYi8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2F1dGgtZ3VhcmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLHNCQUFzQixFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHaEUsT0FBTyxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUU1QyxPQUFPLEVBQUUsVUFBVSxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFLcEQsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBUztJQUVwQixZQUNVLEtBQXVCLEVBQ3ZCLE1BQWMsRUFDTyxVQUFlO1FBRnBDLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3ZCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDTyxlQUFVLEdBQVYsVUFBVSxDQUFLO0lBQzFDLENBQUM7SUFFTCxXQUFXLENBQUMsS0FBNkIsRUFBRSxLQUEwQjtRQUNuRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNwQixNQUFNLENBQUMsVUFBVSxDQUFDLEVBQ2xCLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLEVBQzlELEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBa0IsRUFBRSxFQUFFO1lBQy9DLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksZUFBZSxFQUFFO2dCQUNoRixPQUFPLElBQUksQ0FBQzthQUNiO2lCQUFNO2dCQUNMLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUNuRyxjQUFjLENBQUMsT0FBTyxDQUFDLHlCQUF5QixFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDOUQ7Z0JBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxPQUFPLEtBQUssQ0FBQzthQUNkO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBOztZQXRCa0IsS0FBSztZQUNKLE1BQU07NENBQ3JCLE1BQU0sU0FBQyxXQUFXOzs7QUFMVixTQUFTO0lBSHJCLFVBQVUsQ0FBQztRQUNSLFVBQVUsRUFBRSxNQUFNO0tBQ3JCLENBQUM7SUFNRyxXQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtHQUxYLFNBQVMsQ0F5QnJCO1NBekJZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBDYW5BY3RpdmF0ZSwgUm91dGVyU3RhdGVTbmFwc2hvdCwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCB3aXRoTGF0ZXN0RnJvbSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN0b3JlLCBzZWxlY3QgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5cbmltcG9ydCB7IHNlbGVjdFVzZXIsIHNlbGVjdElzQXV0aGVudGljYXRlZCB9IGZyb20gJy4uL3N0b3JlL3NlbGVjdG9ycyc7XG5pbXBvcnQgeyBBdXRoU3RhdGUgfSBmcm9tICcuLi9zdG9yZS9yZWR1Y2VyJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9tb2RlbHMvdXNlci5tb2RlbHMnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHN0b3JlOiBTdG9yZTxBdXRoU3RhdGU+LFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnksXG4gICkgeyB9XG5cbiAgY2FuQWN0aXZhdGUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUucGlwZShcbiAgICAgIHNlbGVjdChzZWxlY3RVc2VyKSxcbiAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuc3RvcmUucGlwZShzZWxlY3Qoc2VsZWN0SXNBdXRoZW50aWNhdGVkKSkpLFxuICAgICAgbWFwKChbdXNlciwgaXNBdXRoZW50aWNhdGVkXTogW1VzZXIsIGJvb2xlYW5dKSA9PiB7XG4gICAgICAgIGlmICh1c2VyICYmIHVzZXIuYWxsb3dlZFVybHMuaW5jbHVkZXMocm91dGUucm91dGVDb25maWcucGF0aCkgJiYgaXNBdXRoZW50aWNhdGVkKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHVzZXIgJiYgdXNlci5hbGxvd2VkVXJscy5pbmNsdWRlcyhyb3V0ZS5yb3V0ZUNvbmZpZy5wYXRoKSAmJiBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdyZWRpcmVjdGVkVXJsQWZ0ZXJMb2dJbicsIHN0YXRlLnVybCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnbG9nLWluJ10pO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=