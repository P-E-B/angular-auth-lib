import * as UserActions from './actions';
export const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
    isPasswordBeingChanged: false,
    usersList: null
};
export function authReducer(state = initialState, action) {
    switch (action.type) {
        case UserActions.AUTH_ACTIONS_TYPE.SIGN_UP_FAILURE:
            return Object.assign(Object.assign({}, state), { error: action.payload });
        case UserActions.AUTH_ACTIONS_TYPE.LOG_IN_SUCCESS:
            return Object.assign(Object.assign({}, state), { isAuthenticated: true, user: action.payload.user, error: null, usersList: action.payload.usersList });
        case UserActions.AUTH_ACTIONS_TYPE.LOG_IN_FAILURE:
            return Object.assign(Object.assign({}, state), { error: action.payload });
        case UserActions.AUTH_ACTIONS_TYPE.LOG_OUT:
            return initialState;
        case UserActions.AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION_SUCCESS:
            const detailedUser = Object.assign(Object.assign({}, state.user), action.payload);
            return Object.assign(Object.assign({}, state), { user: detailedUser });
        case UserActions.AUTH_ACTIONS_TYPE.CHANGE_PASSWORD:
        case UserActions.AUTH_ACTIONS_TYPE.SEND_PASSWORD:
            return Object.assign(Object.assign({}, state), { isPasswordBeingChanged: true });
        case UserActions.AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_SUCCESS:
        case UserActions.AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_FAILURE:
        case UserActions.AUTH_ACTIONS_TYPE.SEND_PASSWORD_SUCCESS:
        case UserActions.AUTH_ACTIONS_TYPE.SEND_PASSWORD_FAILURE:
            return Object.assign(Object.assign({}, state), { isPasswordBeingChanged: false });
        default:
            return state;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItYXV0aC1saWIvIiwic291cmNlcyI6WyJzdG9yZS9yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxXQUFXLE1BQU0sV0FBVyxDQUFDO0FBWXpDLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBYztJQUNuQyxlQUFlLEVBQUUsS0FBSztJQUN0QixJQUFJLEVBQUUsSUFBSTtJQUNWLEtBQUssRUFBRSxJQUFJO0lBQ1gsc0JBQXNCLEVBQUUsS0FBSztJQUM3QixTQUFTLEVBQUUsSUFBSTtDQUNsQixDQUFDO0FBRUYsTUFBTSxVQUFVLFdBQVcsQ0FBQyxRQUFtQixZQUFZLEVBQUUsTUFBMkI7SUFDcEYsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ2pCLEtBQUssV0FBVyxDQUFDLGlCQUFpQixDQUFDLGVBQWU7WUFDOUMsdUNBQVksS0FBSyxLQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTyxJQUFHO1FBQy9DLEtBQUssV0FBVyxDQUFDLGlCQUFpQixDQUFDLGNBQWM7WUFDN0MsdUNBQVksS0FBSyxLQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFHO1FBQzVILEtBQUssV0FBVyxDQUFDLGlCQUFpQixDQUFDLGNBQWM7WUFDN0MsdUNBQVksS0FBSyxLQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTyxJQUFHO1FBQy9DLEtBQUssV0FBVyxDQUFDLGlCQUFpQixDQUFDLE9BQU87WUFDdEMsT0FBTyxZQUFZLENBQUM7UUFDeEIsS0FBSyxXQUFXLENBQUMsaUJBQWlCLENBQUMsNkJBQTZCO1lBQzVELE1BQU0sWUFBWSxtQ0FBUSxLQUFLLENBQUMsSUFBSSxHQUFLLE1BQU0sQ0FBQyxPQUFPLENBQUUsQ0FBQztZQUMxRCx1Q0FBWSxLQUFLLEtBQUUsSUFBSSxFQUFFLFlBQVksSUFBRztRQUM1QyxLQUFLLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7UUFDbkQsS0FBSyxXQUFXLENBQUMsaUJBQWlCLENBQUMsYUFBYTtZQUM1Qyx1Q0FBWSxLQUFLLEtBQUUsc0JBQXNCLEVBQUUsSUFBSSxJQUFHO1FBQ3RELEtBQUssV0FBVyxDQUFDLGlCQUFpQixDQUFDLHVCQUF1QixDQUFDO1FBQzNELEtBQUssV0FBVyxDQUFDLGlCQUFpQixDQUFDLHVCQUF1QixDQUFDO1FBQzNELEtBQUssV0FBVyxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDO1FBQ3pELEtBQUssV0FBVyxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQjtZQUNwRCx1Q0FBWSxLQUFLLEtBQUUsc0JBQXNCLEVBQUUsS0FBSyxJQUFHO1FBQ3ZEO1lBQ0ksT0FBTyxLQUFLLENBQUM7S0FDcEI7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVXNlckFjdGlvbnMgZnJvbSAnLi9hY3Rpb25zJztcbmltcG9ydCB7IEh0dHBFcnJvclJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL21vZGVscy91c2VyLm1vZGVscyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXV0aFN0YXRlIHtcbiAgICBpc0F1dGhlbnRpY2F0ZWQ6IGJvb2xlYW47XG4gICAgdXNlcjogVXNlcjtcbiAgICBlcnJvcjogSHR0cEVycm9yUmVzcG9uc2U7XG4gICAgaXNQYXNzd29yZEJlaW5nQ2hhbmdlZDogYm9vbGVhbjtcbiAgICB1c2Vyc0xpc3Q6IHsgaWQ6IG51bWJlciwgZmlyc3ROYW1lOiBzdHJpbmcsIGxhc3ROYW1lOiBzdHJpbmcgfVtdO1xufVxuXG5leHBvcnQgY29uc3QgaW5pdGlhbFN0YXRlOiBBdXRoU3RhdGUgPSB7XG4gICAgaXNBdXRoZW50aWNhdGVkOiBmYWxzZSxcbiAgICB1c2VyOiBudWxsLFxuICAgIGVycm9yOiBudWxsLFxuICAgIGlzUGFzc3dvcmRCZWluZ0NoYW5nZWQ6IGZhbHNlLFxuICAgIHVzZXJzTGlzdDogbnVsbFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGF1dGhSZWR1Y2VyKHN0YXRlOiBBdXRoU3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbjogVXNlckFjdGlvbnMuQWN0aW9ucykge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBVc2VyQWN0aW9ucy5BVVRIX0FDVElPTlNfVFlQRS5TSUdOX1VQX0ZBSUxVUkU6XG4gICAgICAgICAgICByZXR1cm4geyAuLi5zdGF0ZSwgZXJyb3I6IGFjdGlvbi5wYXlsb2FkIH07XG4gICAgICAgIGNhc2UgVXNlckFjdGlvbnMuQVVUSF9BQ1RJT05TX1RZUEUuTE9HX0lOX1NVQ0NFU1M6XG4gICAgICAgICAgICByZXR1cm4geyAuLi5zdGF0ZSwgaXNBdXRoZW50aWNhdGVkOiB0cnVlLCB1c2VyOiBhY3Rpb24ucGF5bG9hZC51c2VyLCBlcnJvcjogbnVsbCwgdXNlcnNMaXN0OiBhY3Rpb24ucGF5bG9hZC51c2Vyc0xpc3QgfTtcbiAgICAgICAgY2FzZSBVc2VyQWN0aW9ucy5BVVRIX0FDVElPTlNfVFlQRS5MT0dfSU5fRkFJTFVSRTpcbiAgICAgICAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBlcnJvcjogYWN0aW9uLnBheWxvYWQgfTtcbiAgICAgICAgY2FzZSBVc2VyQWN0aW9ucy5BVVRIX0FDVElPTlNfVFlQRS5MT0dfT1VUOlxuICAgICAgICAgICAgcmV0dXJuIGluaXRpYWxTdGF0ZTtcbiAgICAgICAgY2FzZSBVc2VyQWN0aW9ucy5BVVRIX0FDVElPTlNfVFlQRS5MT0FEX1VTRVJfSU5GT1JNQVRJT05fU1VDQ0VTUzpcbiAgICAgICAgICAgIGNvbnN0IGRldGFpbGVkVXNlciA9IHsgLi4uc3RhdGUudXNlciwgLi4uYWN0aW9uLnBheWxvYWQgfTtcbiAgICAgICAgICAgIHJldHVybiB7IC4uLnN0YXRlLCB1c2VyOiBkZXRhaWxlZFVzZXIgfTtcbiAgICAgICAgY2FzZSBVc2VyQWN0aW9ucy5BVVRIX0FDVElPTlNfVFlQRS5DSEFOR0VfUEFTU1dPUkQ6XG4gICAgICAgIGNhc2UgVXNlckFjdGlvbnMuQVVUSF9BQ1RJT05TX1RZUEUuU0VORF9QQVNTV09SRDpcbiAgICAgICAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBpc1Bhc3N3b3JkQmVpbmdDaGFuZ2VkOiB0cnVlIH07XG4gICAgICAgIGNhc2UgVXNlckFjdGlvbnMuQVVUSF9BQ1RJT05TX1RZUEUuQ0hBTkdFX1BBU1NXT1JEX1NVQ0NFU1M6XG4gICAgICAgIGNhc2UgVXNlckFjdGlvbnMuQVVUSF9BQ1RJT05TX1RZUEUuQ0hBTkdFX1BBU1NXT1JEX0ZBSUxVUkU6XG4gICAgICAgIGNhc2UgVXNlckFjdGlvbnMuQVVUSF9BQ1RJT05TX1RZUEUuU0VORF9QQVNTV09SRF9TVUNDRVNTOlxuICAgICAgICBjYXNlIFVzZXJBY3Rpb25zLkFVVEhfQUNUSU9OU19UWVBFLlNFTkRfUEFTU1dPUkRfRkFJTFVSRTpcbiAgICAgICAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBpc1Bhc3N3b3JkQmVpbmdDaGFuZ2VkOiBmYWxzZSB9O1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn1cbiJdfQ==