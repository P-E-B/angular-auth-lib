import { __decorate, __param } from "tslib";
import { Component, ViewChild, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { get } from 'lodash';
import { SendPassword } from '../../store/actions';
import { AUTH_TRADUCTIONS, AUTH_STYLES } from '../../token';
var ForgottenPasswordComponent = /** @class */ (function () {
    function ForgottenPasswordComponent(store, traductions, styles) {
        this.store = store;
        this.traductions = traductions;
        this.styles = styles;
        this.emailPlaceholder = 'Your email';
        this.sendButtonTraduction = 'Send';
        this.buttonsBackgroundColor = '#3f51b5';
        this.buttonsColor = 'white';
    }
    ForgottenPasswordComponent.prototype.ngOnInit = function () {
        this.emailPlaceholder = get(this.traductions || {}, 'form.emailPlaceholder', this.emailPlaceholder);
        this.sendButtonTraduction = get(this.traductions || {}, 'buttons.send', this.sendButtonTraduction);
        this.buttonsBackgroundColor = get(this.styles || {}, 'buttonsBackgroundColor', this.buttonsBackgroundColor);
        this.buttonsColor = get(this.styles || {}, 'buttonsColor', this.buttonsColor);
    };
    ForgottenPasswordComponent.prototype.send = function () {
        this.store.dispatch(new SendPassword(this.emailInput.nativeElement.value));
    };
    ForgottenPasswordComponent.ctorParameters = function () { return [
        { type: Store },
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_TRADUCTIONS,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_STYLES,] }] }
    ]; };
    __decorate([
        ViewChild('email')
    ], ForgottenPasswordComponent.prototype, "emailInput", void 0);
    ForgottenPasswordComponent = __decorate([
        Component({
            selector: 'auth-lib-forgotten-password',
            template: "<mat-form-field>\n  <input matInput [placeholder]=\"emailPlaceholder\" #email>\n</mat-form-field>\n\n<button \n  mat-raised-button\n  type=\"button\" \n  (click)=\"send()\" \n  [disabled]=\"!(this.emailInput && this.emailInput.nativeElement && this.emailInput.nativeElement.value)\"\n  [ngStyle]=\"{\n    'background-color': buttonsBackgroundColor,\n    'color': buttonsColor\n  }\"\n>\n  {{ sendButtonTraduction }}\n</button>\n",
            styles: ["mat-form-field{font-size:12px;margin-right:30px;width:230px}"]
        }),
        __param(1, Inject(AUTH_TRADUCTIONS)),
        __param(2, Inject(AUTH_STYLES))
    ], ForgottenPasswordComponent);
    return ForgottenPasswordComponent;
}());
export { ForgottenPasswordComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZ290dGVuLXBhc3N3b3JkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItYXV0aC1saWIvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZvcmdvdHRlbi1wYXNzd29yZC9mb3Jnb3R0ZW4tcGFzc3dvcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBYyxNQUFNLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDakYsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVwQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRzdCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFvQixNQUFNLGFBQWEsQ0FBQztBQU85RTtJQVNFLG9DQUNVLEtBQXVCLEVBQ0csV0FBNEMsRUFDakQsTUFBa0M7UUFGdkQsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDRyxnQkFBVyxHQUFYLFdBQVcsQ0FBaUM7UUFDakQsV0FBTSxHQUFOLE1BQU0sQ0FBNEI7UUFUakUscUJBQWdCLEdBQUcsWUFBWSxDQUFDO1FBQ2hDLHlCQUFvQixHQUFHLE1BQU0sQ0FBQztRQUU5QiwyQkFBc0IsR0FBRyxTQUFTLENBQUM7UUFDbkMsaUJBQVksR0FBRyxPQUFPLENBQUM7SUFNbkIsQ0FBQztJQUVMLDZDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFLHVCQUF1QixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3BHLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRW5HLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLEVBQUUsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDNUcsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQseUNBQUksR0FBSjtRQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQzs7Z0JBZmdCLEtBQUs7Z0RBQ25CLE1BQU0sU0FBQyxnQkFBZ0I7Z0RBQ3ZCLE1BQU0sU0FBQyxXQUFXOztJQVhEO1FBQW5CLFNBQVMsQ0FBQyxPQUFPLENBQUM7a0VBQXdCO0lBRGhDLDBCQUEwQjtRQUx0QyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsNkJBQTZCO1lBQ3ZDLHdiQUFrRDs7U0FFbkQsQ0FBQztRQVlHLFdBQUEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFDeEIsV0FBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7T0FaWCwwQkFBMEIsQ0EwQnRDO0lBQUQsaUNBQUM7Q0FBQSxBQTFCRCxJQTBCQztTQTFCWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgSW5qZWN0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuXG5pbXBvcnQgeyBnZXQgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBBdXRoU3RhdGUgfSBmcm9tICcuLi8uLi9zdG9yZS9yZWR1Y2VyJztcbmltcG9ydCB7IFNlbmRQYXNzd29yZCB9IGZyb20gJy4uLy4uL3N0b3JlL2FjdGlvbnMnO1xuaW1wb3J0IHsgQVVUSF9UUkFEVUNUSU9OUywgQVVUSF9TVFlMRVMsIEF1dGhNb2R1bGVDb25maWcgfSBmcm9tICcuLi8uLi90b2tlbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F1dGgtbGliLWZvcmdvdHRlbi1wYXNzd29yZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9mb3Jnb3R0ZW4tcGFzc3dvcmQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9mb3Jnb3R0ZW4tcGFzc3dvcmQuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGb3Jnb3R0ZW5QYXNzd29yZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ2VtYWlsJykgZW1haWxJbnB1dDogRWxlbWVudFJlZjtcblxuICBlbWFpbFBsYWNlaG9sZGVyID0gJ1lvdXIgZW1haWwnO1xuICBzZW5kQnV0dG9uVHJhZHVjdGlvbiA9ICdTZW5kJztcblxuICBidXR0b25zQmFja2dyb3VuZENvbG9yID0gJyMzZjUxYjUnO1xuICBidXR0b25zQ29sb3IgPSAnd2hpdGUnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc3RvcmU6IFN0b3JlPEF1dGhTdGF0ZT4sXG4gICAgQEluamVjdChBVVRIX1RSQURVQ1RJT05TKSBwcml2YXRlIHRyYWR1Y3Rpb25zOiBBdXRoTW9kdWxlQ29uZmlnWyd0cmFkdWN0aW9ucyddLFxuICAgIEBJbmplY3QoQVVUSF9TVFlMRVMpIHByaXZhdGUgc3R5bGVzOiBBdXRoTW9kdWxlQ29uZmlnWydzdHlsZXMnXSxcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmVtYWlsUGxhY2Vob2xkZXIgPSBnZXQodGhpcy50cmFkdWN0aW9ucyB8fCB7fSwgJ2Zvcm0uZW1haWxQbGFjZWhvbGRlcicsIHRoaXMuZW1haWxQbGFjZWhvbGRlcik7XG4gICAgdGhpcy5zZW5kQnV0dG9uVHJhZHVjdGlvbiA9IGdldCh0aGlzLnRyYWR1Y3Rpb25zIHx8IHt9LCAnYnV0dG9ucy5zZW5kJywgdGhpcy5zZW5kQnV0dG9uVHJhZHVjdGlvbik7XG5cbiAgICB0aGlzLmJ1dHRvbnNCYWNrZ3JvdW5kQ29sb3IgPSBnZXQodGhpcy5zdHlsZXMgfHwge30sICdidXR0b25zQmFja2dyb3VuZENvbG9yJywgdGhpcy5idXR0b25zQmFja2dyb3VuZENvbG9yKTtcbiAgICB0aGlzLmJ1dHRvbnNDb2xvciA9IGdldCh0aGlzLnN0eWxlcyB8fCB7fSwgJ2J1dHRvbnNDb2xvcicsIHRoaXMuYnV0dG9uc0NvbG9yKTtcbiAgfVxuXG4gIHNlbmQoKSB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgU2VuZFBhc3N3b3JkKHRoaXMuZW1haWxJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlKSk7XG4gIH1cbn1cbiJdfQ==