import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/reducer';
export declare class AuthGuard implements CanActivate {
    private store;
    private router;
    private platformId;
    constructor(store: Store<AuthState>, router: Router, platformId: any);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>;
}
