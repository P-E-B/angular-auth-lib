import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import get from 'lodash-es/get';
import { SignUp } from '../../store/actions';
import { AUTH_TRADUCTIONS, AUTH_STYLES } from '../../token';
var SignUpComponent = /** @class */ (function () {
    function SignUpComponent(traductions, styles, dialogRef, formBuilder, store) {
        this.traductions = traductions;
        this.styles = styles;
        this.dialogRef = dialogRef;
        this.formBuilder = formBuilder;
        this.store = store;
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
    SignUpComponent.prototype.ngOnInit = function () {
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
    };
    SignUpComponent.prototype.onSubmit = function () {
        var newUser = {
            username: this.userForm.value['username'],
            password: this.userForm.value['password'],
            firstName: this.userForm.value['firstName'],
            lastName: this.userForm.value['lastName'],
            email: this.userForm.value['email'],
            enterprise: this.userForm.value['enterprise'] || null
        };
        this.store.dispatch(new SignUp(newUser));
        this.dialogRef.close();
    };
    SignUpComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_TRADUCTIONS,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_STYLES,] }] },
        { type: MatDialogRef },
        { type: FormBuilder },
        { type: Store }
    ]; };
    SignUpComponent = __decorate([
        Component({
            selector: 'auth-lib-sign-up',
            template: "<div id=\"container\">\n    <h2 mat-dialog-title>{{ signUpDialogTitle }}</h2>\n    <form [formGroup]=\"userForm\" (ngSubmit)=\"onSubmit()\">\n\n        <div id=\"columns\">\n            <div id=\"left-column\">\n                <mat-form-field>\n                    <input matInput [placeholder]=\"usernamePlaceholder\" formControlName=\"username\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"firstNamePlaceholder\" formControlName=\"firstName\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"emailPlaceholder\" formControlName=\"email\" autocomplete=\"off\">\n                </mat-form-field>\n            </div>\n\n            <div id=\"right-column\">\n                <mat-form-field>\n                    <input matInput type=\"password\" [placeholder]=\"passwordPlaceholder\" formControlName=\"password\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"lastNamePlaceholder\" formControlName=\"lastName\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"enterprisePlaceholder\" formControlName=\"enterprise\" autocomplete=\"off\">\n                </mat-form-field>\n            </div>\n        </div>\n\n        <button mat-raised-button type=\"submit\" [disabled]=\"userForm.invalid\" [ngStyle]=\"{\n            'background-color': buttonsBackgroundColor,\n            'color': buttonsColor\n          }\">\n            {{ signupButtonTraduction }}\n        </button>\n    </form>\n</div>\n",
            styles: ["#container{display:flex;flex-direction:column;width:600px}#container form{margin-top:20px;display:flex;flex-direction:column;justify-content:space-between}#container form #columns{display:flex;flex-direction:row;justify-content:space-between}#container form #columns #left-column{margin-right:20px}#container form #columns #left-column,#container form #columns #right-column{display:flex;flex-direction:column;justify-content:space-between;width:100%}#container form #columns mat-form-field{width:100%}#container button{margin-top:20px;-ms-grid-row-align:center;align-self:center}"]
        }),
        __param(0, Inject(AUTH_TRADUCTIONS)),
        __param(1, Inject(AUTH_STYLES))
    ], SignUpComponent);
    return SignUpComponent;
}());
export { SignUpComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi11cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWF1dGgtbGliLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zaWduLXVwL3NpZ24tdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVwQyxPQUFPLEdBQUcsTUFBTSxlQUFlLENBQUM7QUFJaEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBb0IsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBTzlFO0lBZ0JFLHlCQUNvQyxXQUE0QyxFQUNqRCxNQUFrQyxFQUN4RCxTQUF3QyxFQUN2QyxXQUF3QixFQUN4QixLQUF1QjtRQUpHLGdCQUFXLEdBQVgsV0FBVyxDQUFpQztRQUNqRCxXQUFNLEdBQU4sTUFBTSxDQUE0QjtRQUN4RCxjQUFTLEdBQVQsU0FBUyxDQUErQjtRQUN2QyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQWxCakMsd0JBQW1CLEdBQUcsVUFBVSxDQUFDO1FBQ2pDLHdCQUFtQixHQUFHLFVBQVUsQ0FBQztRQUNqQyx5QkFBb0IsR0FBRyxZQUFZLENBQUM7UUFDcEMsd0JBQW1CLEdBQUcsV0FBVyxDQUFDO1FBQ2xDLHFCQUFnQixHQUFHLE9BQU8sQ0FBQztRQUMzQiwwQkFBcUIsR0FBRyxZQUFZLENBQUM7UUFFckMsc0JBQWlCLEdBQUcsU0FBUyxDQUFDO1FBRTlCLDJCQUFzQixHQUFHLFFBQVEsQ0FBQztRQUNsQywyQkFBc0IsR0FBRyxTQUFTLENBQUM7UUFDbkMsaUJBQVksR0FBRyxPQUFPLENBQUM7SUFRbkIsQ0FBQztJQUVMLGtDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFLDBCQUEwQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzdHLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUUsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDN0csSUFBSSxDQUFDLG9CQUFvQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFBRSwyQkFBMkIsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNoSCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFLDBCQUEwQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzdHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUUsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDcEcsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFBRSw0QkFBNEIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUVuSCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFLGdCQUFnQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRS9GLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDekcsSUFBSSxDQUFDLHNCQUFzQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRSx3QkFBd0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUM1RyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRTlFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDckMsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDbkMsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDbkMsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDcEMsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDbkMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDaEMsVUFBVSxFQUFFLEVBQUU7U0FDZixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsa0NBQVEsR0FBUjtRQUNFLElBQU0sT0FBTyxHQUFrQjtZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1lBQ3pDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7WUFDekMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztZQUMzQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1lBQ3pDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDbkMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUk7U0FDdEQsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUN4QixDQUFDOztnREExQ0UsTUFBTSxTQUFDLGdCQUFnQjtnREFDdkIsTUFBTSxTQUFDLFdBQVc7Z0JBQ0QsWUFBWTtnQkFDVCxXQUFXO2dCQUNqQixLQUFLOztJQXJCWCxlQUFlO1FBTDNCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsc3dEQUF1Qzs7U0FFeEMsQ0FBQztRQWtCRyxXQUFBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQ3hCLFdBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO09BbEJYLGVBQWUsQ0E0RDNCO0lBQUQsc0JBQUM7Q0FBQSxBQTVERCxJQTREQztTQTVEWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcblxuaW1wb3J0IGdldCBmcm9tICdsb2Rhc2gtZXMvZ2V0JztcblxuaW1wb3J0IHsgQXV0aFN0YXRlIH0gZnJvbSAnLi4vLi4vc3RvcmUvcmVkdWNlcic7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3VzZXIubW9kZWxzJztcbmltcG9ydCB7IFNpZ25VcCB9IGZyb20gJy4uLy4uL3N0b3JlL2FjdGlvbnMnO1xuaW1wb3J0IHsgQVVUSF9UUkFEVUNUSU9OUywgQXV0aE1vZHVsZUNvbmZpZywgQVVUSF9TVFlMRVMgfSBmcm9tICcuLi8uLi90b2tlbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F1dGgtbGliLXNpZ24tdXAnLFxuICB0ZW1wbGF0ZVVybDogJy4vc2lnbi11cC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NpZ24tdXAuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTaWduVXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICB1c2VyRm9ybTogRm9ybUdyb3VwO1xuXG4gIHVzZXJuYW1lUGxhY2Vob2xkZXIgPSAnVXNlcm5hbWUnO1xuICBwYXNzd29yZFBsYWNlaG9sZGVyID0gJ1Bhc3N3b3JkJztcbiAgZmlyc3ROYW1lUGxhY2Vob2xkZXIgPSAnRmlyc3QgbmFtZSc7XG4gIGxhc3ROYW1lUGxhY2Vob2xkZXIgPSAnTGFzdCBuYW1lJztcbiAgZW1haWxQbGFjZWhvbGRlciA9ICdFbWFpbCc7XG4gIGVudGVycHJpc2VQbGFjZWhvbGRlciA9ICdFbnRlcnByaXNlJztcblxuICBzaWduVXBEaWFsb2dUaXRsZSA9ICdTaWduIFVwJztcblxuICBzaWdudXBCdXR0b25UcmFkdWN0aW9uID0gJ0xvZyBpbic7XG4gIGJ1dHRvbnNCYWNrZ3JvdW5kQ29sb3IgPSAnIzNmNTFiNSc7XG4gIGJ1dHRvbnNDb2xvciA9ICd3aGl0ZSc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChBVVRIX1RSQURVQ1RJT05TKSBwcml2YXRlIHRyYWR1Y3Rpb25zOiBBdXRoTW9kdWxlQ29uZmlnWyd0cmFkdWN0aW9ucyddLFxuICAgIEBJbmplY3QoQVVUSF9TVFlMRVMpIHByaXZhdGUgc3R5bGVzOiBBdXRoTW9kdWxlQ29uZmlnWydzdHlsZXMnXSxcbiAgICBwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8U2lnblVwQ29tcG9uZW50PixcbiAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIHN0b3JlOiBTdG9yZTxBdXRoU3RhdGU+XG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy51c2VybmFtZVBsYWNlaG9sZGVyID0gZ2V0KHRoaXMudHJhZHVjdGlvbnMgfHwge30sICdmb3JtLnVzZXJuYW1lUGxhY2Vob2xkZXInLCB0aGlzLnVzZXJuYW1lUGxhY2Vob2xkZXIpO1xuICAgIHRoaXMucGFzc3dvcmRQbGFjZWhvbGRlciA9IGdldCh0aGlzLnRyYWR1Y3Rpb25zIHx8IHt9LCAnZm9ybS5wYXNzd29yZFBsYWNlaG9sZGVyJywgdGhpcy5wYXNzd29yZFBsYWNlaG9sZGVyKTtcbiAgICB0aGlzLmZpcnN0TmFtZVBsYWNlaG9sZGVyID0gZ2V0KHRoaXMudHJhZHVjdGlvbnMgfHwge30sICdmb3JtLmZpcnN0TmFtZVBsYWNlaG9sZGVyJywgdGhpcy5maXJzdE5hbWVQbGFjZWhvbGRlcik7XG4gICAgdGhpcy5sYXN0TmFtZVBsYWNlaG9sZGVyID0gZ2V0KHRoaXMudHJhZHVjdGlvbnMgfHwge30sICdmb3JtLmxhc3ROYW1lUGxhY2Vob2xkZXInLCB0aGlzLmxhc3ROYW1lUGxhY2Vob2xkZXIpO1xuICAgIHRoaXMuZW1haWxQbGFjZWhvbGRlciA9IGdldCh0aGlzLnRyYWR1Y3Rpb25zIHx8IHt9LCAnZm9ybS5lbWFpbFBsYWNlaG9sZGVyJywgdGhpcy5lbWFpbFBsYWNlaG9sZGVyKTtcbiAgICB0aGlzLmVudGVycHJpc2VQbGFjZWhvbGRlciA9IGdldCh0aGlzLnRyYWR1Y3Rpb25zIHx8IHt9LCAnZm9ybS5lbnRlcnByaXNlUGxhY2Vob2xkZXInLCB0aGlzLmVudGVycHJpc2VQbGFjZWhvbGRlcik7XG5cbiAgICB0aGlzLnNpZ25VcERpYWxvZ1RpdGxlID0gZ2V0KHRoaXMudHJhZHVjdGlvbnMgfHwge30sICdkaWFsb2dzLnNpZ251cCcsIHRoaXMuc2lnblVwRGlhbG9nVGl0bGUpO1xuXG4gICAgdGhpcy5zaWdudXBCdXR0b25UcmFkdWN0aW9uID0gZ2V0KHRoaXMudHJhZHVjdGlvbnMgfHwge30sICdidXR0b25zLnNpZ251cCcsIHRoaXMuc2lnbnVwQnV0dG9uVHJhZHVjdGlvbik7XG4gICAgdGhpcy5idXR0b25zQmFja2dyb3VuZENvbG9yID0gZ2V0KHRoaXMuc3R5bGVzIHx8IHt9LCAnYnV0dG9uc0JhY2tncm91bmRDb2xvcicsIHRoaXMuYnV0dG9uc0JhY2tncm91bmRDb2xvcik7XG4gICAgdGhpcy5idXR0b25zQ29sb3IgPSBnZXQodGhpcy5zdHlsZXMgfHwge30sICdidXR0b25zQ29sb3InLCB0aGlzLmJ1dHRvbnNDb2xvcik7XG5cbiAgICB0aGlzLnVzZXJGb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICB1c2VybmFtZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIHBhc3N3b3JkOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgZmlyc3ROYW1lOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgbGFzdE5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICBlbWFpbDogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIGVudGVycHJpc2U6ICcnXG4gICAgfSk7XG4gIH1cblxuICBvblN1Ym1pdCgpIHtcbiAgICBjb25zdCBuZXdVc2VyOiBQYXJ0aWFsPFVzZXI+ID0ge1xuICAgICAgdXNlcm5hbWU6IHRoaXMudXNlckZvcm0udmFsdWVbJ3VzZXJuYW1lJ10sXG4gICAgICBwYXNzd29yZDogdGhpcy51c2VyRm9ybS52YWx1ZVsncGFzc3dvcmQnXSxcbiAgICAgIGZpcnN0TmFtZTogdGhpcy51c2VyRm9ybS52YWx1ZVsnZmlyc3ROYW1lJ10sXG4gICAgICBsYXN0TmFtZTogdGhpcy51c2VyRm9ybS52YWx1ZVsnbGFzdE5hbWUnXSxcbiAgICAgIGVtYWlsOiB0aGlzLnVzZXJGb3JtLnZhbHVlWydlbWFpbCddLFxuICAgICAgZW50ZXJwcmlzZTogdGhpcy51c2VyRm9ybS52YWx1ZVsnZW50ZXJwcmlzZSddIHx8IG51bGxcbiAgICB9O1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IFNpZ25VcChuZXdVc2VyKSk7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKVxuICB9XG59XG4iXX0=