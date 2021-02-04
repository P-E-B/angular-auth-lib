import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { get } from '../../utils';
import { OpenForgottenPasswordDialog, LogIn } from '../../store/actions';
import { selectIsPasswordBeingChanged, selectIsLoginLoading } from '../../store/selectors';
import { AUTH_IMAGES_URLS, AUTH_TRADUCTIONS, AUTH_STYLES } from '../../token';
var LogInComponent = /** @class */ (function () {
    function LogInComponent(images, traductions, styles, formBuilder, store) {
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
    LogInComponent.prototype.ngOnInit = function () {
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
    };
    LogInComponent.prototype.openDialog = function () {
        this.store.dispatch(new OpenForgottenPasswordDialog());
    };
    LogInComponent.prototype.onSubmit = function () {
        var newUser = {
            username: this.userForm.value['username'],
            password: this.userForm.value['password']
        };
        this.store.dispatch(new LogIn(newUser));
    };
    LogInComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_IMAGES_URLS,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_TRADUCTIONS,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_STYLES,] }] },
        { type: FormBuilder },
        { type: Store }
    ]; };
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
    return LogInComponent;
}());
export { LogInComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLWluLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItYXV0aC1saWIvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2xvZy1pbi9sb2ctaW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUU1QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBSWxDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxLQUFLLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRixPQUFPLEVBQUUsZ0JBQWdCLEVBQW9CLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQU9oRztJQWFFLHdCQUNtQyxNQUFrQyxFQUNqQyxXQUE0QyxFQUNqRCxNQUFrQyxFQUN2RCxXQUF3QixFQUN4QixLQUF1QjtRQUpFLFdBQU0sR0FBTixNQUFNLENBQTRCO1FBQ2pDLGdCQUFXLEdBQVgsV0FBVyxDQUFpQztRQUNqRCxXQUFNLEdBQU4sTUFBTSxDQUE0QjtRQUN2RCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQWpCakMsNEJBQXVCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQztRQUNoRixvQkFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7UUFHaEUsd0JBQW1CLEdBQUcsVUFBVSxDQUFDO1FBQ2pDLHdCQUFtQixHQUFHLFVBQVUsQ0FBQztRQUNqQyxzQkFBaUIsR0FBRyx1QkFBdUIsQ0FBQztRQUU1QywwQkFBcUIsR0FBRyxRQUFRLENBQUM7UUFDakMsMkJBQXNCLEdBQUcsU0FBUyxDQUFDO1FBQ25DLGlCQUFZLEdBQUcsT0FBTyxDQUFDO0lBU3ZCLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFBRSwwQkFBMEIsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUM3RyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFLDBCQUEwQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzdHLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUUsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFMUcsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFBRSxlQUFlLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDdEcsSUFBSSxDQUFDLHNCQUFzQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRSx3QkFBd0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUM1RyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRTlFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDckMsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDbkMsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7U0FDcEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG1DQUFVLEdBQVY7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLDJCQUEyQixFQUFFLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUNFLElBQU0sT0FBTyxHQUFrQjtZQUM3QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1lBQ3pDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7U0FDMUMsQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7Z0RBakNFLE1BQU0sU0FBQyxnQkFBZ0I7Z0RBQ3ZCLE1BQU0sU0FBQyxnQkFBZ0I7Z0RBQ3ZCLE1BQU0sU0FBQyxXQUFXO2dCQUNFLFdBQVc7Z0JBQ2pCLEtBQUs7O0lBbEJYLGNBQWM7UUFMMUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQiw4dENBQXNDOztTQUV2QyxDQUFDO1FBZUcsV0FBQSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUN4QixXQUFBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQ3hCLFdBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO09BaEJYLGNBQWMsQ0FnRDFCO0lBQUQscUJBQUM7Q0FBQSxBQWhERCxJQWdEQztTQWhEWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFN0b3JlLCBzZWxlY3QgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5cbmltcG9ydCB7IGdldCB9IGZyb20gJy4uLy4uL3V0aWxzJztcblxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uL21vZGVscy91c2VyLm1vZGVscyc7XG5pbXBvcnQgeyBBdXRoU3RhdGUgfSBmcm9tICcuLi8uLi9zdG9yZS9yZWR1Y2VyJztcbmltcG9ydCB7IE9wZW5Gb3Jnb3R0ZW5QYXNzd29yZERpYWxvZywgTG9nSW4gfSBmcm9tICcuLi8uLi9zdG9yZS9hY3Rpb25zJztcbmltcG9ydCB7IHNlbGVjdElzUGFzc3dvcmRCZWluZ0NoYW5nZWQsIHNlbGVjdElzTG9naW5Mb2FkaW5nIH0gZnJvbSAnLi4vLi4vc3RvcmUvc2VsZWN0b3JzJztcbmltcG9ydCB7IEFVVEhfSU1BR0VTX1VSTFMsIEF1dGhNb2R1bGVDb25maWcsIEFVVEhfVFJBRFVDVElPTlMsIEFVVEhfU1RZTEVTIH0gZnJvbSAnLi4vLi4vdG9rZW4nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdXRoLWxpYi1sb2ctaW4nLFxuICB0ZW1wbGF0ZVVybDogJy4vbG9nLWluLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbG9nLWluLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTG9nSW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBpc1Bhc3N3b3JkQmVpbmdDaGFuZ2VkJCA9IHRoaXMuc3RvcmUucGlwZShzZWxlY3Qoc2VsZWN0SXNQYXNzd29yZEJlaW5nQ2hhbmdlZCkpO1xuICBpc0xvZ2luTG9hZGluZyQgPSB0aGlzLnN0b3JlLnBpcGUoc2VsZWN0KHNlbGVjdElzTG9naW5Mb2FkaW5nKSk7XG4gIHVzZXJGb3JtOiBGb3JtR3JvdXA7XG5cbiAgdXNlcm5hbWVQbGFjZWhvbGRlciA9ICdVc2VybmFtZSc7XG4gIHBhc3N3b3JkUGxhY2Vob2xkZXIgPSAnUGFzc3dvcmQnO1xuICBmb3Jnb3R0ZW5QYXNzd29yZCA9ICdGb3Jnb3QgeW91ciBwYXNzd29yZD8nO1xuXG4gIGxvZ2luQnV0dG9uVHJhZHVjdGlvbiA9ICdMb2cgaW4nO1xuICBidXR0b25zQmFja2dyb3VuZENvbG9yID0gJyMzZjUxYjUnO1xuICBidXR0b25zQ29sb3IgPSAnd2hpdGUnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoQVVUSF9JTUFHRVNfVVJMUykgcHVibGljIGltYWdlczogQXV0aE1vZHVsZUNvbmZpZ1snaW1hZ2VzJ10sXG4gICAgQEluamVjdChBVVRIX1RSQURVQ1RJT05TKSBwcml2YXRlIHRyYWR1Y3Rpb25zOiBBdXRoTW9kdWxlQ29uZmlnWyd0cmFkdWN0aW9ucyddLFxuICAgIEBJbmplY3QoQVVUSF9TVFlMRVMpIHByaXZhdGUgc3R5bGVzOiBBdXRoTW9kdWxlQ29uZmlnWydzdHlsZXMnXSxcbiAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIHN0b3JlOiBTdG9yZTxBdXRoU3RhdGU+XG4gICkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy51c2VybmFtZVBsYWNlaG9sZGVyID0gZ2V0KHRoaXMudHJhZHVjdGlvbnMgfHwge30sICdmb3JtLnVzZXJuYW1lUGxhY2Vob2xkZXInLCB0aGlzLnVzZXJuYW1lUGxhY2Vob2xkZXIpO1xuICAgIHRoaXMucGFzc3dvcmRQbGFjZWhvbGRlciA9IGdldCh0aGlzLnRyYWR1Y3Rpb25zIHx8IHt9LCAnZm9ybS5wYXNzd29yZFBsYWNlaG9sZGVyJywgdGhpcy5wYXNzd29yZFBsYWNlaG9sZGVyKTtcbiAgICB0aGlzLmZvcmdvdHRlblBhc3N3b3JkID0gZ2V0KHRoaXMudHJhZHVjdGlvbnMgfHwge30sICdidXR0b25zLnBhc3N3b3JkRm9yZ290dGVuJywgdGhpcy5mb3Jnb3R0ZW5QYXNzd29yZCk7XG5cbiAgICB0aGlzLmxvZ2luQnV0dG9uVHJhZHVjdGlvbiA9IGdldCh0aGlzLnRyYWR1Y3Rpb25zIHx8IHt9LCAnYnV0dG9ucy5sb2dpbicsIHRoaXMubG9naW5CdXR0b25UcmFkdWN0aW9uKTtcbiAgICB0aGlzLmJ1dHRvbnNCYWNrZ3JvdW5kQ29sb3IgPSBnZXQodGhpcy5zdHlsZXMgfHwge30sICdidXR0b25zQmFja2dyb3VuZENvbG9yJywgdGhpcy5idXR0b25zQmFja2dyb3VuZENvbG9yKTtcbiAgICB0aGlzLmJ1dHRvbnNDb2xvciA9IGdldCh0aGlzLnN0eWxlcyB8fCB7fSwgJ2J1dHRvbnNDb2xvcicsIHRoaXMuYnV0dG9uc0NvbG9yKTtcblxuICAgIHRoaXMudXNlckZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcbiAgICAgIHVzZXJuYW1lOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgcGFzc3dvcmQ6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF1cbiAgICB9KTtcbiAgfVxuXG4gIG9wZW5EaWFsb2coKSB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgT3BlbkZvcmdvdHRlblBhc3N3b3JkRGlhbG9nKCkpO1xuICB9XG5cbiAgb25TdWJtaXQoKSB7XG4gICAgY29uc3QgbmV3VXNlcjogUGFydGlhbDxVc2VyPiA9IHtcbiAgICAgIHVzZXJuYW1lOiB0aGlzLnVzZXJGb3JtLnZhbHVlWyd1c2VybmFtZSddLFxuICAgICAgcGFzc3dvcmQ6IHRoaXMudXNlckZvcm0udmFsdWVbJ3Bhc3N3b3JkJ11cbiAgICB9O1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IExvZ0luKG5ld1VzZXIpKTtcbiAgfVxufVxuIl19