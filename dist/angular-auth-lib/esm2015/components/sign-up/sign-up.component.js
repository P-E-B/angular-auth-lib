import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { get } from '../../utils';
import { SignUp } from '../../store/actions';
import { selectIsSignUpLoading } from '../../store/selectors';
import { AUTH_TRADUCTIONS, AUTH_STYLES } from '../../token';
let SignUpComponent = class SignUpComponent {
    constructor(traductions, styles, dialogRef, formBuilder, store) {
        this.traductions = traductions;
        this.styles = styles;
        this.dialogRef = dialogRef;
        this.formBuilder = formBuilder;
        this.store = store;
        this.isSignUpLoading$ = this.store.pipe(select(selectIsSignUpLoading));
        this.usernamePlaceholder = 'Username';
        this.passwordPlaceholder = 'Password';
        this.firstNamePlaceholder = 'First name';
        this.lastNamePlaceholder = 'Last name';
        this.emailPlaceholder = 'Email';
        this.enterprisePlaceholder = 'Enterprise';
        this.signUpDialogTitle = 'Sign Up';
        this.signupButtonTraduction = 'Log in';
        this.buttonsBackgroundColor = '#3f51b5';
        this.buttonsColor = 'white';
    }
    ngOnInit() {
        this.usernamePlaceholder = get(this.traductions || {}, 'form.usernamePlaceholder', this.usernamePlaceholder);
        this.passwordPlaceholder = get(this.traductions || {}, 'form.passwordPlaceholder', this.passwordPlaceholder);
        this.firstNamePlaceholder = get(this.traductions || {}, 'form.firstNamePlaceholder', this.firstNamePlaceholder);
        this.lastNamePlaceholder = get(this.traductions || {}, 'form.lastNamePlaceholder', this.lastNamePlaceholder);
        this.emailPlaceholder = get(this.traductions || {}, 'form.emailPlaceholder', this.emailPlaceholder);
        this.enterprisePlaceholder = get(this.traductions || {}, 'form.enterprisePlaceholder', this.enterprisePlaceholder);
        this.signUpDialogTitle = get(this.traductions || {}, 'dialogs.signup', this.signUpDialogTitle);
        this.signupButtonTraduction = get(this.traductions || {}, 'buttons.signup', this.signupButtonTraduction);
        this.buttonsBackgroundColor = get(this.styles || {}, 'buttonsBackgroundColor', this.buttonsBackgroundColor);
        this.buttonsColor = get(this.styles || {}, 'buttonsColor', this.buttonsColor);
        this.userForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            enterprise: ''
        });
    }
    onSubmitUser() {
        const newUser = {
            username: this.userForm.value['username'],
            password: this.userForm.value['password'],
            firstName: this.userForm.value['firstName'],
            lastName: this.userForm.value['lastName'],
            email: this.userForm.value['email'],
            enterprise: this.userForm.value['enterprise'] || null,
            isActivated: false
        };
        this.store.dispatch(new SignUp(newUser));
    }
};
SignUpComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_TRADUCTIONS,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_STYLES,] }] },
    { type: MatDialogRef },
    { type: FormBuilder },
    { type: Store }
];
SignUpComponent = __decorate([
    Component({
        selector: 'auth-lib-sign-up',
        template: "<div id=\"container\">\n    <h2 mat-dialog-title>{{ signUpDialogTitle }}</h2>\n    <form [formGroup]=\"userForm\" (ngSubmit)=\"onSubmitUser()\">\n\n        <div id=\"columns\">\n            <div id=\"left-column\">\n                <mat-form-field>\n                    <input matInput [placeholder]=\"usernamePlaceholder\" formControlName=\"username\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"firstNamePlaceholder\" formControlName=\"firstName\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"emailPlaceholder\" formControlName=\"email\" autocomplete=\"off\">\n                </mat-form-field>\n            </div>\n\n            <div id=\"right-column\">\n                <mat-form-field>\n                    <input matInput type=\"password\" [placeholder]=\"passwordPlaceholder\" formControlName=\"password\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"lastNamePlaceholder\" formControlName=\"lastName\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"enterprisePlaceholder\" formControlName=\"enterprise\" autocomplete=\"off\">\n                </mat-form-field>\n            </div>\n        </div>\n\n        <button\n            *ngIf=\"!(isSignUpLoading$ | async)\"\n            mat-raised-button\n            type=\"submit\"\n            [disabled]=\"userForm.invalid\"\n            [ngStyle]=\"{\n                'background-color': buttonsBackgroundColor,\n                'color': buttonsColor\n            }\"\n        >\n            {{ signupButtonTraduction }}\n        </button>\n        <mat-spinner *ngIf=\"isSignUpLoading$ | async\" [diameter]=\"36\"></mat-spinner>\n    </form>\n</div>\n",
        styles: ["#container{display:flex;flex-direction:column;width:600px}#container form{margin-top:20px;display:flex;flex-direction:column;justify-content:space-between}#container form #columns{display:flex;flex-direction:row;justify-content:space-between}#container form #columns #left-column{margin-right:20px}#container form #columns #left-column,#container form #columns #right-column{display:flex;flex-direction:column;justify-content:space-between;width:100%}#container mat-form-field{width:100%}#container button{margin-top:20px;-ms-grid-row-align:center;align-self:center}"]
    }),
    __param(0, Inject(AUTH_TRADUCTIONS)),
    __param(1, Inject(AUTH_STYLES))
], SignUpComponent);
export { SignUpComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi11cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWF1dGgtbGliLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zaWduLXVwL3NpZ24tdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFNUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVsQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFN0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFvQixXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFPOUUsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQWtCMUIsWUFDb0MsV0FBNEMsRUFDakQsTUFBa0MsRUFDeEQsU0FBd0MsRUFDdkMsV0FBd0IsRUFDeEIsS0FBdUI7UUFKRyxnQkFBVyxHQUFYLFdBQVcsQ0FBaUM7UUFDakQsV0FBTSxHQUFOLE1BQU0sQ0FBNEI7UUFDeEQsY0FBUyxHQUFULFNBQVMsQ0FBK0I7UUFDdkMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUF0QmpDLHFCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7UUFJbEUsd0JBQW1CLEdBQUcsVUFBVSxDQUFDO1FBQ2pDLHdCQUFtQixHQUFHLFVBQVUsQ0FBQztRQUNqQyx5QkFBb0IsR0FBRyxZQUFZLENBQUM7UUFDcEMsd0JBQW1CLEdBQUcsV0FBVyxDQUFDO1FBQ2xDLHFCQUFnQixHQUFHLE9BQU8sQ0FBQztRQUMzQiwwQkFBcUIsR0FBRyxZQUFZLENBQUM7UUFFckMsc0JBQWlCLEdBQUcsU0FBUyxDQUFDO1FBRTlCLDJCQUFzQixHQUFHLFFBQVEsQ0FBQztRQUNsQywyQkFBc0IsR0FBRyxTQUFTLENBQUM7UUFDbkMsaUJBQVksR0FBRyxPQUFPLENBQUM7SUFRbkIsQ0FBQztJQUVMLFFBQVE7UUFDTixJQUFJLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFLDBCQUEwQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzdHLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUUsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDN0csSUFBSSxDQUFDLG9CQUFvQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFBRSwyQkFBMkIsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNoSCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFLDBCQUEwQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzdHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUUsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDcEcsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFBRSw0QkFBNEIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUVuSCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFLGdCQUFnQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQy9GLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFFekcsSUFBSSxDQUFDLHNCQUFzQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRSx3QkFBd0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUM1RyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRTlFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDckMsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDbkMsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDbkMsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDcEMsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDbkMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDaEMsVUFBVSxFQUFFLEVBQUU7U0FDZixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsWUFBWTtRQUNWLE1BQU0sT0FBTyxHQUFrQjtZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1lBQ3pDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7WUFDekMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztZQUMzQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1lBQ3pDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDbkMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUk7WUFDckQsV0FBVyxFQUFFLEtBQUs7U0FDbkIsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUNGLENBQUE7OzRDQTNDSSxNQUFNLFNBQUMsZ0JBQWdCOzRDQUN2QixNQUFNLFNBQUMsV0FBVztZQUNELFlBQVk7WUFDVCxXQUFXO1lBQ2pCLEtBQUs7O0FBdkJYLGVBQWU7SUFMM0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QiwrOURBQXVDOztLQUV4QyxDQUFDO0lBb0JHLFdBQUEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDeEIsV0FBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7R0FwQlgsZUFBZSxDQThEM0I7U0E5RFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgc2VsZWN0LCBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcblxuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuXG5pbXBvcnQgeyBTaWduVXAgfSBmcm9tICcuLi8uLi9zdG9yZS9hY3Rpb25zJztcbmltcG9ydCB7IEF1dGhTdGF0ZSB9IGZyb20gJy4uLy4uL3N0b3JlL3JlZHVjZXInO1xuaW1wb3J0IHsgc2VsZWN0SXNTaWduVXBMb2FkaW5nIH0gZnJvbSAnLi4vLi4vc3RvcmUvc2VsZWN0b3JzJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvdXNlci5tb2RlbHMnO1xuaW1wb3J0IHsgQVVUSF9UUkFEVUNUSU9OUywgQXV0aE1vZHVsZUNvbmZpZywgQVVUSF9TVFlMRVMgfSBmcm9tICcuLi8uLi90b2tlbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F1dGgtbGliLXNpZ24tdXAnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2lnbi11cC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NpZ24tdXAuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTaWduVXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBpc1NpZ25VcExvYWRpbmckID0gdGhpcy5zdG9yZS5waXBlKHNlbGVjdChzZWxlY3RJc1NpZ25VcExvYWRpbmcpKTtcblxuICB1c2VyRm9ybTogRm9ybUdyb3VwO1xuXG4gIHVzZXJuYW1lUGxhY2Vob2xkZXIgPSAnVXNlcm5hbWUnO1xuICBwYXNzd29yZFBsYWNlaG9sZGVyID0gJ1Bhc3N3b3JkJztcbiAgZmlyc3ROYW1lUGxhY2Vob2xkZXIgPSAnRmlyc3QgbmFtZSc7XG4gIGxhc3ROYW1lUGxhY2Vob2xkZXIgPSAnTGFzdCBuYW1lJztcbiAgZW1haWxQbGFjZWhvbGRlciA9ICdFbWFpbCc7XG4gIGVudGVycHJpc2VQbGFjZWhvbGRlciA9ICdFbnRlcnByaXNlJztcblxuICBzaWduVXBEaWFsb2dUaXRsZSA9ICdTaWduIFVwJztcblxuICBzaWdudXBCdXR0b25UcmFkdWN0aW9uID0gJ0xvZyBpbic7XG4gIGJ1dHRvbnNCYWNrZ3JvdW5kQ29sb3IgPSAnIzNmNTFiNSc7XG4gIGJ1dHRvbnNDb2xvciA9ICd3aGl0ZSc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChBVVRIX1RSQURVQ1RJT05TKSBwcml2YXRlIHRyYWR1Y3Rpb25zOiBBdXRoTW9kdWxlQ29uZmlnWyd0cmFkdWN0aW9ucyddLFxuICAgIEBJbmplY3QoQVVUSF9TVFlMRVMpIHByaXZhdGUgc3R5bGVzOiBBdXRoTW9kdWxlQ29uZmlnWydzdHlsZXMnXSxcbiAgICBwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8U2lnblVwQ29tcG9uZW50PixcbiAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIHN0b3JlOiBTdG9yZTxBdXRoU3RhdGU+XG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy51c2VybmFtZVBsYWNlaG9sZGVyID0gZ2V0KHRoaXMudHJhZHVjdGlvbnMgfHwge30sICdmb3JtLnVzZXJuYW1lUGxhY2Vob2xkZXInLCB0aGlzLnVzZXJuYW1lUGxhY2Vob2xkZXIpO1xuICAgIHRoaXMucGFzc3dvcmRQbGFjZWhvbGRlciA9IGdldCh0aGlzLnRyYWR1Y3Rpb25zIHx8IHt9LCAnZm9ybS5wYXNzd29yZFBsYWNlaG9sZGVyJywgdGhpcy5wYXNzd29yZFBsYWNlaG9sZGVyKTtcbiAgICB0aGlzLmZpcnN0TmFtZVBsYWNlaG9sZGVyID0gZ2V0KHRoaXMudHJhZHVjdGlvbnMgfHwge30sICdmb3JtLmZpcnN0TmFtZVBsYWNlaG9sZGVyJywgdGhpcy5maXJzdE5hbWVQbGFjZWhvbGRlcik7XG4gICAgdGhpcy5sYXN0TmFtZVBsYWNlaG9sZGVyID0gZ2V0KHRoaXMudHJhZHVjdGlvbnMgfHwge30sICdmb3JtLmxhc3ROYW1lUGxhY2Vob2xkZXInLCB0aGlzLmxhc3ROYW1lUGxhY2Vob2xkZXIpO1xuICAgIHRoaXMuZW1haWxQbGFjZWhvbGRlciA9IGdldCh0aGlzLnRyYWR1Y3Rpb25zIHx8IHt9LCAnZm9ybS5lbWFpbFBsYWNlaG9sZGVyJywgdGhpcy5lbWFpbFBsYWNlaG9sZGVyKTtcbiAgICB0aGlzLmVudGVycHJpc2VQbGFjZWhvbGRlciA9IGdldCh0aGlzLnRyYWR1Y3Rpb25zIHx8IHt9LCAnZm9ybS5lbnRlcnByaXNlUGxhY2Vob2xkZXInLCB0aGlzLmVudGVycHJpc2VQbGFjZWhvbGRlcik7XG5cbiAgICB0aGlzLnNpZ25VcERpYWxvZ1RpdGxlID0gZ2V0KHRoaXMudHJhZHVjdGlvbnMgfHwge30sICdkaWFsb2dzLnNpZ251cCcsIHRoaXMuc2lnblVwRGlhbG9nVGl0bGUpO1xuICAgIHRoaXMuc2lnbnVwQnV0dG9uVHJhZHVjdGlvbiA9IGdldCh0aGlzLnRyYWR1Y3Rpb25zIHx8IHt9LCAnYnV0dG9ucy5zaWdudXAnLCB0aGlzLnNpZ251cEJ1dHRvblRyYWR1Y3Rpb24pO1xuXG4gICAgdGhpcy5idXR0b25zQmFja2dyb3VuZENvbG9yID0gZ2V0KHRoaXMuc3R5bGVzIHx8IHt9LCAnYnV0dG9uc0JhY2tncm91bmRDb2xvcicsIHRoaXMuYnV0dG9uc0JhY2tncm91bmRDb2xvcik7XG4gICAgdGhpcy5idXR0b25zQ29sb3IgPSBnZXQodGhpcy5zdHlsZXMgfHwge30sICdidXR0b25zQ29sb3InLCB0aGlzLmJ1dHRvbnNDb2xvcik7XG5cbiAgICB0aGlzLnVzZXJGb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICB1c2VybmFtZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIHBhc3N3b3JkOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgZmlyc3ROYW1lOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgbGFzdE5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICBlbWFpbDogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIGVudGVycHJpc2U6ICcnXG4gICAgfSk7XG4gIH1cblxuICBvblN1Ym1pdFVzZXIoKSB7XG4gICAgY29uc3QgbmV3VXNlcjogUGFydGlhbDxVc2VyPiA9IHtcbiAgICAgIHVzZXJuYW1lOiB0aGlzLnVzZXJGb3JtLnZhbHVlWyd1c2VybmFtZSddLFxuICAgICAgcGFzc3dvcmQ6IHRoaXMudXNlckZvcm0udmFsdWVbJ3Bhc3N3b3JkJ10sXG4gICAgICBmaXJzdE5hbWU6IHRoaXMudXNlckZvcm0udmFsdWVbJ2ZpcnN0TmFtZSddLFxuICAgICAgbGFzdE5hbWU6IHRoaXMudXNlckZvcm0udmFsdWVbJ2xhc3ROYW1lJ10sXG4gICAgICBlbWFpbDogdGhpcy51c2VyRm9ybS52YWx1ZVsnZW1haWwnXSxcbiAgICAgIGVudGVycHJpc2U6IHRoaXMudXNlckZvcm0udmFsdWVbJ2VudGVycHJpc2UnXSB8fCBudWxsLFxuICAgICAgaXNBY3RpdmF0ZWQ6IGZhbHNlXG4gICAgfTtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBTaWduVXAobmV3VXNlcikpO1xuICB9XG59XG4iXX0=