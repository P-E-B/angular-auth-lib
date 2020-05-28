import * as UserActions from './actions';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.models';
export interface AuthState {
    isAuthenticated: boolean;
    isSignUpLoading: boolean;
    user: User;
    error: HttpErrorResponse;
    isPasswordBeingChanged: boolean;
    usersList: {
        id: number;
        firstName: string;
        lastName: string;
    }[];
}
export declare const initialState: AuthState;
export declare function authReducer(state: AuthState, action: UserActions.Actions): AuthState;
