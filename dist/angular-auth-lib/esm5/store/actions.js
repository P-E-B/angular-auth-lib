export var AUTH_ACTIONS_TYPE;
(function (AUTH_ACTIONS_TYPE) {
    AUTH_ACTIONS_TYPE["OPEN_SIGN_UP_DIALOG"] = "[Auth] User wants to sign up";
    AUTH_ACTIONS_TYPE["SIGN_UP"] = "[Auth] User tries to sign up";
    AUTH_ACTIONS_TYPE["SIGN_UP_SUCCESS"] = "[Auth] Sign up success";
    AUTH_ACTIONS_TYPE["SIGN_UP_FAILURE"] = "[Auth] Sign up failure";
    AUTH_ACTIONS_TYPE["LOG_IN"] = "[Auth] User tries to log in";
    AUTH_ACTIONS_TYPE["LOG_IN_SUCCESS"] = "[Auth] Log in success";
    AUTH_ACTIONS_TYPE["LOG_IN_FAILURE"] = "[Auth] Log in failure";
    AUTH_ACTIONS_TYPE["LOG_OUT"] = "[Auth] User logs out";
    AUTH_ACTIONS_TYPE["LOAD_USER_INFORMATION"] = "[Auth] Loading of user information";
    AUTH_ACTIONS_TYPE["LOAD_USER_INFORMATION_SUCCESS"] = "[Auth] Loading of user information success";
    AUTH_ACTIONS_TYPE["LOAD_USER_INFORMATION_FAILURE"] = "[Auth] Loading of user information failure";
    AUTH_ACTIONS_TYPE["CHANGE_PASSWORD"] = "[Auth] User changes his password";
    AUTH_ACTIONS_TYPE["CHANGE_PASSWORD_SUCCESS"] = "[Auth] Password change success";
    AUTH_ACTIONS_TYPE["CHANGE_PASSWORD_FAILURE"] = "[Auth] Password change failure";
    AUTH_ACTIONS_TYPE["OPEN_FORGOTTEN_PASSWORD_DIALOG"] = "[Auth] User opens dialog for password resetting";
    AUTH_ACTIONS_TYPE["SEND_PASSWORD"] = "[Auth] User has asked for having back a new password";
    AUTH_ACTIONS_TYPE["SEND_PASSWORD_SUCCESS"] = "[Auth] User has received his password";
    AUTH_ACTIONS_TYPE["SEND_PASSWORD_FAILURE"] = "[Auth] Error in the process of sending the password to the user";
})(AUTH_ACTIONS_TYPE || (AUTH_ACTIONS_TYPE = {}));
var OpenSignUpDialog = /** @class */ (function () {
    function OpenSignUpDialog() {
        this.type = AUTH_ACTIONS_TYPE.OPEN_SIGN_UP_DIALOG;
    }
    return OpenSignUpDialog;
}());
export { OpenSignUpDialog };
var SignUp = /** @class */ (function () {
    function SignUp(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.SIGN_UP;
    }
    return SignUp;
}());
export { SignUp };
var SignUpSuccess = /** @class */ (function () {
    function SignUpSuccess() {
        this.type = AUTH_ACTIONS_TYPE.SIGN_UP_SUCCESS;
    }
    return SignUpSuccess;
}());
export { SignUpSuccess };
var SignUpFailure = /** @class */ (function () {
    function SignUpFailure(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.SIGN_UP_FAILURE;
    }
    return SignUpFailure;
}());
export { SignUpFailure };
var LogIn = /** @class */ (function () {
    function LogIn(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.LOG_IN;
    }
    return LogIn;
}());
export { LogIn };
var LogInSuccess = /** @class */ (function () {
    function LogInSuccess(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.LOG_IN_SUCCESS;
    }
    return LogInSuccess;
}());
export { LogInSuccess };
var LogInFailure = /** @class */ (function () {
    function LogInFailure(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.LOG_IN_FAILURE;
    }
    return LogInFailure;
}());
export { LogInFailure };
var LogOut = /** @class */ (function () {
    function LogOut() {
        this.type = AUTH_ACTIONS_TYPE.LOG_OUT;
    }
    return LogOut;
}());
export { LogOut };
var LoadUserInformation = /** @class */ (function () {
    function LoadUserInformation() {
        this.type = AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION;
    }
    return LoadUserInformation;
}());
export { LoadUserInformation };
var LoadUserInformationSuccess = /** @class */ (function () {
    function LoadUserInformationSuccess(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION_SUCCESS;
    }
    return LoadUserInformationSuccess;
}());
export { LoadUserInformationSuccess };
var LoadUserInformationFailure = /** @class */ (function () {
    function LoadUserInformationFailure(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION_FAILURE;
    }
    return LoadUserInformationFailure;
}());
export { LoadUserInformationFailure };
var ChangePassword = /** @class */ (function () {
    function ChangePassword(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.CHANGE_PASSWORD;
    }
    return ChangePassword;
}());
export { ChangePassword };
var ChangePasswordSuccess = /** @class */ (function () {
    function ChangePasswordSuccess() {
        this.type = AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_SUCCESS;
    }
    return ChangePasswordSuccess;
}());
export { ChangePasswordSuccess };
var ChangePasswordFailure = /** @class */ (function () {
    function ChangePasswordFailure(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_FAILURE;
    }
    return ChangePasswordFailure;
}());
export { ChangePasswordFailure };
var OpenForgottenPasswordDialog = /** @class */ (function () {
    function OpenForgottenPasswordDialog() {
        this.type = AUTH_ACTIONS_TYPE.OPEN_FORGOTTEN_PASSWORD_DIALOG;
    }
    return OpenForgottenPasswordDialog;
}());
export { OpenForgottenPasswordDialog };
var SendPassword = /** @class */ (function () {
    function SendPassword(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.SEND_PASSWORD;
    }
    return SendPassword;
}());
export { SendPassword };
var SendPasswordSuccess = /** @class */ (function () {
    function SendPasswordSuccess() {
        this.type = AUTH_ACTIONS_TYPE.SEND_PASSWORD_SUCCESS;
    }
    return SendPasswordSuccess;
}());
export { SendPasswordSuccess };
var SendPasswordFailure = /** @class */ (function () {
    function SendPasswordFailure(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.SEND_PASSWORD_FAILURE;
    }
    return SendPasswordFailure;
}());
export { SendPasswordFailure };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItYXV0aC1saWIvIiwic291cmNlcyI6WyJzdG9yZS9hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE1BQU0sQ0FBTixJQUFZLGlCQXdCWDtBQXhCRCxXQUFZLGlCQUFpQjtJQUN6Qix5RUFBb0QsQ0FBQTtJQUNwRCw2REFBd0MsQ0FBQTtJQUN4QywrREFBMEMsQ0FBQTtJQUMxQywrREFBMEMsQ0FBQTtJQUUxQywyREFBc0MsQ0FBQTtJQUN0Qyw2REFBd0MsQ0FBQTtJQUN4Qyw2REFBd0MsQ0FBQTtJQUV4QyxxREFBZ0MsQ0FBQTtJQUVoQyxpRkFBNEQsQ0FBQTtJQUM1RCxpR0FBNEUsQ0FBQTtJQUM1RSxpR0FBNEUsQ0FBQTtJQUU1RSx5RUFBb0QsQ0FBQTtJQUNwRCwrRUFBMEQsQ0FBQTtJQUMxRCwrRUFBMEQsQ0FBQTtJQUUxRCx1R0FBa0YsQ0FBQTtJQUNsRiwyRkFBc0UsQ0FBQTtJQUN0RSxvRkFBK0QsQ0FBQTtJQUMvRCw4R0FBeUYsQ0FBQTtBQUM3RixDQUFDLEVBeEJXLGlCQUFpQixLQUFqQixpQkFBaUIsUUF3QjVCO0FBRUQ7SUFBQTtRQUNhLFNBQUksR0FBRyxpQkFBaUIsQ0FBQyxtQkFBbUIsQ0FBQztJQUMxRCxDQUFDO0lBQUQsdUJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQzs7QUFFRDtJQUVJLGdCQUFtQixPQUFzQjtRQUF0QixZQUFPLEdBQVAsT0FBTyxDQUFlO1FBRGhDLFNBQUksR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7SUFDRSxDQUFDO0lBQ2pELGFBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQzs7QUFFRDtJQUFBO1FBQ2EsU0FBSSxHQUFHLGlCQUFpQixDQUFDLGVBQWUsQ0FBQztJQUN0RCxDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQzs7QUFFRDtJQUVJLHVCQUFtQixPQUEwQjtRQUExQixZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQURwQyxTQUFJLEdBQUcsaUJBQWlCLENBQUMsZUFBZSxDQUFDO0lBQ0YsQ0FBQztJQUNyRCxvQkFBQztBQUFELENBQUMsQUFIRCxJQUdDOztBQUVEO0lBRUksZUFBb0IsT0FBc0I7UUFBdEIsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQURqQyxTQUFJLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDO0lBQ0ksQ0FBQztJQUNsRCxZQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7O0FBRUQ7SUFFSSxzQkFBbUIsT0FHbEI7UUFIa0IsWUFBTyxHQUFQLE9BQU8sQ0FHekI7UUFKUSxTQUFJLEdBQUcsaUJBQWlCLENBQUMsY0FBYyxDQUFDO0lBSTdDLENBQUM7SUFDVCxtQkFBQztBQUFELENBQUMsQUFORCxJQU1DOztBQUVEO0lBRUksc0JBQW1CLE9BQTBCO1FBQTFCLFlBQU8sR0FBUCxPQUFPLENBQW1CO1FBRHBDLFNBQUksR0FBRyxpQkFBaUIsQ0FBQyxjQUFjLENBQUM7SUFDRCxDQUFDO0lBQ3JELG1CQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7O0FBRUQ7SUFBQTtRQUNhLFNBQUksR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7SUFDOUMsQ0FBQztJQUFELGFBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQzs7QUFFRDtJQUFBO1FBQ2EsU0FBSSxHQUFHLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDO0lBQzVELENBQUM7SUFBRCwwQkFBQztBQUFELENBQUMsQUFGRCxJQUVDOztBQUVEO0lBRUksb0NBQW1CLE9BQWE7UUFBYixZQUFPLEdBQVAsT0FBTyxDQUFNO1FBRHZCLFNBQUksR0FBRyxpQkFBaUIsQ0FBQyw2QkFBNkIsQ0FBQztJQUM3QixDQUFDO0lBQ3hDLGlDQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7O0FBRUQ7SUFFSSxvQ0FBbUIsT0FBMEI7UUFBMUIsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7UUFEcEMsU0FBSSxHQUFHLGlCQUFpQixDQUFDLDZCQUE2QixDQUFDO0lBQ2hCLENBQUM7SUFDckQsaUNBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQzs7QUFFRDtJQUVJLHdCQUFtQixPQUEwRDtRQUExRCxZQUFPLEdBQVAsT0FBTyxDQUFtRDtRQURwRSxTQUFJLEdBQUcsaUJBQWlCLENBQUMsZUFBZSxDQUFDO0lBQzhCLENBQUM7SUFDckYscUJBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQzs7QUFFRDtJQUFBO1FBQ2EsU0FBSSxHQUFHLGlCQUFpQixDQUFDLHVCQUF1QixDQUFDO0lBQzlELENBQUM7SUFBRCw0QkFBQztBQUFELENBQUMsQUFGRCxJQUVDOztBQUVEO0lBRUksK0JBQW1CLE9BQTBCO1FBQTFCLFlBQU8sR0FBUCxPQUFPLENBQW1CO1FBRHBDLFNBQUksR0FBRyxpQkFBaUIsQ0FBQyx1QkFBdUIsQ0FBQztJQUNWLENBQUM7SUFDckQsNEJBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQzs7QUFFRDtJQUFBO1FBQ2EsU0FBSSxHQUFHLGlCQUFpQixDQUFDLDhCQUE4QixDQUFDO0lBQ3JFLENBQUM7SUFBRCxrQ0FBQztBQUFELENBQUMsQUFGRCxJQUVDOztBQUVEO0lBRUksc0JBQW1CLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBRHpCLFNBQUksR0FBRyxpQkFBaUIsQ0FBQyxhQUFhLENBQUM7SUFDWCxDQUFDO0lBQzFDLG1CQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7O0FBRUQ7SUFBQTtRQUNhLFNBQUksR0FBRyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQztJQUM1RCxDQUFDO0lBQUQsMEJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQzs7QUFFRDtJQUVJLDZCQUFtQixPQUEwQjtRQUExQixZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQURwQyxTQUFJLEdBQUcsaUJBQWlCLENBQUMscUJBQXFCLENBQUM7SUFDUixDQUFDO0lBQ3JELDBCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9tb2RlbHMvdXNlci5tb2RlbHMnO1xuXG5leHBvcnQgZW51bSBBVVRIX0FDVElPTlNfVFlQRSB7XG4gICAgT1BFTl9TSUdOX1VQX0RJQUxPRyA9ICdbQXV0aF0gVXNlciB3YW50cyB0byBzaWduIHVwJyxcbiAgICBTSUdOX1VQID0gJ1tBdXRoXSBVc2VyIHRyaWVzIHRvIHNpZ24gdXAnLFxuICAgIFNJR05fVVBfU1VDQ0VTUyA9ICdbQXV0aF0gU2lnbiB1cCBzdWNjZXNzJyxcbiAgICBTSUdOX1VQX0ZBSUxVUkUgPSAnW0F1dGhdIFNpZ24gdXAgZmFpbHVyZScsXG5cbiAgICBMT0dfSU4gPSAnW0F1dGhdIFVzZXIgdHJpZXMgdG8gbG9nIGluJyxcbiAgICBMT0dfSU5fU1VDQ0VTUyA9ICdbQXV0aF0gTG9nIGluIHN1Y2Nlc3MnLFxuICAgIExPR19JTl9GQUlMVVJFID0gJ1tBdXRoXSBMb2cgaW4gZmFpbHVyZScsXG5cbiAgICBMT0dfT1VUID0gJ1tBdXRoXSBVc2VyIGxvZ3Mgb3V0JyxcblxuICAgIExPQURfVVNFUl9JTkZPUk1BVElPTiA9ICdbQXV0aF0gTG9hZGluZyBvZiB1c2VyIGluZm9ybWF0aW9uJyxcbiAgICBMT0FEX1VTRVJfSU5GT1JNQVRJT05fU1VDQ0VTUyA9ICdbQXV0aF0gTG9hZGluZyBvZiB1c2VyIGluZm9ybWF0aW9uIHN1Y2Nlc3MnLFxuICAgIExPQURfVVNFUl9JTkZPUk1BVElPTl9GQUlMVVJFID0gJ1tBdXRoXSBMb2FkaW5nIG9mIHVzZXIgaW5mb3JtYXRpb24gZmFpbHVyZScsXG5cbiAgICBDSEFOR0VfUEFTU1dPUkQgPSAnW0F1dGhdIFVzZXIgY2hhbmdlcyBoaXMgcGFzc3dvcmQnLFxuICAgIENIQU5HRV9QQVNTV09SRF9TVUNDRVNTID0gJ1tBdXRoXSBQYXNzd29yZCBjaGFuZ2Ugc3VjY2VzcycsXG4gICAgQ0hBTkdFX1BBU1NXT1JEX0ZBSUxVUkUgPSAnW0F1dGhdIFBhc3N3b3JkIGNoYW5nZSBmYWlsdXJlJyxcblxuICAgIE9QRU5fRk9SR09UVEVOX1BBU1NXT1JEX0RJQUxPRyA9ICdbQXV0aF0gVXNlciBvcGVucyBkaWFsb2cgZm9yIHBhc3N3b3JkIHJlc2V0dGluZycsXG4gICAgU0VORF9QQVNTV09SRCA9ICdbQXV0aF0gVXNlciBoYXMgYXNrZWQgZm9yIGhhdmluZyBiYWNrIGEgbmV3IHBhc3N3b3JkJyxcbiAgICBTRU5EX1BBU1NXT1JEX1NVQ0NFU1MgPSAnW0F1dGhdIFVzZXIgaGFzIHJlY2VpdmVkIGhpcyBwYXNzd29yZCcsXG4gICAgU0VORF9QQVNTV09SRF9GQUlMVVJFID0gJ1tBdXRoXSBFcnJvciBpbiB0aGUgcHJvY2VzcyBvZiBzZW5kaW5nIHRoZSBwYXNzd29yZCB0byB0aGUgdXNlcidcbn1cblxuZXhwb3J0IGNsYXNzIE9wZW5TaWduVXBEaWFsb2cgaW1wbGVtZW50cyBBY3Rpb24ge1xuICAgIHJlYWRvbmx5IHR5cGUgPSBBVVRIX0FDVElPTlNfVFlQRS5PUEVOX1NJR05fVVBfRElBTE9HO1xufVxuXG5leHBvcnQgY2xhc3MgU2lnblVwIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgICByZWFkb25seSB0eXBlID0gQVVUSF9BQ1RJT05TX1RZUEUuU0lHTl9VUDtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF5bG9hZDogUGFydGlhbDxVc2VyPikge31cbn1cblxuZXhwb3J0IGNsYXNzIFNpZ25VcFN1Y2Nlc3MgaW1wbGVtZW50cyBBY3Rpb24ge1xuICAgIHJlYWRvbmx5IHR5cGUgPSBBVVRIX0FDVElPTlNfVFlQRS5TSUdOX1VQX1NVQ0NFU1M7XG59XG5cbmV4cG9ydCBjbGFzcyBTaWduVXBGYWlsdXJlIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgICByZWFkb25seSB0eXBlID0gQVVUSF9BQ1RJT05TX1RZUEUuU0lHTl9VUF9GQUlMVVJFO1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXlsb2FkOiBIdHRwRXJyb3JSZXNwb25zZSkge31cbn1cblxuZXhwb3J0IGNsYXNzIExvZ0luIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgICByZWFkb25seSB0eXBlID0gQVVUSF9BQ1RJT05TX1RZUEUuTE9HX0lOO1xuICAgIGNvbnN0cnVjdG9yIChwdWJsaWMgcGF5bG9hZDogUGFydGlhbDxVc2VyPikge31cbn1cblxuZXhwb3J0IGNsYXNzIExvZ0luU3VjY2VzcyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gICAgcmVhZG9ubHkgdHlwZSA9IEFVVEhfQUNUSU9OU19UWVBFLkxPR19JTl9TVUNDRVNTO1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXlsb2FkOiB7XG4gICAgICAgIHVzZXI6IFVzZXIsXG4gICAgICAgIHVzZXJzTGlzdDogeyBpZDogbnVtYmVyLCBmaXJzdE5hbWU6IHN0cmluZywgbGFzdE5hbWU6IHN0cmluZyB9W11cbiAgICB9KSB7fVxufVxuXG5leHBvcnQgY2xhc3MgTG9nSW5GYWlsdXJlIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgICByZWFkb25seSB0eXBlID0gQVVUSF9BQ1RJT05TX1RZUEUuTE9HX0lOX0ZBSUxVUkU7XG4gICAgY29uc3RydWN0b3IocHVibGljIHBheWxvYWQ6IEh0dHBFcnJvclJlc3BvbnNlKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgTG9nT3V0IGltcGxlbWVudHMgQWN0aW9uIHtcbiAgICByZWFkb25seSB0eXBlID0gQVVUSF9BQ1RJT05TX1RZUEUuTE9HX09VVDtcbn1cblxuZXhwb3J0IGNsYXNzIExvYWRVc2VySW5mb3JtYXRpb24gaW1wbGVtZW50cyBBY3Rpb24ge1xuICAgIHJlYWRvbmx5IHR5cGUgPSBBVVRIX0FDVElPTlNfVFlQRS5MT0FEX1VTRVJfSU5GT1JNQVRJT047XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkVXNlckluZm9ybWF0aW9uU3VjY2VzcyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gICAgcmVhZG9ubHkgdHlwZSA9IEFVVEhfQUNUSU9OU19UWVBFLkxPQURfVVNFUl9JTkZPUk1BVElPTl9TVUNDRVNTO1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXlsb2FkOiBVc2VyKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgTG9hZFVzZXJJbmZvcm1hdGlvbkZhaWx1cmUgaW1wbGVtZW50cyBBY3Rpb24ge1xuICAgIHJlYWRvbmx5IHR5cGUgPSBBVVRIX0FDVElPTlNfVFlQRS5MT0FEX1VTRVJfSU5GT1JNQVRJT05fRkFJTFVSRTtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF5bG9hZDogSHR0cEVycm9yUmVzcG9uc2UpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBDaGFuZ2VQYXNzd29yZCBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gICAgcmVhZG9ubHkgdHlwZSA9IEFVVEhfQUNUSU9OU19UWVBFLkNIQU5HRV9QQVNTV09SRDtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF5bG9hZDogeyBjdXJyZW50UGFzc3dvcmQ6IHN0cmluZywgbmV4dFBhc3N3b3JkOiBzdHJpbmcgfSkge31cbn1cblxuZXhwb3J0IGNsYXNzIENoYW5nZVBhc3N3b3JkU3VjY2VzcyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gICAgcmVhZG9ubHkgdHlwZSA9IEFVVEhfQUNUSU9OU19UWVBFLkNIQU5HRV9QQVNTV09SRF9TVUNDRVNTO1xufVxuXG5leHBvcnQgY2xhc3MgQ2hhbmdlUGFzc3dvcmRGYWlsdXJlIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgICByZWFkb25seSB0eXBlID0gQVVUSF9BQ1RJT05TX1RZUEUuQ0hBTkdFX1BBU1NXT1JEX0ZBSUxVUkU7XG4gICAgY29uc3RydWN0b3IocHVibGljIHBheWxvYWQ6IEh0dHBFcnJvclJlc3BvbnNlKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgT3BlbkZvcmdvdHRlblBhc3N3b3JkRGlhbG9nIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgICByZWFkb25seSB0eXBlID0gQVVUSF9BQ1RJT05TX1RZUEUuT1BFTl9GT1JHT1RURU5fUEFTU1dPUkRfRElBTE9HO1xufVxuXG5leHBvcnQgY2xhc3MgU2VuZFBhc3N3b3JkIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgICByZWFkb25seSB0eXBlID0gQVVUSF9BQ1RJT05TX1RZUEUuU0VORF9QQVNTV09SRDtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF5bG9hZDogc3RyaW5nKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgU2VuZFBhc3N3b3JkU3VjY2VzcyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gICAgcmVhZG9ubHkgdHlwZSA9IEFVVEhfQUNUSU9OU19UWVBFLlNFTkRfUEFTU1dPUkRfU1VDQ0VTUztcbn1cblxuZXhwb3J0IGNsYXNzIFNlbmRQYXNzd29yZEZhaWx1cmUgaW1wbGVtZW50cyBBY3Rpb24ge1xuICAgIHJlYWRvbmx5IHR5cGUgPSBBVVRIX0FDVElPTlNfVFlQRS5TRU5EX1BBU1NXT1JEX0ZBSUxVUkU7XG4gICAgY29uc3RydWN0b3IocHVibGljIHBheWxvYWQ6IEh0dHBFcnJvclJlc3BvbnNlKSB7fVxufVxuXG5leHBvcnQgdHlwZSBBY3Rpb25zID0gT3BlblNpZ25VcERpYWxvZ1xuICAgIHwgU2lnblVwXG4gICAgfCBTaWduVXBTdWNjZXNzXG4gICAgfCBTaWduVXBGYWlsdXJlXG4gICAgfCBMb2dJblxuICAgIHwgTG9nSW5TdWNjZXNzXG4gICAgfCBMb2dJbkZhaWx1cmVcbiAgICB8IExvZ091dFxuICAgIHwgTG9hZFVzZXJJbmZvcm1hdGlvblxuICAgIHwgTG9hZFVzZXJJbmZvcm1hdGlvblN1Y2Nlc3NcbiAgICB8IExvYWRVc2VySW5mb3JtYXRpb25GYWlsdXJlXG4gICAgfCBDaGFuZ2VQYXNzd29yZFxuICAgIHwgQ2hhbmdlUGFzc3dvcmRTdWNjZXNzXG4gICAgfCBDaGFuZ2VQYXNzd29yZEZhaWx1cmVcbiAgICB8IE9wZW5Gb3Jnb3R0ZW5QYXNzd29yZERpYWxvZ1xuICAgIHwgU2VuZFBhc3N3b3JkXG4gICAgfCBTZW5kUGFzc3dvcmRTdWNjZXNzXG4gICAgfCBTZW5kUGFzc3dvcmRGYWlsdXJlO1xuIl19