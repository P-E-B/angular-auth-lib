import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/reducer';
import { AuthModuleConfig } from '../../token';
export declare class SignUpComponent implements OnInit {
    private traductions;
    private styles;
    dialogRef: MatDialogRef<SignUpComponent>;
    private formBuilder;
    private store;
    userForm: FormGroup;
    usernamePlaceholder: string;
    passwordPlaceholder: string;
    firstNamePlaceholder: string;
    lastNamePlaceholder: string;
    emailPlaceholder: string;
    enterprisePlaceholder: string;
    signUpDialogTitle: string;
    signupButtonTraduction: string;
    buttonsBackgroundColor: string;
    buttonsColor: string;
    constructor(traductions: AuthModuleConfig['traductions'], styles: AuthModuleConfig['styles'], dialogRef: MatDialogRef<SignUpComponent>, formBuilder: FormBuilder, store: Store<AuthState>);
    ngOnInit(): void;
    onSubmit(): void;
}
