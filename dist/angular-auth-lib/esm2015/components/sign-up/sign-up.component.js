import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { get } from '../../utils';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi11cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWF1dGgtbGliLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zaWduLXVwL3NpZ24tdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVwQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBSWxDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQW9CLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQU85RSxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBZ0IxQixZQUNvQyxXQUE0QyxFQUNqRCxNQUFrQyxFQUN4RCxTQUF3QyxFQUN2QyxXQUF3QixFQUN4QixLQUF1QjtRQUpHLGdCQUFXLEdBQVgsV0FBVyxDQUFpQztRQUNqRCxXQUFNLEdBQU4sTUFBTSxDQUE0QjtRQUN4RCxjQUFTLEdBQVQsU0FBUyxDQUErQjtRQUN2QyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQWxCakMsd0JBQW1CLEdBQUcsVUFBVSxDQUFDO1FBQ2pDLHdCQUFtQixHQUFHLFVBQVUsQ0FBQztRQUNqQyx5QkFBb0IsR0FBRyxZQUFZLENBQUM7UUFDcEMsd0JBQW1CLEdBQUcsV0FBVyxDQUFDO1FBQ2xDLHFCQUFnQixHQUFHLE9BQU8sQ0FBQztRQUMzQiwwQkFBcUIsR0FBRyxZQUFZLENBQUM7UUFF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QUFDO1lBQ3pDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDbkMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUk7U0FDdEQsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUN4QixDQUFDO0NBQ0YsQ0FBQTs7NENBM0NJLE1BQU0sU0FBQyxnQkFBZ0I7NENBQ3ZCLE1BQU0sU0FBQyxXQUFXO1lBQ0QsWUFBWTtZQUNULFdBQVc7WUFDakIsS0FBSzs7QUFyQlgsZUFBZTtJQUwzQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLHN3REFBdUM7O0tBRXhDLENBQUM7SUFrQkcsV0FBQSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtJQUN4QixXQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtHQWxCWCxlQUFlLENBNEQzQjtTQTVEWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUJ1aWxkZXIsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcblxuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuXG5pbXBvcnQgeyBBdXRoU3RhdGUgfSBmcm9tICcuLi8uLi9zdG9yZS9yZWR1Y2VyJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi9tb2RlbHMvdXNlci5tb2RlbHMnO1xuaW1wb3J0IHsgU2lnblVwIH0gZnJvbSAnLi4vLi4vc3RvcmUvYWN0aW9ucyc7XG5pbXBvcnQgeyBBVVRIX1RSQURVQ1RJT05TLCBBdXRoTW9kdWxlQ29uZmlnLCBBVVRIX1NUWUxFUyB9IGZyb20gJy4uLy4uL3Rva2VuJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXV0aC1saWItc2lnbi11cCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zaWduLXVwLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2lnbi11cC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNpZ25VcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHVzZXJGb3JtOiBGb3JtR3JvdXA7XG5cbiAgdXNlcm5hbWVQbGFjZWhvbGRlciA9ICdVc2VybmFtZSc7XG4gIHBhc3N3b3JkUGxhY2Vob2xkZXIgPSAnUGFzc3dvcmQnO1xuICBmaXJzdE5hbWVQbGFjZWhvbGRlciA9ICdGaXJzdCBuYW1lJztcbiAgbGFzdE5hbWVQbGFjZWhvbGRlciA9ICdMYXN0IG5hbWUnO1xuICBlbWFpbFBsYWNlaG9sZGVyID0gJ0VtYWlsJztcbiAgZW50ZXJwcmlzZVBsYWNlaG9sZGVyID0gJ0VudGVycHJpc2UnO1xuXG4gIHNpZ25VcERpYWxvZ1RpdGxlID0gJ1NpZ24gVXAnO1xuXG4gIHNpZ251cEJ1dHRvblRyYWR1Y3Rpb24gPSAnTG9nIGluJztcbiAgYnV0dG9uc0JhY2tncm91bmRDb2xvciA9ICcjM2Y1MWI1JztcbiAgYnV0dG9uc0NvbG9yID0gJ3doaXRlJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEFVVEhfVFJBRFVDVElPTlMpIHByaXZhdGUgdHJhZHVjdGlvbnM6IEF1dGhNb2R1bGVDb25maWdbJ3RyYWR1Y3Rpb25zJ10sXG4gICAgQEluamVjdChBVVRIX1NUWUxFUykgcHJpdmF0ZSBzdHlsZXM6IEF1dGhNb2R1bGVDb25maWdbJ3N0eWxlcyddLFxuICAgIHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxTaWduVXBDb21wb25lbnQ+LFxuICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgc3RvcmU6IFN0b3JlPEF1dGhTdGF0ZT5cbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnVzZXJuYW1lUGxhY2Vob2xkZXIgPSBnZXQodGhpcy50cmFkdWN0aW9ucyB8fCB7fSwgJ2Zvcm0udXNlcm5hbWVQbGFjZWhvbGRlcicsIHRoaXMudXNlcm5hbWVQbGFjZWhvbGRlcik7XG4gICAgdGhpcy5wYXNzd29yZFBsYWNlaG9sZGVyID0gZ2V0KHRoaXMudHJhZHVjdGlvbnMgfHwge30sICdmb3JtLnBhc3N3b3JkUGxhY2Vob2xkZXInLCB0aGlzLnBhc3N3b3JkUGxhY2Vob2xkZXIpO1xuICAgIHRoaXMuZmlyc3ROYW1lUGxhY2Vob2xkZXIgPSBnZXQodGhpcy50cmFkdWN0aW9ucyB8fCB7fSwgJ2Zvcm0uZmlyc3ROYW1lUGxhY2Vob2xkZXInLCB0aGlzLmZpcnN0TmFtZVBsYWNlaG9sZGVyKTtcbiAgICB0aGlzLmxhc3ROYW1lUGxhY2Vob2xkZXIgPSBnZXQodGhpcy50cmFkdWN0aW9ucyB8fCB7fSwgJ2Zvcm0ubGFzdE5hbWVQbGFjZWhvbGRlcicsIHRoaXMubGFzdE5hbWVQbGFjZWhvbGRlcik7XG4gICAgdGhpcy5lbWFpbFBsYWNlaG9sZGVyID0gZ2V0KHRoaXMudHJhZHVjdGlvbnMgfHwge30sICdmb3JtLmVtYWlsUGxhY2Vob2xkZXInLCB0aGlzLmVtYWlsUGxhY2Vob2xkZXIpO1xuICAgIHRoaXMuZW50ZXJwcmlzZVBsYWNlaG9sZGVyID0gZ2V0KHRoaXMudHJhZHVjdGlvbnMgfHwge30sICdmb3JtLmVudGVycHJpc2VQbGFjZWhvbGRlcicsIHRoaXMuZW50ZXJwcmlzZVBsYWNlaG9sZGVyKTtcblxuICAgIHRoaXMuc2lnblVwRGlhbG9nVGl0bGUgPSBnZXQodGhpcy50cmFkdWN0aW9ucyB8fCB7fSwgJ2RpYWxvZ3Muc2lnbnVwJywgdGhpcy5zaWduVXBEaWFsb2dUaXRsZSk7XG5cbiAgICB0aGlzLnNpZ251cEJ1dHRvblRyYWR1Y3Rpb24gPSBnZXQodGhpcy50cmFkdWN0aW9ucyB8fCB7fSwgJ2J1dHRvbnMuc2lnbnVwJywgdGhpcy5zaWdudXBCdXR0b25UcmFkdWN0aW9uKTtcbiAgICB0aGlzLmJ1dHRvbnNCYWNrZ3JvdW5kQ29sb3IgPSBnZXQodGhpcy5zdHlsZXMgfHwge30sICdidXR0b25zQmFja2dyb3VuZENvbG9yJywgdGhpcy5idXR0b25zQmFja2dyb3VuZENvbG9yKTtcbiAgICB0aGlzLmJ1dHRvbnNDb2xvciA9IGdldCh0aGlzLnN0eWxlcyB8fCB7fSwgJ2J1dHRvbnNDb2xvcicsIHRoaXMuYnV0dG9uc0NvbG9yKTtcblxuICAgIHRoaXMudXNlckZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIHVzZXJuYW1lOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgcGFzc3dvcmQ6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICBmaXJzdE5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICBsYXN0TmFtZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIGVtYWlsOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgZW50ZXJwcmlzZTogJydcbiAgICB9KTtcbiAgfVxuXG4gIG9uU3VibWl0KCkge1xuICAgIGNvbnN0IG5ld1VzZXI6IFBhcnRpYWw8VXNlcj4gPSB7XG4gICAgICB1c2VybmFtZTogdGhpcy51c2VyRm9ybS52YWx1ZVsndXNlcm5hbWUnXSxcbiAgICAgIHBhc3N3b3JkOiB0aGlzLnVzZXJGb3JtLnZhbHVlWydwYXNzd29yZCddLFxuICAgICAgZmlyc3ROYW1lOiB0aGlzLnVzZXJGb3JtLnZhbHVlWydmaXJzdE5hbWUnXSxcbiAgICAgIGxhc3ROYW1lOiB0aGlzLnVzZXJGb3JtLnZhbHVlWydsYXN0TmFtZSddLFxuICAgICAgZW1haWw6IHRoaXMudXNlckZvcm0udmFsdWVbJ2VtYWlsJ10sXG4gICAgICBlbnRlcnByaXNlOiB0aGlzLnVzZXJGb3JtLnZhbHVlWydlbnRlcnByaXNlJ10gfHwgbnVsbFxuICAgIH07XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgU2lnblVwKG5ld1VzZXIpKTtcbiAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpXG4gIH1cbn1cbiJdfQ==