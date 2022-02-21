import { ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthModuleConfig } from '../../token';
import { AuthState } from '../../store/reducer';
import { ActivatedRoute } from '@angular/router';
export declare class ActivateUserComponent implements OnInit, AfterViewInit {
    private store;
    private route;
    private traductions;
    private styles;
    images: AuthModuleConfig['images'];
    activationCodeInput: ElementRef;
    isSendActivationCodeLoading$: import("rxjs").Observable<boolean>;
    activationCodePlaceholder: string;
    buttonsBackgroundColor: string;
    buttonsColor: string;
    sendActivationButtonTraduction: string;
    constructor(store: Store<AuthState>, route: ActivatedRoute, traductions: AuthModuleConfig['traductions'], styles: AuthModuleConfig['styles'], images: AuthModuleConfig['images']);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    onSubmitActivationCode(): void;
}
