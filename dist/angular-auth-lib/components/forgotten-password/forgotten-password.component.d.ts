import { ElementRef, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/reducer';
import { AuthModuleConfig } from '../../token';
export declare class ForgottenPasswordComponent implements OnInit {
    private store;
    private traductions;
    private styles;
    emailInput: ElementRef;
    emailPlaceholder: string;
    sendButtonTraduction: string;
    buttonsBackgroundColor: string;
    buttonsColor: string;
    constructor(store: Store<AuthState>, traductions: AuthModuleConfig['traductions'], styles: AuthModuleConfig['styles']);
    ngOnInit(): void;
    send(): void;
}
