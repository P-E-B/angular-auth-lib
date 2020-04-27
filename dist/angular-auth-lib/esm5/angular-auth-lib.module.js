import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ToastrModule } from 'ngx-toastr';
import { authReducer } from './store/reducer';
import { AuthEffects } from './store/effects';
import { TokenInterceptor } from './services/token.interceptor';
import { AuthGuard } from './services/auth-guard.service';
import { LogInComponent } from './components/log-in/log-in.component';
import { ForgottenPasswordComponent } from './components/forgotten-password/forgotten-password.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AUTH_API_URLS, AUTH_IMAGES_URLS, AUTH_TRADUCTIONS, AUTH_RESET_ACTIONS, AUTH_STYLES } from './token';
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule_1 = AuthModule;
    AuthModule.forRoot = function (config) {
        return {
            ngModule: AuthModule_1,
            providers: [
                { provide: AUTH_API_URLS, useValue: config.urls },
                { provide: AUTH_IMAGES_URLS, useValue: config.images },
                { provide: AUTH_TRADUCTIONS, useValue: config.traductions },
                { provide: AUTH_RESET_ACTIONS, useValue: config.resetActions },
                { provide: AUTH_STYLES, useValue: config.styles },
                { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
            ]
        };
    };
    var AuthModule_1;
    AuthModule = AuthModule_1 = __decorate([
        NgModule({
            declarations: [LogInComponent, ForgottenPasswordComponent, SignUpComponent],
            imports: [
                CommonModule,
                HttpClientModule,
                RouterModule,
                ReactiveFormsModule,
                StoreModule.forFeature('auth', authReducer),
                EffectsModule.forFeature([AuthEffects]),
                BrowserAnimationsModule,
                MatCardModule,
                MatDialogModule,
                MatButtonModule,
                MatInputModule,
                MatProgressSpinnerModule,
                ToastrModule.forRoot({
                    timeOut: 3000,
                    positionClass: 'toast-bottom-right',
                    preventDuplicates: true
                })
            ],
            entryComponents: [ForgottenPasswordComponent],
            exports: [LogInComponent, ForgottenPasswordComponent],
            providers: [AuthGuard]
        })
    ], AuthModule);
    return AuthModule;
}());
export { AuthModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1hdXRoLWxpYi5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWF1dGgtbGliLyIsInNvdXJjZXMiOlsiYW5ndWxhci1hdXRoLWxpYi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzFELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw4REFBOEQsQ0FBQztBQUMxRyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFekUsT0FBTyxFQUVMLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2hCLGtCQUFrQixFQUNsQixXQUFXLEVBQ1osTUFBTSxTQUFTLENBQUM7QUE0QmpCO0lBQUE7SUFjQSxDQUFDO21CQWRZLFVBQVU7SUFDZCxrQkFBTyxHQUFkLFVBQWUsTUFBd0I7UUFDckMsT0FBTztZQUNMLFFBQVEsRUFBRSxZQUFVO1lBQ3BCLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQ2pELEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUN0RCxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRTtnQkFDM0QsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxZQUFZLEVBQUU7Z0JBQzlELEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDakQsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7YUFDeEU7U0FDRixDQUFDO0lBQ0osQ0FBQzs7SUFiVSxVQUFVO1FBekJ0QixRQUFRLENBQUM7WUFDUixZQUFZLEVBQUUsQ0FBQyxjQUFjLEVBQUUsMEJBQTBCLEVBQUUsZUFBZSxDQUFDO1lBQzNFLE9BQU8sRUFBRTtnQkFDUCxZQUFZO2dCQUNaLGdCQUFnQjtnQkFDaEIsWUFBWTtnQkFDWixtQkFBbUI7Z0JBQ25CLFdBQVcsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQztnQkFDM0MsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN2Qyx1QkFBdUI7Z0JBQ3ZCLGFBQWE7Z0JBQ2IsZUFBZTtnQkFDZixlQUFlO2dCQUNmLGNBQWM7Z0JBQ2Qsd0JBQXdCO2dCQUN4QixZQUFZLENBQUMsT0FBTyxDQUFDO29CQUNuQixPQUFPLEVBQUUsSUFBSTtvQkFDYixhQUFhLEVBQUUsb0JBQW9CO29CQUNuQyxpQkFBaUIsRUFBRSxJQUFJO2lCQUN4QixDQUFDO2FBQ0g7WUFDRCxlQUFlLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztZQUM3QyxPQUFPLEVBQUUsQ0FBQyxjQUFjLEVBQUUsMEJBQTBCLENBQUM7WUFDckQsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDO1NBQ3ZCLENBQUM7T0FDVyxVQUFVLENBY3RCO0lBQUQsaUJBQUM7Q0FBQSxBQWRELElBY0M7U0FkWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlLCBIVFRQX0lOVEVSQ0VQVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcbmltcG9ydCB7IE1hdENhcmRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jYXJkJztcbmltcG9ydCB7IE1hdERpYWxvZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcHJvZ3Jlc3Mtc3Bpbm5lcic7XG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBTdG9yZU1vZHVsZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IEVmZmVjdHNNb2R1bGUgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcblxuaW1wb3J0IHsgVG9hc3RyTW9kdWxlIH0gZnJvbSAnbmd4LXRvYXN0cic7XG5cbmltcG9ydCB7IGF1dGhSZWR1Y2VyIH0gZnJvbSAnLi9zdG9yZS9yZWR1Y2VyJztcbmltcG9ydCB7IEF1dGhFZmZlY3RzIH0gZnJvbSAnLi9zdG9yZS9lZmZlY3RzJztcbmltcG9ydCB7IFRva2VuSW50ZXJjZXB0b3IgfSBmcm9tICcuL3NlcnZpY2VzL3Rva2VuLmludGVyY2VwdG9yJztcbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gJy4vc2VydmljZXMvYXV0aC1ndWFyZC5zZXJ2aWNlJztcbmltcG9ydCB7IExvZ0luQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2xvZy1pbi9sb2ctaW4uY29tcG9uZW50JztcbmltcG9ydCB7IEZvcmdvdHRlblBhc3N3b3JkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2ZvcmdvdHRlbi1wYXNzd29yZC9mb3Jnb3R0ZW4tcGFzc3dvcmQuY29tcG9uZW50JztcbmltcG9ydCB7IFNpZ25VcENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zaWduLXVwL3NpZ24tdXAuY29tcG9uZW50JztcblxuaW1wb3J0IHtcbiAgQXV0aE1vZHVsZUNvbmZpZyxcbiAgQVVUSF9BUElfVVJMUyxcbiAgQVVUSF9JTUFHRVNfVVJMUyxcbiAgQVVUSF9UUkFEVUNUSU9OUyxcbiAgQVVUSF9SRVNFVF9BQ1RJT05TLFxuICBBVVRIX1NUWUxFU1xufSBmcm9tICcuL3Rva2VuJztcblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtMb2dJbkNvbXBvbmVudCwgRm9yZ290dGVuUGFzc3dvcmRDb21wb25lbnQsIFNpZ25VcENvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBTdG9yZU1vZHVsZS5mb3JGZWF0dXJlKCdhdXRoJywgYXV0aFJlZHVjZXIpLFxuICAgIEVmZmVjdHNNb2R1bGUuZm9yRmVhdHVyZShbQXV0aEVmZmVjdHNdKSxcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICAgIFRvYXN0ck1vZHVsZS5mb3JSb290KHtcbiAgICAgIHRpbWVPdXQ6IDMwMDAsXG4gICAgICBwb3NpdGlvbkNsYXNzOiAndG9hc3QtYm90dG9tLXJpZ2h0JyxcbiAgICAgIHByZXZlbnREdXBsaWNhdGVzOiB0cnVlXG4gICAgfSlcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbRm9yZ290dGVuUGFzc3dvcmRDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTG9nSW5Db21wb25lbnQsIEZvcmdvdHRlblBhc3N3b3JkQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbQXV0aEd1YXJkXVxufSlcbmV4cG9ydCBjbGFzcyBBdXRoTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBBdXRoTW9kdWxlQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyczxBdXRoTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBBdXRoTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogQVVUSF9BUElfVVJMUywgdXNlVmFsdWU6IGNvbmZpZy51cmxzIH0sXG4gICAgICAgIHsgcHJvdmlkZTogQVVUSF9JTUFHRVNfVVJMUywgdXNlVmFsdWU6IGNvbmZpZy5pbWFnZXMgfSxcbiAgICAgICAgeyBwcm92aWRlOiBBVVRIX1RSQURVQ1RJT05TLCB1c2VWYWx1ZTogY29uZmlnLnRyYWR1Y3Rpb25zIH0sXG4gICAgICAgIHsgcHJvdmlkZTogQVVUSF9SRVNFVF9BQ1RJT05TLCB1c2VWYWx1ZTogY29uZmlnLnJlc2V0QWN0aW9ucyB9LFxuICAgICAgICB7IHByb3ZpZGU6IEFVVEhfU1RZTEVTLCB1c2VWYWx1ZTogY29uZmlnLnN0eWxlcyB9LFxuICAgICAgICB7IHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLCB1c2VDbGFzczogVG9rZW5JbnRlcmNlcHRvciwgbXVsdGk6IHRydWUgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==