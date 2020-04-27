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
export class OpenSignUpDialog {
    constructor() {
        this.type = AUTH_ACTIONS_TYPE.OPEN_SIGN_UP_DIALOG;
    }
}
export class SignUp {
    constructor(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.SIGN_UP;
    }
}
export class SignUpSuccess {
    constructor() {
        this.type = AUTH_ACTIONS_TYPE.SIGN_UP_SUCCESS;
    }
}
export class SignUpFailure {
    constructor(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.SIGN_UP_FAILURE;
    }
}
export class LogIn {
    constructor(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.LOG_IN;
    }
}
export class LogInSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.LOG_IN_SUCCESS;
    }
}
export class LogInFailure {
    constructor(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.LOG_IN_FAILURE;
    }
}
export class LogOut {
    constructor() {
        this.type = AUTH_ACTIONS_TYPE.LOG_OUT;
    }
}
export class LoadUserInformation {
    constructor() {
        this.type = AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION;
    }
}
export class LoadUserInformationSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION_SUCCESS;
    }
}
export class LoadUserInformationFailure {
    constructor(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.LOAD_USER_INFORMATION_FAILURE;
    }
}
export class ChangePassword {
    constructor(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.CHANGE_PASSWORD;
    }
}
export class ChangePasswordSuccess {
    constructor() {
        this.type = AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_SUCCESS;
    }
}
export class ChangePasswordFailure {
    constructor(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.CHANGE_PASSWORD_FAILURE;
    }
}
export class OpenForgottenPasswordDialog {
    constructor() {
        this.type = AUTH_ACTIONS_TYPE.OPEN_FORGOTTEN_PASSWORD_DIALOG;
    }
}
export class SendPassword {
    constructor(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.SEND_PASSWORD;
    }
}
export class SendPasswordSuccess {
    constructor() {
        this.type = AUTH_ACTIONS_TYPE.SEND_PASSWORD_SUCCESS;
    }
}
export class SendPasswordFailure {
    constructor(payload) {
        this.payload = payload;
        this.type = AUTH_ACTIONS_TYPE.SEND_PASSWORD_FAILURE;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItYXV0aC1saWIvIiwic291cmNlcyI6WyJzdG9yZS9hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE1BQU0sQ0FBTixJQUFZLGlCQXdCWDtBQXhCRCxXQUFZLGlCQUFpQjtJQUN6Qix5RUFBb0QsQ0FBQTtJQUNwRCw2REFBd0MsQ0FBQTtJQUN4QywrREFBMEMsQ0FBQTtJQUMxQywrREFBMEMsQ0FBQTtJQUUxQywyREFBc0MsQ0FBQTtJQUN0Qyw2REFBd0MsQ0FBQTtJQUN4Qyw2REFBd0MsQ0FBQTtJQUV4QyxxREFBZ0MsQ0FBQTtJQUVoQyxpRkFBNEQsQ0FBQTtJQUM1RCxpR0FBNEUsQ0FBQTtJQUM1RSxpR0FBNEUsQ0FBQTtJQUU1RSx5RUFBb0QsQ0FBQTtJQUNwRCwrRUFBMEQsQ0FBQTtJQUMxRCwrRUFBMEQsQ0FBQTtJQUUxRCx1R0FBa0YsQ0FBQTtJQUNsRiwyRkFBc0UsQ0FBQTtJQUN0RSxvRkFBK0QsQ0FBQTtJQUMvRCw4R0FBeUYsQ0FBQTtBQUM3RixDQUFDLEVBeEJXLGlCQUFpQixLQUFqQixpQkFBaUIsUUF3QjVCO0FBRUQsTUFBTSxPQUFPLGdCQUFnQjtJQUE3QjtRQUNhLFNBQUksR0FBRyxpQkFBaUIsQ0FBQyxtQkFBbUIsQ0FBQztJQUMxRCxDQUFDO0NBQUE7QUFFRCxNQUFNLE9BQU8sTUFBTTtJQUVmLFlBQW1CLE9BQXNCO1FBQXRCLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFEaEMsU0FBSSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztJQUNFLENBQUM7Q0FDaEQ7QUFFRCxNQUFNLE9BQU8sYUFBYTtJQUExQjtRQUNhLFNBQUksR0FBRyxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7SUFDdEQsQ0FBQztDQUFBO0FBRUQsTUFBTSxPQUFPLGFBQWE7SUFFdEIsWUFBbUIsT0FBMEI7UUFBMUIsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7UUFEcEMsU0FBSSxHQUFHLGlCQUFpQixDQUFDLGVBQWUsQ0FBQztJQUNGLENBQUM7Q0FDcEQ7QUFFRCxNQUFNLE9BQU8sS0FBSztJQUVkLFlBQW9CLE9BQXNCO1FBQXRCLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFEakMsU0FBSSxHQUFHLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztJQUNJLENBQUM7Q0FDakQ7QUFFRCxNQUFNLE9BQU8sWUFBWTtJQUVyQixZQUFtQixPQUdsQjtRQUhrQixZQUFPLEdBQVAsT0FBTyxDQUd6QjtRQUpRLFNBQUksR0FBRyxpQkFBaUIsQ0FBQyxjQUFjLENBQUM7SUFJN0MsQ0FBQztDQUNSO0FBRUQsTUFBTSxPQUFPLFlBQVk7SUFFckIsWUFBbUIsT0FBMEI7UUFBMUIsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7UUFEcEMsU0FBSSxHQUFHLGlCQUFpQixDQUFDLGNBQWMsQ0FBQztJQUNELENBQUM7Q0FDcEQ7QUFFRCxNQUFNLE9BQU8sTUFBTTtJQUFuQjtRQUNhLFNBQUksR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7SUFDOUMsQ0FBQztDQUFBO0FBRUQsTUFBTSxPQUFPLG1CQUFtQjtJQUFoQztRQUNhLFNBQUksR0FBRyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQztJQUM1RCxDQUFDO0NBQUE7QUFFRCxNQUFNLE9BQU8sMEJBQTBCO0lBRW5DLFlBQW1CLE9BQWE7UUFBYixZQUFPLEdBQVAsT0FBTyxDQUFNO1FBRHZCLFNBQUksR0FBRyxpQkFBaUIsQ0FBQyw2QkFBNkIsQ0FBQztJQUM3QixDQUFDO0NBQ3ZDO0FBRUQsTUFBTSxPQUFPLDBCQUEwQjtJQUVuQyxZQUFtQixPQUEwQjtRQUExQixZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQURwQyxTQUFJLEdBQUcsaUJBQWlCLENBQUMsNkJBQTZCLENBQUM7SUFDaEIsQ0FBQztDQUNwRDtBQUVELE1BQU0sT0FBTyxjQUFjO0lBRXZCLFlBQW1CLE9BQTBEO1FBQTFELFlBQU8sR0FBUCxPQUFPLENBQW1EO1FBRHBFLFNBQUksR0FBRyxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7SUFDOEIsQ0FBQztDQUNwRjtBQUVELE1BQU0sT0FBTyxxQkFBcUI7SUFBbEM7UUFDYSxTQUFJLEdBQUcsaUJBQWlCLENBQUMsdUJBQXVCLENBQUM7SUFDOUQsQ0FBQztDQUFBO0FBRUQsTUFBTSxPQUFPLHFCQUFxQjtJQUU5QixZQUFtQixPQUEwQjtRQUExQixZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQURwQyxTQUFJLEdBQUcsaUJBQWlCLENBQUMsdUJBQXVCLENBQUM7SUFDVixDQUFDO0NBQ3BEO0FBRUQsTUFBTSxPQUFPLDJCQUEyQjtJQUF4QztRQUNhLFNBQUksR0FBRyxpQkFBaUIsQ0FBQyw4QkFBOEIsQ0FBQztJQUNyRSxDQUFDO0NBQUE7QUFFRCxNQUFNLE9BQU8sWUFBWTtJQUVyQixZQUFtQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUR6QixTQUFJLEdBQUcsaUJBQWlCLENBQUMsYUFBYSxDQUFDO0lBQ1gsQ0FBQztDQUN6QztBQUVELE1BQU0sT0FBTyxtQkFBbUI7SUFBaEM7UUFDYSxTQUFJLEdBQUcsaUJBQWlCLENBQUMscUJBQXFCLENBQUM7SUFDNUQsQ0FBQztDQUFBO0FBRUQsTUFBTSxPQUFPLG1CQUFtQjtJQUU1QixZQUFtQixPQUEwQjtRQUExQixZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQURwQyxTQUFJLEdBQUcsaUJBQWlCLENBQUMscUJBQXFCLENBQUM7SUFDUixDQUFDO0NBQ3BEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgSHR0cEVycm9yUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vbW9kZWxzL3VzZXIubW9kZWxzJztcblxuZXhwb3J0IGVudW0gQVVUSF9BQ1RJT05TX1RZUEUge1xuICAgIE9QRU5fU0lHTl9VUF9ESUFMT0cgPSAnW0F1dGhdIFVzZXIgd2FudHMgdG8gc2lnbiB1cCcsXG4gICAgU0lHTl9VUCA9ICdbQXV0aF0gVXNlciB0cmllcyB0byBzaWduIHVwJyxcbiAgICBTSUdOX1VQX1NVQ0NFU1MgPSAnW0F1dGhdIFNpZ24gdXAgc3VjY2VzcycsXG4gICAgU0lHTl9VUF9GQUlMVVJFID0gJ1tBdXRoXSBTaWduIHVwIGZhaWx1cmUnLFxuXG4gICAgTE9HX0lOID0gJ1tBdXRoXSBVc2VyIHRyaWVzIHRvIGxvZyBpbicsXG4gICAgTE9HX0lOX1NVQ0NFU1MgPSAnW0F1dGhdIExvZyBpbiBzdWNjZXNzJyxcbiAgICBMT0dfSU5fRkFJTFVSRSA9ICdbQXV0aF0gTG9nIGluIGZhaWx1cmUnLFxuXG4gICAgTE9HX09VVCA9ICdbQXV0aF0gVXNlciBsb2dzIG91dCcsXG5cbiAgICBMT0FEX1VTRVJfSU5GT1JNQVRJT04gPSAnW0F1dGhdIExvYWRpbmcgb2YgdXNlciBpbmZvcm1hdGlvbicsXG4gICAgTE9BRF9VU0VSX0lORk9STUFUSU9OX1NVQ0NFU1MgPSAnW0F1dGhdIExvYWRpbmcgb2YgdXNlciBpbmZvcm1hdGlvbiBzdWNjZXNzJyxcbiAgICBMT0FEX1VTRVJfSU5GT1JNQVRJT05fRkFJTFVSRSA9ICdbQXV0aF0gTG9hZGluZyBvZiB1c2VyIGluZm9ybWF0aW9uIGZhaWx1cmUnLFxuXG4gICAgQ0hBTkdFX1BBU1NXT1JEID0gJ1tBdXRoXSBVc2VyIGNoYW5nZXMgaGlzIHBhc3N3b3JkJyxcbiAgICBDSEFOR0VfUEFTU1dPUkRfU1VDQ0VTUyA9ICdbQXV0aF0gUGFzc3dvcmQgY2hhbmdlIHN1Y2Nlc3MnLFxuICAgIENIQU5HRV9QQVNTV09SRF9GQUlMVVJFID0gJ1tBdXRoXSBQYXNzd29yZCBjaGFuZ2UgZmFpbHVyZScsXG5cbiAgICBPUEVOX0ZPUkdPVFRFTl9QQVNTV09SRF9ESUFMT0cgPSAnW0F1dGhdIFVzZXIgb3BlbnMgZGlhbG9nIGZvciBwYXNzd29yZCByZXNldHRpbmcnLFxuICAgIFNFTkRfUEFTU1dPUkQgPSAnW0F1dGhdIFVzZXIgaGFzIGFza2VkIGZvciBoYXZpbmcgYmFjayBhIG5ldyBwYXNzd29yZCcsXG4gICAgU0VORF9QQVNTV09SRF9TVUNDRVNTID0gJ1tBdXRoXSBVc2VyIGhhcyByZWNlaXZlZCBoaXMgcGFzc3dvcmQnLFxuICAgIFNFTkRfUEFTU1dPUkRfRkFJTFVSRSA9ICdbQXV0aF0gRXJyb3IgaW4gdGhlIHByb2Nlc3Mgb2Ygc2VuZGluZyB0aGUgcGFzc3dvcmQgdG8gdGhlIHVzZXInXG59XG5cbmV4cG9ydCBjbGFzcyBPcGVuU2lnblVwRGlhbG9nIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgICByZWFkb25seSB0eXBlID0gQVVUSF9BQ1RJT05TX1RZUEUuT1BFTl9TSUdOX1VQX0RJQUxPRztcbn1cblxuZXhwb3J0IGNsYXNzIFNpZ25VcCBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gICAgcmVhZG9ubHkgdHlwZSA9IEFVVEhfQUNUSU9OU19UWVBFLlNJR05fVVA7XG4gICAgY29uc3RydWN0b3IocHVibGljIHBheWxvYWQ6IFBhcnRpYWw8VXNlcj4pIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBTaWduVXBTdWNjZXNzIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgICByZWFkb25seSB0eXBlID0gQVVUSF9BQ1RJT05TX1RZUEUuU0lHTl9VUF9TVUNDRVNTO1xufVxuXG5leHBvcnQgY2xhc3MgU2lnblVwRmFpbHVyZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gICAgcmVhZG9ubHkgdHlwZSA9IEFVVEhfQUNUSU9OU19UWVBFLlNJR05fVVBfRkFJTFVSRTtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF5bG9hZDogSHR0cEVycm9yUmVzcG9uc2UpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2dJbiBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gICAgcmVhZG9ubHkgdHlwZSA9IEFVVEhfQUNUSU9OU19UWVBFLkxPR19JTjtcbiAgICBjb25zdHJ1Y3RvciAocHVibGljIHBheWxvYWQ6IFBhcnRpYWw8VXNlcj4pIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2dJblN1Y2Nlc3MgaW1wbGVtZW50cyBBY3Rpb24ge1xuICAgIHJlYWRvbmx5IHR5cGUgPSBBVVRIX0FDVElPTlNfVFlQRS5MT0dfSU5fU1VDQ0VTUztcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF5bG9hZDoge1xuICAgICAgICB1c2VyOiBVc2VyLFxuICAgICAgICB1c2Vyc0xpc3Q6IHsgaWQ6IG51bWJlciwgZmlyc3ROYW1lOiBzdHJpbmcsIGxhc3ROYW1lOiBzdHJpbmcgfVtdXG4gICAgfSkge31cbn1cblxuZXhwb3J0IGNsYXNzIExvZ0luRmFpbHVyZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gICAgcmVhZG9ubHkgdHlwZSA9IEFVVEhfQUNUSU9OU19UWVBFLkxPR19JTl9GQUlMVVJFO1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXlsb2FkOiBIdHRwRXJyb3JSZXNwb25zZSkge31cbn1cblxuZXhwb3J0IGNsYXNzIExvZ091dCBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gICAgcmVhZG9ubHkgdHlwZSA9IEFVVEhfQUNUSU9OU19UWVBFLkxPR19PVVQ7XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkVXNlckluZm9ybWF0aW9uIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgICByZWFkb25seSB0eXBlID0gQVVUSF9BQ1RJT05TX1RZUEUuTE9BRF9VU0VSX0lORk9STUFUSU9OO1xufVxuXG5leHBvcnQgY2xhc3MgTG9hZFVzZXJJbmZvcm1hdGlvblN1Y2Nlc3MgaW1wbGVtZW50cyBBY3Rpb24ge1xuICAgIHJlYWRvbmx5IHR5cGUgPSBBVVRIX0FDVElPTlNfVFlQRS5MT0FEX1VTRVJfSU5GT1JNQVRJT05fU1VDQ0VTUztcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF5bG9hZDogVXNlcikge31cbn1cblxuZXhwb3J0IGNsYXNzIExvYWRVc2VySW5mb3JtYXRpb25GYWlsdXJlIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgICByZWFkb25seSB0eXBlID0gQVVUSF9BQ1RJT05TX1RZUEUuTE9BRF9VU0VSX0lORk9STUFUSU9OX0ZBSUxVUkU7XG4gICAgY29uc3RydWN0b3IocHVibGljIHBheWxvYWQ6IEh0dHBFcnJvclJlc3BvbnNlKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgQ2hhbmdlUGFzc3dvcmQgaW1wbGVtZW50cyBBY3Rpb24ge1xuICAgIHJlYWRvbmx5IHR5cGUgPSBBVVRIX0FDVElPTlNfVFlQRS5DSEFOR0VfUEFTU1dPUkQ7XG4gICAgY29uc3RydWN0b3IocHVibGljIHBheWxvYWQ6IHsgY3VycmVudFBhc3N3b3JkOiBzdHJpbmcsIG5leHRQYXNzd29yZDogc3RyaW5nIH0pIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBDaGFuZ2VQYXNzd29yZFN1Y2Nlc3MgaW1wbGVtZW50cyBBY3Rpb24ge1xuICAgIHJlYWRvbmx5IHR5cGUgPSBBVVRIX0FDVElPTlNfVFlQRS5DSEFOR0VfUEFTU1dPUkRfU1VDQ0VTUztcbn1cblxuZXhwb3J0IGNsYXNzIENoYW5nZVBhc3N3b3JkRmFpbHVyZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gICAgcmVhZG9ubHkgdHlwZSA9IEFVVEhfQUNUSU9OU19UWVBFLkNIQU5HRV9QQVNTV09SRF9GQUlMVVJFO1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXlsb2FkOiBIdHRwRXJyb3JSZXNwb25zZSkge31cbn1cblxuZXhwb3J0IGNsYXNzIE9wZW5Gb3Jnb3R0ZW5QYXNzd29yZERpYWxvZyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gICAgcmVhZG9ubHkgdHlwZSA9IEFVVEhfQUNUSU9OU19UWVBFLk9QRU5fRk9SR09UVEVOX1BBU1NXT1JEX0RJQUxPRztcbn1cblxuZXhwb3J0IGNsYXNzIFNlbmRQYXNzd29yZCBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gICAgcmVhZG9ubHkgdHlwZSA9IEFVVEhfQUNUSU9OU19UWVBFLlNFTkRfUEFTU1dPUkQ7XG4gICAgY29uc3RydWN0b3IocHVibGljIHBheWxvYWQ6IHN0cmluZykge31cbn1cblxuZXhwb3J0IGNsYXNzIFNlbmRQYXNzd29yZFN1Y2Nlc3MgaW1wbGVtZW50cyBBY3Rpb24ge1xuICAgIHJlYWRvbmx5IHR5cGUgPSBBVVRIX0FDVElPTlNfVFlQRS5TRU5EX1BBU1NXT1JEX1NVQ0NFU1M7XG59XG5cbmV4cG9ydCBjbGFzcyBTZW5kUGFzc3dvcmRGYWlsdXJlIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgICByZWFkb25seSB0eXBlID0gQVVUSF9BQ1RJT05TX1RZUEUuU0VORF9QQVNTV09SRF9GQUlMVVJFO1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXlsb2FkOiBIdHRwRXJyb3JSZXNwb25zZSkge31cbn1cblxuZXhwb3J0IHR5cGUgQWN0aW9ucyA9IE9wZW5TaWduVXBEaWFsb2dcbiAgICB8IFNpZ25VcFxuICAgIHwgU2lnblVwU3VjY2Vzc1xuICAgIHwgU2lnblVwRmFpbHVyZVxuICAgIHwgTG9nSW5cbiAgICB8IExvZ0luU3VjY2Vzc1xuICAgIHwgTG9nSW5GYWlsdXJlXG4gICAgfCBMb2dPdXRcbiAgICB8IExvYWRVc2VySW5mb3JtYXRpb25cbiAgICB8IExvYWRVc2VySW5mb3JtYXRpb25TdWNjZXNzXG4gICAgfCBMb2FkVXNlckluZm9ybWF0aW9uRmFpbHVyZVxuICAgIHwgQ2hhbmdlUGFzc3dvcmRcbiAgICB8IENoYW5nZVBhc3N3b3JkU3VjY2Vzc1xuICAgIHwgQ2hhbmdlUGFzc3dvcmRGYWlsdXJlXG4gICAgfCBPcGVuRm9yZ290dGVuUGFzc3dvcmREaWFsb2dcbiAgICB8IFNlbmRQYXNzd29yZFxuICAgIHwgU2VuZFBhc3N3b3JkU3VjY2Vzc1xuICAgIHwgU2VuZFBhc3N3b3JkRmFpbHVyZTtcbiJdfQ==