import * as UserActions from './actions';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.models';

export interface AuthState {
    isAuthenticated: boolean;
    isSignUpLoading: boolean;
    isSendActivationCodeLoading: boolean;
    isUserActivated: boolean;
    isUserCreated: boolean;
    isLoginLoading: boolean;
    user: User;
    error: HttpErrorResponse;
    isPasswordBeingChanged: boolean;
    usersList: { id: number, firstName: string, lastName: string }[];
}

export const initialState: AuthState = {
    isAuthenticated: false,
    isSignUpLoading: false,
    isSendActivationCodeLoading: false,
    isUserActivated: null,
    isUserCreated: null,
    isLoginLoading: false,
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
            return {
                ...state,
                error: action.payload,
                isSignUpLoading: false,
                isUserCreated: false
            };
        case UserActions.AUTH_ACTIONS_TYPE.SIGN_UP_SUCCESS:
            return {
                ...state,
                error: null,
                isSignUpLoading: false,
                isUserCreated: true
            };
        case UserActions.AUTH_ACTIONS_TYPE.SEND_ACTIVATION_CODE:
            return {
                ...state,
                error: null,
                isSendActivationCodeLoading: true
            };
        case UserActions.AUTH_ACTIONS_TYPE.SEND_ACTIVATION_CODE_FAILURE:
            return {
                ...state,
                error: action.payload,
                isSendActivationCodeLoading: false,
                isUserActivated: false
            };
        case UserActions.AUTH_ACTIONS_TYPE.SEND_ACTIVATION_CODE_SUCCESS:
            return {
                ...state,
                error: null,
                isSendActivationCodeLoading: false,
                isUserActivated: true
            };

        case UserActions.AUTH_ACTIONS_TYPE.LOG_IN:
            return { ...state, error: null, isLoginLoading: true };
        case UserActions.AUTH_ACTIONS_TYPE.LOG_IN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                error: null,
                usersList: action.payload.usersList,
                isLoginLoading: false
            };
        case UserActions.AUTH_ACTIONS_TYPE.LOG_IN_FAILURE:
            return { ...state, error: action.payload, isLoginLoading: false };
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
        case UserActions.AUTH_ACTIONS_TYPE.RESET_AUTH_STATE:
            return initialState;
        default:
            return state;
    }
}
