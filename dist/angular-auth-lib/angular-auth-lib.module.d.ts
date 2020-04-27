import { ModuleWithProviders } from '@angular/core';
import { AuthModuleConfig } from './token';
export declare class AuthModule {
    static forRoot(config: AuthModuleConfig): ModuleWithProviders<AuthModule>;
}
