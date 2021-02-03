import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import get from 'lodash-es/get';
import { SignUp } from '../../store/actions';
import { AUTH_TRADUCTIONS, AUTH_STYLES } from '../../token';
let SignUpComponent = class SignUpComponent {
    constructor(traductions, styles, dialogRef, formBuilder, store) {
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
    onSubmit() {
        const newUser = {
            username: this.userForm.value['username'],
            password: this.userForm.value['password'],
            firstName: this.userForm.value['firstName'],
            lastName: this.userForm.value['lastName'],
            email: this.userForm.value['email'],
            enterprise: this.userForm.value['enterprise'] || null
        };
        this.store.dispatch(new SignUp(newUser));
        this.dialogRef.close();
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
        template: "<div id=\"container\">\n    <h2 mat-dialog-title>{{ signUpDialogTitle }}</h2>\n    <form [formGroup]=\"userForm\" (ngSubmit)=\"onSubmit()\">\n\n        <div id=\"columns\">\n            <div id=\"left-column\">\n                <mat-form-field>\n                    <input matInput [placeholder]=\"usernamePlaceholder\" formControlName=\"username\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"firstNamePlaceholder\" formControlName=\"firstName\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"emailPlaceholder\" formControlName=\"email\" autocomplete=\"off\">\n                </mat-form-field>\n            </div>\n\n            <div id=\"right-column\">\n                <mat-form-field>\n                    <input matInput type=\"password\" [placeholder]=\"passwordPlaceholder\" formControlName=\"password\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"lastNamePlaceholder\" formControlName=\"lastName\" autocomplete=\"off\">\n                </mat-form-field>\n                <mat-form-field>\n                    <input matInput [placeholder]=\"enterprisePlaceholder\" formControlName=\"enterprise\" autocomplete=\"off\">\n                </mat-form-field>\n            </div>\n        </div>\n\n        <button mat-raised-button type=\"submit\" [disabled]=\"userForm.invalid\" [ngStyle]=\"{\n            'background-color': buttonsBackgroundColor,\n            'color': buttonsColor\n          }\">\n            {{ signupButtonTraduction }}\n        </button>\n    </form>\n</div>\n",
        styles: ["#container{display:flex;flex-direction:column;width:600px}#container form{margin-top:20px;display:flex;flex-direction:column;justify-content:space-between}#container form #columns{display:flex;flex-direction:row;justify-content:space-between}#container form #columns #left-column{margin-right:20px}#container form #columns #left-column,#container form #columns #right-column{display:flex;flex-direction:column;justify-content:space-between;width:100%}#container form #columns mat-form-field{width:100%}#container button{margin-top:20px;-ms-grid-row-align:center;align-self:center}"]
    }),
    __param(0, Inject(AUTH_TRADUCTIONS)),
    __param(1, Inject(AUTH_STYLES))
], SignUpComponent);
export { SignUpComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi11cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWF1dGgtbGliLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zaWduLXVwL3NpZ24tdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVwQyxPQUFPLEdBQUcsTUFBTSxlQUFlLENBQUM7QUFJaEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBb0IsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBTzlFLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFnQjFCLFlBQ29DLFdBQTRDLEVBQ2pELE1BQWtDLEVBQ3hELFNBQXdDLEVBQ3ZDLFdBQXdCLEVBQ3hCLEtBQXVCO1FBSkcsZ0JBQVcsR0FBWCxXQUFXLENBQWlDO1FBQ2pELFdBQU0sR0FBTixNQUFNLENBQTRCO1FBQ3hELGNBQVMsR0FBVCxTQUFTLENBQStCO1FBQ3ZDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBbEJqQyx3QkFBbUIsR0FBRyxVQUFVLENBQUM7UUFDakMsd0JBQW1CLEdBQUcsVUFBVSxDQUFDO1FBQ2pDLHlCQUFvQixHQUFHLFlBQVksQ0FBQztRQUNwQyx3QkFBbUIsR0FBRyxXQUFXLENBQUM7UUFDbEMscUJBQWdCLEdBQUcsT0FBTyxDQUFDO1FBQzNCLDBCQUFxQixHQUFHLFlBQVksQ0FBQztRQUVyQyxzQkFBaUIs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S0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUNuQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksSUFBSTtTQUN0RCxDQUFDO1FBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ3hCLENBQUM7Q0FDRixDQUFBOzs0Q0EzQ0ksTUFBTSxTQUFDLGdCQUFnQjs0Q0FDdkIsTUFBTSxTQUFDLFdBQVc7WUFDRCxZQUFZO1lBQ1QsV0FBVztZQUNqQixLQUFLOztBQXJCWCxlQUFlO0lBTDNCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsc3dEQUF1Qzs7S0FFeEMsQ0FBQztJQWtCRyxXQUFBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQ3hCLFdBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0dBbEJYLGVBQWUsQ0E0RDNCO1NBNURZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuXG5pbXBvcnQgZ2V0IGZyb20gJ2xvZGFzaC1lcy9nZXQnO1xuXG5pbXBvcnQgeyBBdXRoU3RhdGUgfSBmcm9tICcuLi8uLi9zdG9yZS9yZWR1Y2VyJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvdXNlci5tb2RlbHMnO1xuaW1wb3J0IHsgU2lnblVwIH0gZnJvbSAnLi4vLi4vc3RvcmUvYWN0aW9ucyc7XG5pbXBvcnQgeyBBVVRIX1RSQURVQ1RJT05TLCBBdXRoTW9kdWxlQ29uZmlnLCBBVVRIX1NUWUxFUyB9IGZyb20gJy4uLy4uL3Rva2VuJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXV0aC1saWItc2lnbi11cCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zaWduLXVwLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2lnbi11cC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNpZ25VcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHVzZXJGb3JtOiBGb3JtR3JvdXA7XG5cbiAgdXNlcm5hbWVQbGFjZWhvbGRlciA9ICdVc2VybmFtZSc7XG4gIHBhc3N3b3JkUGxhY2Vob2xkZXIgPSAnUGFzc3dvcmQnO1xuICBmaXJzdE5hbWVQbGFjZWhvbGRlciA9ICdGaXJzdCBuYW1lJztcbiAgbGFzdE5hbWVQbGFjZWhvbGRlciA9ICdMYXN0IG5hbWUnO1xuICBlbWFpbFBsYWNlaG9sZGVyID0gJ0VtYWlsJztcbiAgZW50ZXJwcmlzZVBsYWNlaG9sZGVyID0gJ0VudGVycHJpc2UnO1xuXG4gIHNpZ25VcERpYWxvZ1RpdGxlID0gJ1NpZ24gVXAnO1xuXG4gIHNpZ251cEJ1dHRvblRyYWR1Y3Rpb24gPSAnTG9nIGluJztcbiAgYnV0dG9uc0JhY2tncm91bmRDb2xvciA9ICcjM2Y1MWI1JztcbiAgYnV0dG9uc0NvbG9yID0gJ3doaXRlJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEFVVEhfVFJBRFVDVElPTlMpIHByaXZhdGUgdHJhZHVjdGlvbnM6IEF1dGhNb2R1bGVDb25maWdbJ3RyYWR1Y3Rpb25zJ10sXG4gICAgQEluamVjdChBVVRIX1NUWUxFUykgcHJpdmF0ZSBzdHlsZXM6IEF1dGhNb2R1bGVDb25maWdbJ3N0eWxlcyddLFxuICAgIHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxTaWduVXBDb21wb25lbnQ+LFxuICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgc3RvcmU6IFN0b3JlPEF1dGhTdGF0ZT5cbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnVzZXJuYW1lUGxhY2Vob2xkZXIgPSBnZXQodGhpcy50cmFkdWN0aW9ucyB8fCB7fSwgJ2Zvcm0udXNlcm5hbWVQbGFjZWhvbGRlcicsIHRoaXMudXNlcm5hbWVQbGFjZWhvbGRlcik7XG4gICAgdGhpcy5wYXNzd29yZFBsYWNlaG9sZGVyID0gZ2V0KHRoaXMudHJhZHVjdGlvbnMgfHwge30sICdmb3JtLnBhc3N3b3JkUGxhY2Vob2xkZXInLCB0aGlzLnBhc3N3b3JkUGxhY2Vob2xkZXIpO1xuICAgIHRoaXMuZmlyc3ROYW1lUGxhY2Vob2xkZXIgPSBnZXQodGhpcy50cmFkdWN0aW9ucyB8fCB7fSwgJ2Zvcm0uZmlyc3ROYW1lUGxhY2Vob2xkZXInLCB0aGlzLmZpcnN0TmFtZVBsYWNlaG9sZGVyKTtcbiAgICB0aGlzLmxhc3ROYW1lUGxhY2Vob2xkZXIgPSBnZXQodGhpcy50cmFkdWN0aW9ucyB8fCB7fSwgJ2Zvcm0ubGFzdE5hbWVQbGFjZWhvbGRlcicsIHRoaXMubGFzdE5hbWVQbGFjZWhvbGRlcik7XG4gICAgdGhpcy5lbWFpbFBsYWNlaG9sZGVyID0gZ2V0KHRoaXMudHJhZHVjdGlvbnMgfHwge30sICdmb3JtLmVtYWlsUGxhY2Vob2xkZXInLCB0aGlzLmVtYWlsUGxhY2Vob2xkZXIpO1xuICAgIHRoaXMuZW50ZXJwcmlzZVBsYWNlaG9sZGVyID0gZ2V0KHRoaXMudHJhZHVjdGlvbnMgfHwge30sICdmb3JtLmVudGVycHJpc2VQbGFjZWhvbGRlcicsIHRoaXMuZW50ZXJwcmlzZVBsYWNlaG9sZGVyKTtcblxuICAgIHRoaXMuc2lnblVwRGlhbG9nVGl0bGUgPSBnZXQodGhpcy50cmFkdWN0aW9ucyB8fCB7fSwgJ2RpYWxvZ3Muc2lnbnVwJywgdGhpcy5zaWduVXBEaWFsb2dUaXRsZSk7XG5cbiAgICB0aGlzLnNpZ251cEJ1dHRvblRyYWR1Y3Rpb24gPSBnZXQodGhpcy50cmFkdWN0aW9ucyB8fCB7fSwgJ2J1dHRvbnMuc2lnbnVwJywgdGhpcy5zaWdudXBCdXR0b25UcmFkdWN0aW9uKTtcbiAgICB0aGlzLmJ1dHRvbnNCYWNrZ3JvdW5kQ29sb3IgPSBnZXQodGhpcy5zdHlsZXMgfHwge30sICdidXR0b25zQmFja2dyb3VuZENvbG9yJywgdGhpcy5idXR0b25zQmFja2dyb3VuZENvbG9yKTtcbiAgICB0aGlzLmJ1dHRvbnNDb2xvciA9IGdldCh0aGlzLnN0eWxlcyB8fCB7fSwgJ2J1dHRvbnNDb2xvcicsIHRoaXMuYnV0dG9uc0NvbG9yKTtcblxuICAgIHRoaXMudXNlckZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIHVzZXJuYW1lOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgcGFzc3dvcmQ6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICBmaXJzdE5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICBsYXN0TmFtZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIGVtYWlsOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgZW50ZXJwcmlzZTogJydcbiAgICB9KTtcbiAgfVxuXG4gIG9uU3VibWl0KCkge1xuICAgIGNvbnN0IG5ld1VzZXI6IFBhcnRpYWw8VXNlcj4gPSB7XG4gICAgICB1c2VybmFtZTogdGhpcy51c2VyRm9ybS52YWx1ZVsndXNlcm5hbWUnXSxcbiAgICAgIHBhc3N3b3JkOiB0aGlzLnVzZXJGb3JtLnZhbHVlWydwYXNzd29yZCddLFxuICAgICAgZmlyc3ROYW1lOiB0aGlzLnVzZXJGb3JtLnZhbHVlWydmaXJzdE5hbWUnXSxcbiAgICAgIGxhc3ROYW1lOiB0aGlzLnVzZXJGb3JtLnZhbHVlWydsYXN0TmFtZSddLFxuICAgICAgZW1haWw6IHRoaXMudXNlckZvcm0udmFsdWVbJ2VtYWlsJ10sXG4gICAgICBlbnRlcnByaXNlOiB0aGlzLnVzZXJGb3JtLnZhbHVlWydlbnRlcnByaXNlJ10gfHwgbnVsbFxuICAgIH07XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgU2lnblVwKG5ld1VzZXIpKTtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpXG4gIH1cbn1cbiJdfQ==