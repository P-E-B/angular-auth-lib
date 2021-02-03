import { __decorate, __param } from "tslib";
import { Component, ViewChild, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import get from 'lodash-es/get';
import { SendPassword } from '../../store/actions';
import { AUTH_TRADUCTIONS, AUTH_STYLES } from '../../token';
let ForgottenPasswordComponent = class ForgottenPasswordComponent {
    constructor(store, traductions, styles) {
        this.store = store;
        this.traductions = traductions;
        this.styles = styles;
        this.emailPlaceholder = 'Your email';
        this.sendButtonTraduction = 'Send';
        this.buttonsBackgroundColor = '#3f51b5';
        this.buttonsColor = 'white';
    }
    ngOnInit() {
        this.emailPlaceholder = get(this.traductions || {}, 'form.emailPlaceholder', this.emailPlaceholder);
        this.sendButtonTraduction = get(this.traductions || {}, 'buttons.send', this.sendButtonTraduction);
        this.buttonsBackgroundColor = get(this.styles || {}, 'buttonsBackgroundColor', this.buttonsBackgroundColor);
        this.buttonsColor = get(this.styles || {}, 'buttonsColor', this.buttonsColor);
    }
    send() {
        this.store.dispatch(new SendPassword(this.emailInput.nativeElement.value));
    }
};
ForgottenPasswordComponent.ctorParameters = () => [
    { type: Store },
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_TRADUCTIONS,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [AUTH_STYLES,] }] }
];
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
export { ForgottenPasswordComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZ290dGVuLXBhc3N3b3JkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItYXV0aC1saWIvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZvcmdvdHRlbi1wYXNzd29yZC9mb3Jnb3R0ZW4tcGFzc3dvcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBYyxNQUFNLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDakYsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVwQyxPQUFPLEdBQUcsTUFBTSxlQUFlLENBQUM7QUFHaEMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQW9CLE1BQU0sYUFBYSxDQUFDO0FBTzlFLElBQWEsMEJBQTBCLEdBQXZDLE1BQWEsMEJBQTBCO0lBU3JDLFlBQ1UsS0FBdUIsRUFDRyxXQUE0QyxFQUNqRCxNQUFrQztRQUZ2RCxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUNHLGdCQUFXLEdBQVgsV0FBVyxDQUFpQztRQUNqRCxXQUFNLEdBQU4sTUFBTSxDQUE0QjtRQVRqRSxxQkFBZ0IsR0FBRyxZQUFZLENBQUM7UUFDaEMseUJBQW9CLEdBQUcsTUFBTSxDQUFDO1FBRTlCLDJCQUFzQixHQUFHLFNBQVMsQ0FBQztRQUNuQyxpQkFBWSxHQUFHLE9BQU8sQ0FBQztJQU1uQixDQUFDO0lBRUwsUUFBUTtRQUNOLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUUsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDcEcsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFFbkcsSUFBSSxDQUFDLHNCQUFzQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRSx3QkFBd0IsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUM1RyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDO0NBQ0YsQ0FBQTs7WUFoQmtCLEtBQUs7NENBQ25CLE1BQU0sU0FBQyxnQkFBZ0I7NENBQ3ZCLE1BQU0sU0FBQyxXQUFXOztBQVhEO0lBQW5CLFNBQVMsQ0FBQyxPQUFPLENBQUM7OERBQXdCO0FBRGhDLDBCQUEwQjtJQUx0QyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsNkJBQTZCO1FBQ3ZDLHdiQUFrRDs7S0FFbkQsQ0FBQztJQVlHLFdBQUEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDeEIsV0FBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7R0FaWCwwQkFBMEIsQ0EwQnRDO1NBMUJZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBJbmplY3QsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5cbmltcG9ydCBnZXQgZnJvbSAnbG9kYXNoLWVzL2dldCc7XG5cbmltcG9ydCB7IEF1dGhTdGF0ZSB9IGZyb20gJy4uLy4uL3N0b3JlL3JlZHVjZXInO1xuaW1wb3J0IHsgU2VuZFBhc3N3b3JkIH0gZnJvbSAnLi4vLi4vc3RvcmUvYWN0aW9ucyc7XG5pbXBvcnQgeyBBVVRIX1RSQURVQ1RJT05TLCBBVVRIX1NUWUxFUywgQXV0aE1vZHVsZUNvbmZpZyB9IGZyb20gJy4uLy4uL3Rva2VuJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXV0aC1saWItZm9yZ290dGVuLXBhc3N3b3JkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZvcmdvdHRlbi1wYXNzd29yZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ZvcmdvdHRlbi1wYXNzd29yZC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZvcmdvdHRlblBhc3N3b3JkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZCgnZW1haWwnKSBlbWFpbElucHV0OiBFbGVtZW50UmVmO1xuXG4gIGVtYWlsUGxhY2Vob2xkZXIgPSAnWW91ciBlbWFpbCc7XG4gIHNlbmRCdXR0b25UcmFkdWN0aW9uID0gJ1NlbmQnO1xuXG4gIGJ1dHRvbnNCYWNrZ3JvdW5kQ29sb3IgPSAnIzNmNTFiNSc7XG4gIGJ1dHRvbnNDb2xvciA9ICd3aGl0ZSc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzdG9yZTogU3RvcmU8QXV0aFN0YXRlPixcbiAgICBASW5qZWN0KEFVVEhfVFJBRFVDVElPTlMpIHByaXZhdGUgdHJhZHVjdGlvbnM6IEF1dGhNb2R1bGVDb25maWdbJ3RyYWR1Y3Rpb25zJ10sXG4gICAgQEluamVjdChBVVRIX1NUWUxFUykgcHJpdmF0ZSBzdHlsZXM6IEF1dGhNb2R1bGVDb25maWdbJ3N0eWxlcyddLFxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZW1haWxQbGFjZWhvbGRlciA9IGdldCh0aGlzLnRyYWR1Y3Rpb25zIHx8IHt9LCAnZm9ybS5lbWFpbFBsYWNlaG9sZGVyJywgdGhpcy5lbWFpbFBsYWNlaG9sZGVyKTtcbiAgICB0aGlzLnNlbmRCdXR0b25UcmFkdWN0aW9uID0gZ2V0KHRoaXMudHJhZHVjdGlvbnMgfHwge30sICdidXR0b25zLnNlbmQnLCB0aGlzLnNlbmRCdXR0b25UcmFkdWN0aW9uKTtcblxuICAgIHRoaXMuYnV0dG9uc0JhY2tncm91bmRDb2xvciA9IGdldCh0aGlzLnN0eWxlcyB8fCB7fSwgJ2J1dHRvbnNCYWNrZ3JvdW5kQ29sb3InLCB0aGlzLmJ1dHRvbnNCYWNrZ3JvdW5kQ29sb3IpO1xuICAgIHRoaXMuYnV0dG9uc0NvbG9yID0gZ2V0KHRoaXMuc3R5bGVzIHx8IHt9LCAnYnV0dG9uc0NvbG9yJywgdGhpcy5idXR0b25zQ29sb3IpO1xuICB9XG5cbiAgc2VuZCgpIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBTZW5kUGFzc3dvcmQodGhpcy5lbWFpbElucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUpKTtcbiAgfVxufVxuIl19