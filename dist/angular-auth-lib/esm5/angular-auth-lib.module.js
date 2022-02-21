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
import { ActivateUserComponent } from './components/activate-user/activate-user.component';
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
            declarations: [LogInComponent, ForgottenPasswordComponent, SignUpComponent, ActivateUserComponent],
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
            exports: [LogInComponent, ForgottenPasswordComponent, SignUpComponent, ActivateUserComponent],
            providers: [AuthGuard]
        })
    ], AuthModule);
    return AuthModule;
}());
export { AuthModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1hdXRoLWxpYi5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWF1dGgtbGliLyIsInNvdXJjZXMiOlsiYW5ndWxhci1hdXRoLWxpYi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzFELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw4REFBOEQsQ0FBQztBQUMxRyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUMzRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFekUsT0FBTyxFQUVMLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2hCLGtCQUFrQixFQUNsQixXQUFXLEVBQ1osTUFBTSxTQUFTLENBQUM7QUE0QmpCO0lBQUE7SUFjQSxDQUFDO21CQWRZLFVBQVU7SUFDZCxrQkFBTyxHQUFkLFVBQWUsTUFBd0I7UUFDckMsT0FBTztZQUNMLFFBQVEsRUFBRSxZQUFVO1lBQ3BCLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQ2pELEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUN0RCxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRTtnQkFDM0QsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxZQUFZLEVBQUU7Z0JBQzlELEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDakQsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7YUFDeEU7U0FDRixDQUFDO0lBQ0osQ0FBQzs7SUFiVSxVQUFVO1FBekJ0QixRQUFRLENBQUM7WUFDUixZQUFZLEVBQUUsQ0FBQyxjQUFjLEVBQUUsMEJBQTBCLEVBQUUsZUFBZSxFQUFFLHFCQUFxQixDQUFDO1lBQ2xHLE9BQU8sRUFBRTtnQkFDUCxZQUFZO2dCQUNaLGdCQUFnQjtnQkFDaEIsWUFBWTtnQkFDWixtQkFBbUI7Z0JBQ25CLFdBQVcsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQztnQkFDM0MsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN2Qyx1QkFBdUI7Z0JBQ3ZCLGFBQWE7Z0JBQ2IsZUFBZTtnQkFDZixlQUFlO2dCQUNmLGNBQWM7Z0JBQ2Qsd0JBQXdCO2dCQUN4QixZQUFZLENBQUMsT0FBTyxDQUFDO29CQUNuQixPQUFPLEVBQUUsSUFBSTtvQkFDYixhQUFhLEVBQUUsb0JBQW9CO29CQUNuQyxpQkFBaUIsRUFBRSxJQUFJO2lCQUN4QixDQUFDO2FBQ0g7WUFDRCxlQUFlLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztZQUM3QyxPQUFPLEVBQUUsQ0FBQyxjQUFjLEVBQUUsMEJBQTBCLEVBQUUsZUFBZSxFQUFFLHFCQUFxQixDQUFDO1lBQzdGLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQztTQUN2QixDQUFDO09BQ1csVUFBVSxDQWN0QjtJQUFELGlCQUFDO0NBQUEsQUFkRCxJQWNDO1NBZFksVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSwgSFRUUF9JTlRFUkNFUFRPUlMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5pbXBvcnQgeyBNYXRDYXJkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2FyZCc7XG5pbXBvcnQgeyBNYXREaWFsb2dNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7IE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Byb2dyZXNzLXNwaW5uZXInO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgU3RvcmVNb2R1bGUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBFZmZlY3RzTW9kdWxlIH0gZnJvbSAnQG5ncngvZWZmZWN0cyc7XG5cbmltcG9ydCB7IFRvYXN0ck1vZHVsZSB9IGZyb20gJ25neC10b2FzdHInO1xuXG5pbXBvcnQgeyBhdXRoUmVkdWNlciB9IGZyb20gJy4vc3RvcmUvcmVkdWNlcic7XG5pbXBvcnQgeyBBdXRoRWZmZWN0cyB9IGZyb20gJy4vc3RvcmUvZWZmZWN0cyc7XG5pbXBvcnQgeyBUb2tlbkludGVyY2VwdG9yIH0gZnJvbSAnLi9zZXJ2aWNlcy90b2tlbi5pbnRlcmNlcHRvcic7XG5pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tICcuL3NlcnZpY2VzL2F1dGgtZ3VhcmQuc2VydmljZSc7XG5pbXBvcnQgeyBMb2dJbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9sb2ctaW4vbG9nLWluLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb3Jnb3R0ZW5QYXNzd29yZENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9mb3Jnb3R0ZW4tcGFzc3dvcmQvZm9yZ290dGVuLXBhc3N3b3JkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBY3RpdmF0ZVVzZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYWN0aXZhdGUtdXNlci9hY3RpdmF0ZS11c2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaWduVXBDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc2lnbi11cC9zaWduLXVwLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7XG4gIEF1dGhNb2R1bGVDb25maWcsXG4gIEFVVEhfQVBJX1VSTFMsXG4gIEFVVEhfSU1BR0VTX1VSTFMsXG4gIEFVVEhfVFJBRFVDVElPTlMsXG4gIEFVVEhfUkVTRVRfQUNUSU9OUyxcbiAgQVVUSF9TVFlMRVNcbn0gZnJvbSAnLi90b2tlbic7XG5cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTG9nSW5Db21wb25lbnQsIEZvcmdvdHRlblBhc3N3b3JkQ29tcG9uZW50LCBTaWduVXBDb21wb25lbnQsIEFjdGl2YXRlVXNlckNvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBTdG9yZU1vZHVsZS5mb3JGZWF0dXJlKCdhdXRoJywgYXV0aFJlZHVjZXIpLFxuICAgIEVmZmVjdHNNb2R1bGUuZm9yRmVhdHVyZShbQXV0aEVmZmVjdHNdKSxcbiAgICBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxuICAgIFRvYXN0ck1vZHVsZS5mb3JSb290KHtcbiAgICAgIHRpbWVPdXQ6IDMwMDAsXG4gICAgICBwb3NpdGlvbkNsYXNzOiAndG9hc3QtYm90dG9tLXJpZ2h0JyxcbiAgICAgIHByZXZlbnREdXBsaWNhdGVzOiB0cnVlXG4gICAgfSlcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbRm9yZ290dGVuUGFzc3dvcmRDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTG9nSW5Db21wb25lbnQsIEZvcmdvdHRlblBhc3N3b3JkQ29tcG9uZW50LCBTaWduVXBDb21wb25lbnQsIEFjdGl2YXRlVXNlckNvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW0F1dGhHdWFyZF1cbn0pXG5leHBvcnQgY2xhc3MgQXV0aE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogQXV0aE1vZHVsZUNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8QXV0aE1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQXV0aE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IEFVVEhfQVBJX1VSTFMsIHVzZVZhbHVlOiBjb25maWcudXJscyB9LFxuICAgICAgICB7IHByb3ZpZGU6IEFVVEhfSU1BR0VTX1VSTFMsIHVzZVZhbHVlOiBjb25maWcuaW1hZ2VzIH0sXG4gICAgICAgIHsgcHJvdmlkZTogQVVUSF9UUkFEVUNUSU9OUywgdXNlVmFsdWU6IGNvbmZpZy50cmFkdWN0aW9ucyB9LFxuICAgICAgICB7IHByb3ZpZGU6IEFVVEhfUkVTRVRfQUNUSU9OUywgdXNlVmFsdWU6IGNvbmZpZy5yZXNldEFjdGlvbnMgfSxcbiAgICAgICAgeyBwcm92aWRlOiBBVVRIX1NUWUxFUywgdXNlVmFsdWU6IGNvbmZpZy5zdHlsZXMgfSxcbiAgICAgICAgeyBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUywgdXNlQ2xhc3M6IFRva2VuSW50ZXJjZXB0b3IsIG11bHRpOiB0cnVlIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=