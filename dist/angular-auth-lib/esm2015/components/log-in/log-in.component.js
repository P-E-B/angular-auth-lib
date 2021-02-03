import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import get from 'lodash-es/get';
import { OpenForgottenPasswordDialog, LogIn } from '../../store/actions';
import { selectIsPasswordBeingChanged, selectIsLoginLoading } from '../../store/selectors';
import { AUTH_IMAGES_URLS, AUTH_TRADUCTIONS, AUTH_STYLES } from '../../token';
let LogInComponent = class LogInComponent {
    constructor(images, traductions, styles, formBuilder, store) {
        this.images = images;
        this.traductions = traductions;
        this.styles = styles;
        this.formBuilder = formBuilder;
        this.store = store;
        this.isPasswordBeingChanged$ = this.store.pipe(select(selectIsPasswordBeingChanged));
        this.isLoginLoading$ = this.store.pipe(select(selectIsLoginLoading));
        this.usernamePlaceholder = 'Username';
        this.passwordPlaceholder = 'Password';
        this.forgottenPassword = 'Forgot your password?';
        this.loginButtonTraduction = 'Log in';
        this.buttonsBackgroundColor = '#3f51b5';
        this.buttonsColor = 'white';
    }
    ngOnInit() {
        this.usernamePlaceholder = get(this.traductions || {}, 'form.usernamePlaceholder', this.usernamePlaceholder);
        this.passwordPlaceholder = get(this.traductions || {}, 'form.passwordPlaceholder', this.passwordPlaceholder);
        this.forgottenPassword = get(this.traductions || {}, 'buttons.passwordForgotten', this.forgottenPassword);
        this.loginButtonTraduction = get(this.traductions || {}, 'buttons.login', this.loginButtonTraduction);
        this.buttonsBackgroundColor = get(this.styles || {}, 'buttonsBackgroundColor', this.buttonsBackgroundColor);
        this.buttonsColor = get(this.styles || {}, 'buttonsColor', this.buttonsColor);
        this.userForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    openDialog() {
        this.store.dispatch(new OpenForgottenPasswordDialog());
    }
    onSubmit() {
        const newUser = {
            username: this.userForm.value['username'],
            password: this.userForm.value['password']
        };
        this.store.dispatch(new LogIn(newUser));
    }
};
LogInComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_IMAGES_URLS,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_TRADUCTIONS,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_STYLES,] }] },
    { type: FormBuilder },
    { type: Store }
];
LogInComponent = __decorate([
    Component({
        selector: 'auth-lib-log-in',
        template: "<div id=\"container\" [ngStyle]=\"{'background-image': 'url(' + images.loginBackgroundImageUrl + ')'}\">\n  <mat-card class=\"mat-elevation-z8\">\n    <img *ngIf=\"images.logoImageUrl && images.logoImageUrl.length >= 1\" [src]=\"images.logoImageUrl\">\n    <form [formGroup]=\"userForm\" (ngSubmit)=\"onSubmit()\">\n\n      <mat-form-field>\n        <input matInput [placeholder]=\"usernamePlaceholder\" formControlName=\"username\">\n      </mat-form-field>\n\n      <mat-form-field>\n          <input matInput type=\"password\" [placeholder]=\"passwordPlaceholder\" formControlName=\"password\">\n      </mat-form-field>\n\n      <button \n        mat-raised-button\n        type=\"submit\" \n        [disabled]=\"userForm.invalid\"\n        *ngIf=\"!(isPasswordBeingChanged$ | async) && !(isLoginLoading$ | async)\"\n        [ngStyle]=\"{\n          'background-color': buttonsBackgroundColor,\n          'color': buttonsColor\n        }\"\n      >\n        {{ loginButtonTraduction }}\n      </button>\n      <mat-spinner *ngIf=\"(isPasswordBeingChanged$ | async) || (isLoginLoading$ | async)\" [diameter]=\"36\"></mat-spinner>\n\n      <a (click)=\"openDialog()\">{{ forgottenPassword }}</a>\n    </form>\n  </mat-card>\n</div>\n",
        styles: ["#container{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;width:100%;flex:1;background-size:cover}#container mat-card{display:flex;flex-direction:column;justify-content:center;align-items:center;height:400px;width:400px;box-sizing:border-box;padding:2%}#container mat-card img{display:block;max-width:200px;max-height:100px;width:auto;height:auto;margin-bottom:20px}#container mat-card form{display:flex;flex:1;flex-direction:column;justify-content:center;align-items:center;width:100%}#container mat-card form mat-form-field{width:75%;font-size:16px}#container mat-card form a,#container mat-card form button,#container mat-card form mat-spinner{margin-top:20px}#container mat-card form a{cursor:pointer;color:#1e90ff;font-size:16px}"]
    }),
    __param(0, Inject(AUTH_IMAGES_URLS)),
    __param(1, Inject(AUTH_TRADUCTIONS)),
    __param(2, Inject(AUTH_STYLES))
], LogInComponent);
export { LogInComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLWluLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItYXV0aC1saWIvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2xvZy1pbi9sb2ctaW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUU1QyxPQUFPLEdBQUcsTUFBTSxlQUFlLENBQUM7QUFJaEMsT0FBTyxFQUFFLDJCQUEyQixFQUFFLEtBQUssRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzNGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBb0IsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBT2hHLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFhekIsWUFDbUMsTUFBa0MsRUFDakMsV0FBNEMsRUFDakQsTUFBa0MsRUFDdkQsV0FBd0IsRUFDeEIsS0FBdUI7UUFKRSxXQUFNLEdBQU4sTUFBTSxDQUE0QjtRQUNqQyxnQkFBVyxHQUFYLFdBQVcsQ0FBaUM7UUFDakQsV0FBTSxHQUFOLE1BQU0sQ0FBNEI7UUFDdkQsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFqQmpDLDRCQUF1QixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7UUFDaEYsb0JBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1FBR2hFLHdCQUFtQixHQUFHLFVBQVUsQ0FBQztRQUNqQyx3QkFBbUIsR0FBRyxVQUFVLENBQUM7UUFDakMsc0JBQWlCLEdBQUcsdUJBQXVCLENBQUM7UUFFNUMsMEJBQXFCLEdBQUcsUUFBUSxDQUFDO1FBQ2pDLDJCQUFzQixHQUFHLFNBQVMsQ0FBQztRQUNuQyxpQkFBWSxHQUFHLE9BQU8sQ0FBQztJQVN2QixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUUsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDN0csSUFBSSxDQUFDLG1CQUFtQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFBRSwwQkFBMEIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUM3RyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFLDJCQUEyQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRTFHLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3RHLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLEVBQUUsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDNUcsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUU5RSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ3JDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO1lBQ25DLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO1NBQ3BDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSwyQkFBMkIsRUFBRSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELFFBQVE7UUFDTixNQUFNLE9BQU8sR0FBa0I7WUFDN0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztZQUN6QyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1NBQzFDLENBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7Q0FDRixDQUFBOzs0Q0FsQ0ksTUFBTSxTQUFDLGdCQUFnQjs0Q0FDdkIsTUFBTSxTQUFDLGdCQUFnQjs0Q0FDdkIsTUFBTSxTQUFDLFdBQVc7WUFDRSxXQUFXO1lBQ2pCLEtBQUs7O0FBbEJYLGNBQWM7SUFMMUIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQiw4dENBQXNDOztLQUV2QyxDQUFDO0lBZUcsV0FBQSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtJQUN4QixXQUFBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQ3hCLFdBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0dBaEJYLGNBQWMsQ0FnRDFCO1NBaERZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3RvcmUsIHNlbGVjdCB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcblxuaW1wb3J0IGdldCBmcm9tICdsb2Rhc2gtZXMvZ2V0JztcblxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uL21vZGVscy91c2VyLm1vZGVscyc7XG5pbXBvcnQgeyBBdXRoU3RhdGUgfSBmcm9tICcuLi8uLi9zdG9yZS9yZWR1Y2VyJztcbmltcG9ydCB7IE9wZW5Gb3Jnb3R0ZW5QYXNzd29yZERpYWxvZywgTG9nSW4gfSBmcm9tICcuLi8uLi9zdG9yZS9hY3Rpb25zJztcbmltcG9ydCB7IHNlbGVjdElzUGFzc3dvcmRCZWluZ0NoYW5nZWQsIHNlbGVjdElzTG9naW5Mb2FkaW5nIH0gZnJvbSAnLi4vLi4vc3RvcmUvc2VsZWN0b3JzJztcbmltcG9ydCB7IEFVVEhfSU1BR0VTX1VSTFMsIEF1dGhNb2R1bGVDb25maWcsIEFVVEhfVFJBRFVDVElPTlMsIEFVVEhfU1RZTEVTIH0gZnJvbSAnLi4vLi4vdG9rZW4nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdXRoLWxpYi1sb2ctaW4nLFxuICB0ZW1wbGF0ZVVybDogJy4vbG9nLWluLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbG9nLWluLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTG9nSW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBpc1Bhc3N3b3JkQmVpbmdDaGFuZ2VkJCA9IHRoaXMuc3RvcmUucGlwZShzZWxlY3Qoc2VsZWN0SXNQYXNzd29yZEJlaW5nQ2hhbmdlZCkpO1xuICBpc0xvZ2luTG9hZGluZyQgPSB0aGlzLnN0b3JlLnBpcGUoc2VsZWN0KHNlbGVjdElzTG9naW5Mb2FkaW5nKSk7XG4gIHVzZXJGb3JtOiBGb3JtR3JvdXA7XG5cbiAgdXNlcm5hbWVQbGFjZWhvbGRlciA9ICdVc2VybmFtZSc7XG4gIHBhc3N3b3JkUGxhY2Vob2xkZXIgPSAnUGFzc3dvcmQnO1xuICBmb3Jnb3R0ZW5QYXNzd29yZCA9ICdGb3Jnb3QgeW91ciBwYXNzd29yZD8nO1xuXG4gIGxvZ2luQnV0dG9uVHJhZHVjdGlvbiA9ICdMb2cgaW4nO1xuICBidXR0b25zQmFja2dyb3VuZENvbG9yID0gJyMzZjUxYjUnO1xuICBidXR0b25zQ29sb3IgPSAnd2hpdGUnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoQVVUSF9JTUFHRVNfVVJMUykgcHVibGljIGltYWdlczogQXV0aE1vZHVsZUNvbmZpZ1snaW1hZ2VzJ10sXG4gICAgQEluamVjdChBVVRIX1RSQURVQ1RJT05TKSBwcml2YXRlIHRyYWR1Y3Rpb25zOiBBdXRoTW9kdWxlQ29uZmlnWyd0cmFkdWN0aW9ucyddLFxuICAgIEBJbmplY3QoQVVUSF9TVFlMRVMpIHByaXZhdGUgc3R5bGVzOiBBdXRoTW9kdWxlQ29uZmlnWydzdHlsZXMnXSxcbiAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIHN0b3JlOiBTdG9yZTxBdXRoU3RhdGU+XG4gICkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy51c2VybmFtZVBsYWNlaG9sZGVyID0gZ2V0KHRoaXMudHJhZHVjdGlvbnMgfHwge30sICdmb3JtLnVzZXJuYW1lUGxhY2Vob2xkZXInLCB0aGlzLnVzZXJuYW1lUGxhY2Vob2xkZXIpO1xuICAgIHRoaXMucGFzc3dvcmRQbGFjZWhvbGRlciA9IGdldCh0aGlzLnRyYWR1Y3Rpb25zIHx8IHt9LCAnZm9ybS5wYXNzd29yZFBsYWNlaG9sZGVyJywgdGhpcy5wYXNzd29yZFBsYWNlaG9sZGVyKTtcbiAgICB0aGlzLmZvcmdvdHRlblBhc3N3b3JkID0gZ2V0KHRoaXMudHJhZHVjdGlvbnMgfHwge30sICdidXR0b25zLnBhc3N3b3JkRm9yZ290dGVuJywgdGhpcy5mb3Jnb3R0ZW5QYXNzd29yZCk7XG5cbiAgICB0aGlzLmxvZ2luQnV0dG9uVHJhZHVjdGlvbiA9IGdldCh0aGlzLnRyYWR1Y3Rpb25zIHx8IHt9LCAnYnV0dG9ucy5sb2dpbicsIHRoaXMubG9naW5CdXR0b25UcmFkdWN0aW9uKTtcbiAgICB0aGlzLmJ1dHRvbnNCYWNrZ3JvdW5kQ29sb3IgPSBnZXQodGhpcy5zdHlsZXMgfHwge30sICdidXR0b25zQmFja2dyb3VuZENvbG9yJywgdGhpcy5idXR0b25zQmFja2dyb3VuZENvbG9yKTtcbiAgICB0aGlzLmJ1dHRvbnNDb2xvciA9IGdldCh0aGlzLnN0eWxlcyB8fCB7fSwgJ2J1dHRvbnNDb2xvcicsIHRoaXMuYnV0dG9uc0NvbG9yKTtcblxuICAgIHRoaXMudXNlckZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIHVzZXJuYW1lOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgcGFzc3dvcmQ6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF1cbiAgICB9KTtcbiAgfVxuXG4gIG9wZW5EaWFsb2coKSB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgT3BlbkZvcmdvdHRlblBhc3N3b3JkRGlhbG9nKCkpO1xuICB9XG5cbiAgb25TdWJtaXQoKSB7XG4gICAgY29uc3QgbmV3VXNlcjogUGFydGlhbDxVc2VyPiA9IHtcbiAgICAgIHVzZXJuYW1lOiB0aGlzLnVzZXJGb3JtLnZhbHVlWyd1c2VybmFtZSddLFxuICAgICAgcGFzc3dvcmQ6IHRoaXMudXNlckZvcm0udmFsdWVbJ3Bhc3N3b3JkJ11cbiAgICB9O1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IExvZ0luKG5ld1VzZXIpKTtcbiAgfVxufVxuIl19