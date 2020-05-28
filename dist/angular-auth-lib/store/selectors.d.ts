import { AuthState } from './reducer';
export declare const selectAuthState: import("@ngrx/store").MemoizedSelector<object, AuthState, import("@ngrx/store").DefaultProjectorFn<AuthState>>;
export declare const selectIsAuthenticated: import("@ngrx/store").MemoizedSelector<object, boolean, import("@ngrx/store").DefaultProjectorFn<boolean>>;
export declare const selectLogInError: import("@ngrx/store").MemoizedSelector<object, import("@angular/common/http").HttpErrorResponse, import("@ngrx/store").DefaultProjectorFn<import("@angular/common/http").HttpErrorResponse>>;
export declare const selectUser: import("@ngrx/store").MemoizedSelector<object, import("../public-api").User, import("@ngrx/store").DefaultProjectorFn<import("../public-api").User>>;
export declare const selectIsPasswordBeingChanged: import("@ngrx/store").MemoizedSelector<object, boolean, import("@ngrx/store").DefaultProjectorFn<boolean>>;
export declare const selectUsersList: import("@ngrx/store").MemoizedSelector<object, {
    id: number;
    firstName: string;
    lastName: string;
}[], import("@ngrx/store").DefaultProjectorFn<{
    id: number;
    firstName: string;
    lastName: string;
}[]>>;
export declare const selectIsSignUpLoading: import("@ngrx/store").MemoizedSelector<object, boolean, import("@ngrx/store").DefaultProjectorFn<boolean>>;
