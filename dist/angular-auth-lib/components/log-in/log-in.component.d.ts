import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/reducer';
import { AuthModuleConfig } from '../../token';
export declare class LogInComponent implements OnInit {
    images: AuthModuleConfig['images'];
    private traductions;
    private styles;
    private formBuilder;
    private store;
    isPasswordBeingChanged$: import("rxjs").Observable<boolean>;
    userForm: FormGroup;
    usernamePlaceholder: string;
    passwordPlaceholder: string;
    forgottenPassword: string;
    loginButtonTraduction: string;
    buttonsBackgroundColor: string;
    buttonsColor: string;
    constructor(images: AuthModuleConfig['images'], traductions: AuthModuleConfig['traductions'], styles: AuthModuleConfig['styles'], formBuilder: FormBuilder, store: Store<AuthState>);
    ngOnInit(): void;
    openDialog(): void;
    onSubmit(): void;
}
