﻿import { Action } from '@ngrx/store';
import { User, Authenticate } from '../../../models/auth.model';
export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';
export const LOGIN_REDIRECT = '[Auth] Login Redirect';
export const REGISTER = '[Auth] Register';
export const AUTHORIZED = '[Auth] Authorized';

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: Authenticate) { }
}
export class Logout implements Action {
    readonly type = LOGOUT;
    constructor(public payload: any= {}) { }
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload: { user: User }) { }
}

export class LoginFaliure implements Action {
    readonly type = LOGIN_FAILURE;
    constructor(public payload: any) { }
}

export class LoginRedirect implements Action {
    readonly type = LOGIN_REDIRECT;
    constructor(public payload: any = {}) { }
}

export class Register implements Action {
    readonly type = REGISTER;
    constructor(public payload: Authenticate) { }
}

export class Authorized implements Action {
    readonly type = AUTHORIZED;
}

export type Actions = Login | Logout | LoginSuccess | LoginFaliure | LoginRedirect;