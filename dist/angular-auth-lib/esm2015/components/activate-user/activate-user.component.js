import { __decorate, __param } from "tslib";
import { Component, ViewChild, Inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { get } from '../../utils';
import { AUTH_TRADUCTIONS, AUTH_STYLES, AUTH_IMAGES_URLS } from '../../token';
import { SendActivationCode } from '../../store/actions';
import { selectIsSendActivationCodeLoading } from '../../store/selectors';
import { ActivatedRoute } from '@angular/router';
let ActivateUserComponent = class ActivateUserComponent {
    constructor(store, route, traductions, styles, images) {
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
    ngOnInit() {
        this.sendActivationButtonTraduction = get(this.traductions || {}, 'buttons.sendActivationCode', this.sendActivationButtonTraduction);
        this.activationCodePlaceholder = get(this.traductions || {}, 'form.activationCodePlaceholder', this.activationCodePlaceholder);
        this.buttonsBackgroundColor = get(this.styles || {}, 'buttonsBackgroundColor', this.buttonsBackgroundColor);
        this.buttonsColor = get(this.styles || {}, 'buttonsColor', this.buttonsColor);
    }
    ngAfterViewInit() {
        const activationCode = this.route.snapshot.paramMap.get('activationCode');
        if (activationCode) {
            setTimeout(() => {
                this.activationCodeInput.nativeElement.value = activationCode;
                this.onSubmitActivationCode();
            });
        }
    }
    onSubmitActivationCode() {
        const activationCode = this.activationCodeInput.nativeElement.value;
        if (activationCode) {
            this.store.dispatch(new SendActivationCode(activationCode));
        }
    }
};
ActivateUserComponent.ctorParameters = () => [
    { type: Store },
    { type: ActivatedRoute },
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_TRADUCTIONS,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_STYLES,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_IMAGES_URLS,] }] }
];
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
export { ActivateUserComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZhdGUtdXNlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWF1dGgtbGliLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9hY3RpdmF0ZS11c2VyL2FjdGl2YXRlLXVzZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBYyxNQUFNLEVBQXlCLE1BQU0sZUFBZSxDQUFDO0FBQ2hHLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRTVDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBb0IsZ0JBQWdCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHaEcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDekQsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBT2pELElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBV2hDLFlBQ1UsS0FBdUIsRUFDdkIsS0FBcUIsRUFDSyxXQUE0QyxFQUNqRCxNQUFrQyxFQUM5QixNQUFrQztRQUozRCxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUN2QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNLLGdCQUFXLEdBQVgsV0FBVyxDQUFpQztRQUNqRCxXQUFNLEdBQU4sTUFBTSxDQUE0QjtRQUM5QixXQUFNLEdBQU4sTUFBTSxDQUE0QjtRQWJyRSxpQ0FBNEIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxDQUFDO1FBRTFGLDhCQUF5QixHQUFHLDRCQUE0QixDQUFDO1FBRXpELDJCQUFzQixHQUFHLFNBQVMsQ0FBQztRQUNuQyxpQkFBWSxHQUFHLE9BQU8sQ0FBQztRQUN2QixtQ0FBOEIsR0FBRyxNQUFNLENBQUM7SUFRcEMsQ0FBQztJQUVMLFFBQVE7UUFDTixJQUFJLENBQUMsOEJBQThCLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFLDRCQUE0QixFQUFFLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQ3JJLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUUsZ0NBQWdDLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDL0gsSUFBSSxDQUFDLHNCQUFzQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRSx3QkFBd0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUM1RyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFRCxlQUFlO1FBQ2IsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzFFLElBQUksY0FBYyxFQUFFO1lBQ2xCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDO2dCQUM5RCxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELHNCQUFzQjtRQUNwQixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUNwRSxJQUFJLGNBQWMsRUFBRTtZQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7U0FDN0Q7SUFDSCxDQUFDO0NBQ0YsQ0FBQTs7WUE5QmtCLEtBQUs7WUFDTCxjQUFjOzRDQUM1QixNQUFNLFNBQUMsZ0JBQWdCOzRDQUN2QixNQUFNLFNBQUMsV0FBVzs0Q0FDbEIsTUFBTSxTQUFDLGdCQUFnQjs7QUFmRztJQUE1QixTQUFTLENBQUMsZ0JBQWdCLENBQUM7a0VBQWlDO0FBRGxELHFCQUFxQjtJQUxqQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsd0JBQXdCO1FBQ2xDLHdqQ0FBNkM7O0tBRTlDLENBQUM7SUFlRyxXQUFBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQ3hCLFdBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ25CLFdBQUEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUE7R0FoQmhCLHFCQUFxQixDQTBDakM7U0ExQ1kscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIEluamVjdCwgT25Jbml0LCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBzZWxlY3QsIFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuXG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyBBVVRIX1RSQURVQ1RJT05TLCBBVVRIX1NUWUxFUywgQXV0aE1vZHVsZUNvbmZpZywgQVVUSF9JTUFHRVNfVVJMUyB9IGZyb20gJy4uLy4uL3Rva2VuJztcblxuaW1wb3J0IHsgQXV0aFN0YXRlIH0gZnJvbSAnLi4vLi4vc3RvcmUvcmVkdWNlcic7XG5pbXBvcnQgeyBTZW5kQWN0aXZhdGlvbkNvZGUgfSBmcm9tICcuLi8uLi9zdG9yZS9hY3Rpb25zJztcbmltcG9ydCB7IHNlbGVjdElzU2VuZEFjdGl2YXRpb25Db2RlTG9hZGluZyB9IGZyb20gJy4uLy4uL3N0b3JlL3NlbGVjdG9ycyc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F1dGgtbGliLWFjdGl2YXRlLXVzZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vYWN0aXZhdGUtdXNlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2FjdGl2YXRlLXVzZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBBY3RpdmF0ZVVzZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICBAVmlld0NoaWxkKCdhY3RpdmF0aW9uQ29kZScpIGFjdGl2YXRpb25Db2RlSW5wdXQ6IEVsZW1lbnRSZWY7XG5cbiAgaXNTZW5kQWN0aXZhdGlvbkNvZGVMb2FkaW5nJCA9IHRoaXMuc3RvcmUucGlwZShzZWxlY3Qoc2VsZWN0SXNTZW5kQWN0aXZhdGlvbkNvZGVMb2FkaW5nKSk7XG5cbiAgYWN0aXZhdGlvbkNvZGVQbGFjZWhvbGRlciA9ICdFbnRlciB5b3VyIGFjdGl2YXRpb24gY29kZSc7XG5cbiAgYnV0dG9uc0JhY2tncm91bmRDb2xvciA9ICcjM2Y1MWI1JztcbiAgYnV0dG9uc0NvbG9yID0gJ3doaXRlJztcbiAgc2VuZEFjdGl2YXRpb25CdXR0b25UcmFkdWN0aW9uID0gJ1NlbmQnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc3RvcmU6IFN0b3JlPEF1dGhTdGF0ZT4sXG4gICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgQEluamVjdChBVVRIX1RSQURVQ1RJT05TKSBwcml2YXRlIHRyYWR1Y3Rpb25zOiBBdXRoTW9kdWxlQ29uZmlnWyd0cmFkdWN0aW9ucyddLFxuICAgIEBJbmplY3QoQVVUSF9TVFlMRVMpIHByaXZhdGUgc3R5bGVzOiBBdXRoTW9kdWxlQ29uZmlnWydzdHlsZXMnXSxcbiAgICBASW5qZWN0KEFVVEhfSU1BR0VTX1VSTFMpIHB1YmxpYyBpbWFnZXM6IEF1dGhNb2R1bGVDb25maWdbJ2ltYWdlcyddXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zZW5kQWN0aXZhdGlvbkJ1dHRvblRyYWR1Y3Rpb24gPSBnZXQodGhpcy50cmFkdWN0aW9ucyB8fCB7fSwgJ2J1dHRvbnMuc2VuZEFjdGl2YXRpb25Db2RlJywgdGhpcy5zZW5kQWN0aXZhdGlvbkJ1dHRvblRyYWR1Y3Rpb24pO1xuICAgIHRoaXMuYWN0aXZhdGlvbkNvZGVQbGFjZWhvbGRlciA9IGdldCh0aGlzLnRyYWR1Y3Rpb25zIHx8IHt9LCAnZm9ybS5hY3RpdmF0aW9uQ29kZVBsYWNlaG9sZGVyJywgdGhpcy5hY3RpdmF0aW9uQ29kZVBsYWNlaG9sZGVyKTtcbiAgICB0aGlzLmJ1dHRvbnNCYWNrZ3JvdW5kQ29sb3IgPSBnZXQodGhpcy5zdHlsZXMgfHwge30sICdidXR0b25zQmFja2dyb3VuZENvbG9yJywgdGhpcy5idXR0b25zQmFja2dyb3VuZENvbG9yKTtcbiAgICB0aGlzLmJ1dHRvbnNDb2xvciA9IGdldCh0aGlzLnN0eWxlcyB8fCB7fSwgJ2J1dHRvbnNDb2xvcicsIHRoaXMuYnV0dG9uc0NvbG9yKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBjb25zdCBhY3RpdmF0aW9uQ29kZSA9IHRoaXMucm91dGUuc25hcHNob3QucGFyYW1NYXAuZ2V0KCdhY3RpdmF0aW9uQ29kZScpO1xuICAgIGlmIChhY3RpdmF0aW9uQ29kZSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWN0aXZhdGlvbkNvZGVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gYWN0aXZhdGlvbkNvZGU7XG4gICAgICAgIHRoaXMub25TdWJtaXRBY3RpdmF0aW9uQ29kZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25TdWJtaXRBY3RpdmF0aW9uQ29kZSgpIHtcbiAgICBjb25zdCBhY3RpdmF0aW9uQ29kZSA9IHRoaXMuYWN0aXZhdGlvbkNvZGVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgIGlmIChhY3RpdmF0aW9uQ29kZSkge1xuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgU2VuZEFjdGl2YXRpb25Db2RlKGFjdGl2YXRpb25Db2RlKSk7XG4gICAgfVxuICB9XG59XG4iXX0=