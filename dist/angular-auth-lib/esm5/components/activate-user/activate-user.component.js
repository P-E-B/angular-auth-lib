import { __decorate, __param } from "tslib";
import { Component, ViewChild, Inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { get } from '../../utils';
import { AUTH_TRADUCTIONS, AUTH_STYLES, AUTH_IMAGES_URLS } from '../../token';
import { SendActivationCode } from '../../store/actions';
import { selectIsSendActivationCodeLoading } from '../../store/selectors';
import { ActivatedRoute } from '@angular/router';
var ActivateUserComponent = /** @class */ (function () {
    function ActivateUserComponent(store, route, traductions, styles, images) {
        this.store = store;
        this.route = route;
        this.traductions = traductions;
        this.styles = styles;
        this.images = images;
        this.isSendActivationCodeLoading$ = this.store.pipe(select(selectIsSendActivationCodeLoading));
        this.activationCodePlaceholder = 'Enter your activation code';
        this.buttonsBackgroundColor = '#3f51b5';
        this.buttonsColor = 'white';
        this.sendActivationButtonTraduction = 'Send';
    }
    ActivateUserComponent.prototype.ngOnInit = function () {
        this.sendActivationButtonTraduction = get(this.traductions || {}, 'buttons.sendActivationCode', this.sendActivationButtonTraduction);
        this.activationCodePlaceholder = get(this.traductions || {}, 'form.activationCodePlaceholder', this.activationCodePlaceholder);
        this.buttonsBackgroundColor = get(this.styles || {}, 'buttonsBackgroundColor', this.buttonsBackgroundColor);
        this.buttonsColor = get(this.styles || {}, 'buttonsColor', this.buttonsColor);
    };
    ActivateUserComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var activationCode = this.route.snapshot.paramMap.get('activationCode');
        if (activationCode) {
            setTimeout(function () {
                _this.activationCodeInput.nativeElement.value = activationCode;
                _this.onSubmitActivationCode();
            });
        }
    };
    ActivateUserComponent.prototype.onSubmitActivationCode = function () {
        var activationCode = this.activationCodeInput.nativeElement.value;
        if (activationCode) {
            this.store.dispatch(new SendActivationCode(activationCode));
        }
    };
    ActivateUserComponent.ctorParameters = function () { return [
        { type: Store },
        { type: ActivatedRoute },
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_TRADUCTIONS,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_STYLES,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_IMAGES_URLS,] }] }
    ]; };
    __decorate([
        ViewChild('activationCode')
    ], ActivateUserComponent.prototype, "activationCodeInput", void 0);
    ActivateUserComponent = __decorate([
        Component({
            selector: 'auth-lib-activate-user',
            template: "<div class=\"activate-password-container\" [ngStyle]=\"{'background-image': 'url(' + images.loginBackgroundImageUrl + ')'}\">\n  <mat-card class=\"mat-elevation-z8\">\n    <img *ngIf=\"images.logoImageUrl && images.logoImageUrl.length >= 1\" [src]=\"images.logoImageUrl\">\n      <mat-form-field>\n        <input matInput [placeholder]=\"activationCodePlaceholder\" #activationCode>\n      </mat-form-field>\n    \n      <button\n          *ngIf=\"!(isSendActivationCodeLoading$ | async)\"\n          mat-raised-button\n          type=\"button\"\n          [disabled]=\"!(this.activationCodeInput && this.activationCodeInput.nativeElement && this.activationCodeInput.nativeElement.value)\"\n          (click)=\"onSubmitActivationCode()\"\n          [ngStyle]=\"{\n            'background-color': buttonsBackgroundColor,\n            'color': buttonsColor\n          }\"\n      >\n          {{ sendActivationButtonTraduction }}\n      </button>\n      <mat-spinner *ngIf=\"isSendActivationCodeLoading$ | async\" [diameter]=\"36\"></mat-spinner>\n  </mat-card>\n</div>\n",
            styles: [".activate-password-container{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%;width:100%;flex:1;background-size:cover}.activate-password-container mat-card{display:flex;flex-direction:column;justify-content:center;align-items:center;height:400px;width:400px;box-sizing:border-box;padding:2%}.activate-password-container mat-card img{display:block;max-width:200px;max-height:100px;width:auto;height:auto;margin-bottom:20px}.activate-password-container mat-card mat-form-field{width:75%;font-size:16px}.activate-password-container mat-card button,.activate-password-container mat-card mat-spinner{margin-top:20px}"]
        }),
        __param(2, Inject(AUTH_TRADUCTIONS)),
        __param(3, Inject(AUTH_STYLES)),
        __param(4, Inject(AUTH_IMAGES_URLS))
    ], ActivateUserComponent);
    return ActivateUserComponent;
}());
export { ActivateUserComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZhdGUtdXNlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWF1dGgtbGliLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9hY3RpdmF0ZS11c2VyL2FjdGl2YXRlLXVzZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBYyxNQUFNLEVBQXlCLE1BQU0sZUFBZSxDQUFDO0FBQ2hHLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTVDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBb0IsZ0JBQWdCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHaEcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDekQsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBT2pEO0lBV0UsK0JBQ1UsS0FBdUIsRUFDdkIsS0FBcUIsRUFDSyxXQUE0QyxFQUNqRCxNQUFrQyxFQUM5QixNQUFrQztRQUozRCxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUN2QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNLLGdCQUFXLEdBQVgsV0FBVyxDQUFpQztRQUNqRCxXQUFNLEdBQU4sTUFBTSxDQUE0QjtRQUM5QixXQUFNLEdBQU4sTUFBTSxDQUE0QjtRQWJyRSxpQ0FBNEIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxDQUFDO1FBRTFGLDhCQUF5QixHQUFHLDRCQUE0QixDQUFDO1FBRXpELDJCQUFzQixHQUFHLFNBQVMsQ0FBQztRQUNuQyxpQkFBWSxHQUFHLE9BQU8sQ0FBQztRQUN2QixtQ0FBOEIsR0FBRyxNQUFNLENBQUM7SUFRcEMsQ0FBQztJQUVMLHdDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsOEJBQThCLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFLDRCQUE0QixFQUFFLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQ3JJLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUUsZ0NBQWdDLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDL0gsSUFBSSxDQUFDLHNCQUFzQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRSx3QkFBd0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUM1RyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFRCwrQ0FBZSxHQUFmO1FBQUEsaUJBUUM7UUFQQyxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDMUUsSUFBSSxjQUFjLEVBQUU7WUFDbEIsVUFBVSxDQUFDO2dCQUNULEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQztnQkFDOUQsS0FBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCxzREFBc0IsR0FBdEI7UUFDRSxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUNwRSxJQUFJLGNBQWMsRUFBRTtZQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7U0FDN0Q7SUFDSCxDQUFDOztnQkE3QmdCLEtBQUs7Z0JBQ0wsY0FBYztnREFDNUIsTUFBTSxTQUFDLGdCQUFnQjtnREFDdkIsTUFBTSxTQUFDLFdBQVc7Z0RBQ2xCLE1BQU0sU0FBQyxnQkFBZ0I7O0lBZkc7UUFBNUIsU0FBUyxDQUFDLGdCQUFnQixDQUFDO3NFQUFpQztJQURsRCxxQkFBcUI7UUFMakMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHdCQUF3QjtZQUNsQyx3akNBQTZDOztTQUU5QyxDQUFDO1FBZUcsV0FBQSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUN4QixXQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUNuQixXQUFBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO09BaEJoQixxQkFBcUIsQ0EwQ2pDO0lBQUQsNEJBQUM7Q0FBQSxBQTFDRCxJQTBDQztTQTFDWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgSW5qZWN0LCBPbkluaXQsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHNlbGVjdCwgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5cbmltcG9ydCB7IGdldCB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IEFVVEhfVFJBRFVDVElPTlMsIEFVVEhfU1RZTEVTLCBBdXRoTW9kdWxlQ29uZmlnLCBBVVRIX0lNQUdFU19VUkxTIH0gZnJvbSAnLi4vLi4vdG9rZW4nO1xuXG5pbXBvcnQgeyBBdXRoU3RhdGUgfSBmcm9tICcuLi8uLi9zdG9yZS9yZWR1Y2VyJztcbmltcG9ydCB7IFNlbmRBY3RpdmF0aW9uQ29kZSB9IGZyb20gJy4uLy4uL3N0b3JlL2FjdGlvbnMnO1xuaW1wb3J0IHsgc2VsZWN0SXNTZW5kQWN0aXZhdGlvbkNvZGVMb2FkaW5nIH0gZnJvbSAnLi4vLi4vc3RvcmUvc2VsZWN0b3JzJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXV0aC1saWItYWN0aXZhdGUtdXNlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9hY3RpdmF0ZS11c2VyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYWN0aXZhdGUtdXNlci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEFjdGl2YXRlVXNlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ2FjdGl2YXRpb25Db2RlJykgYWN0aXZhdGlvbkNvZGVJbnB1dDogRWxlbWVudFJlZjtcblxuICBpc1NlbmRBY3RpdmF0aW9uQ29kZUxvYWRpbmckID0gdGhpcy5zdG9yZS5waXBlKHNlbGVjdChzZWxlY3RJc1NlbmRBY3RpdmF0aW9uQ29kZUxvYWRpbmcpKTtcblxuICBhY3RpdmF0aW9uQ29kZVBsYWNlaG9sZGVyID0gJ0VudGVyIHlvdXIgYWN0aXZhdGlvbiBjb2RlJztcblxuICBidXR0b25zQmFja2dyb3VuZENvbG9yID0gJyMzZjUxYjUnO1xuICBidXR0b25zQ29sb3IgPSAnd2hpdGUnO1xuICBzZW5kQWN0aXZhdGlvbkJ1dHRvblRyYWR1Y3Rpb24gPSAnU2VuZCc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzdG9yZTogU3RvcmU8QXV0aFN0YXRlPixcbiAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBASW5qZWN0KEFVVEhfVFJBRFVDVElPTlMpIHByaXZhdGUgdHJhZHVjdGlvbnM6IEF1dGhNb2R1bGVDb25maWdbJ3RyYWR1Y3Rpb25zJ10sXG4gICAgQEluamVjdChBVVRIX1NUWUxFUykgcHJpdmF0ZSBzdHlsZXM6IEF1dGhNb2R1bGVDb25maWdbJ3N0eWxlcyddLFxuICAgIEBJbmplY3QoQVVUSF9JTUFHRVNfVVJMUykgcHVibGljIGltYWdlczogQXV0aE1vZHVsZUNvbmZpZ1snaW1hZ2VzJ11cbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnNlbmRBY3RpdmF0aW9uQnV0dG9uVHJhZHVjdGlvbiA9IGdldCh0aGlzLnRyYWR1Y3Rpb25zIHx8IHt9LCAnYnV0dG9ucy5zZW5kQWN0aXZhdGlvbkNvZGUnLCB0aGlzLnNlbmRBY3RpdmF0aW9uQnV0dG9uVHJhZHVjdGlvbik7XG4gICAgdGhpcy5hY3RpdmF0aW9uQ29kZVBsYWNlaG9sZGVyID0gZ2V0KHRoaXMudHJhZHVjdGlvbnMgfHwge30sICdmb3JtLmFjdGl2YXRpb25Db2RlUGxhY2Vob2xkZXInLCB0aGlzLmFjdGl2YXRpb25Db2RlUGxhY2Vob2xkZXIpO1xuICAgIHRoaXMuYnV0dG9uc0JhY2tncm91bmRDb2xvciA9IGdldCh0aGlzLnN0eWxlcyB8fCB7fSwgJ2J1dHRvbnNCYWNrZ3JvdW5kQ29sb3InLCB0aGlzLmJ1dHRvbnNCYWNrZ3JvdW5kQ29sb3IpO1xuICAgIHRoaXMuYnV0dG9uc0NvbG9yID0gZ2V0KHRoaXMuc3R5bGVzIHx8IHt9LCAnYnV0dG9uc0NvbG9yJywgdGhpcy5idXR0b25zQ29sb3IpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGNvbnN0IGFjdGl2YXRpb25Db2RlID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbU1hcC5nZXQoJ2FjdGl2YXRpb25Db2RlJyk7XG4gICAgaWYgKGFjdGl2YXRpb25Db2RlKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uQ29kZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSBhY3RpdmF0aW9uQ29kZTtcbiAgICAgICAgdGhpcy5vblN1Ym1pdEFjdGl2YXRpb25Db2RlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvblN1Ym1pdEFjdGl2YXRpb25Db2RlKCkge1xuICAgIGNvbnN0IGFjdGl2YXRpb25Db2RlID0gdGhpcy5hY3RpdmF0aW9uQ29kZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgaWYgKGFjdGl2YXRpb25Db2RlKSB7XG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBTZW5kQWN0aXZhdGlvbkNvZGUoYWN0aXZhdGlvbkNvZGUpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==