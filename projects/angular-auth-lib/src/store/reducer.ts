import * as UserActions from './actions';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.models';

export interface AuthState {
    isAuthenticated: boolean;
    isSignUpLoading: boolean;
    user: User;
    error: HttpErrorResponse;
    isPasswordBeingChanged: boolean;
    usersList: { id: number, firstName: string, lastName: string }[];
}

export const initialState: AuthState = {
    isAuthenticated: false,
    isSignUpLoading: false,
    user: null,
    error: null,
    isPasswordBeingChanged: false,
    usersList: null
};

export function authReducer(state: AuthState = initialState, action: UserActions.Actions) {
    switch (action.type) {
        case UserActions.AUTH_ACTIONS_TYPE.SIGN_UP:
            return { ...state, error: null, isSignUpLoading: true };
        case UserActions.AUTH_ACTIONS_TYPE.SIGN_UP_FAILURE:
            return { ...state, error: action.payload, isSignUpLoading: false };
        case UserActions.AUTH_ACTIONS_TYPE.SIGN_UP_SUCCESS:
            return { ...state, error: null, isSignUpLoading: false };
        case UserActions.AUTH_ACTIONS_TYPE.LOG_IN_SUCCESS:
            return { ...state, isAuthenticated: true, user: action.payload.user, error: null, usersList: action.payload.usersList };
        case UserActions.AUTH_ACTIONS_TYPE.LOG_IN_FAILURE:
            return { ...state, error: action.payload };
        case UserActions.AUTH_ACTIONS_TYPE.LOG_OUT:
            return initialState;
        case UserActions.AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION_SUCCESS:
            const detailedUser = { ...state.user, ...action.payload };
            return { ...state, user: detailedUser };
        case UserActions.AUTH_ACTIONS_TYPE.CHANGE_PASSWORD:
        case UserActions.AUTH_ACTIONS_TYPE.SEND_PASSWORD:
            return { ...state, isPasswordBeingChanged: true };
        case UserActions.AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_SUCCESS:
        case UserActions.AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_FAILURE:
        case UserActions.AUTH_ACTIONS_TYPE.SEND_PASSWORD_SUCCESS:
        case UserActions.AUTH_ACTIONS_TYPE.SEND_PASSWORD_FAILURE:
            return { ...state, isPasswordBeingChanged: false };
        case UserActions.AUTH_ACTIONS_TYPE.UPDATE_USER:
            return { ...state, user: { ...state.user, ...action.payload }};
        default:
            return state;
    }
}
