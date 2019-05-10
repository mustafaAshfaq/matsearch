import { Actions, Effect,ofType } from '@ngrx/effects';

import { Observable,of, pipe } from 'rxjs';
import {map,exhaustMap,catchError,tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import *  as auth from '../actions/auth/auth.action';
import { User } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions,private authService:AuthService) { }
    @Effect()
    Login$ = this.actions$.pipe(ofType(auth.LOGIN),
        map((action: auth.Login) => action.payload)
            ,exhaustMap(authenticate =>
                this.authService.authenticateUser(authenticate).pipe(
                    map(data => new auth.LoginSuccess({ user: this.getUserDetail(data['token']) }))
                    ,catchError(err => of(new auth.LoginFaliure({ error: err })))
                )));
    @Effect({ dispatch: false })
    Logout$ = this.actions$.pipe(ofType(auth.LOGOUT)
        ,tap(action=>
            this.authService.logout()
    ));

    @Effect()
    register$ = this.actions$.pipe(ofType(auth.REGISTER)
        ,map((actn: auth.Register) => actn.payload)
        ,exhaustMap(payload => this.authService.register(payload))
            ,map(data => new auth.LoginSuccess({ user: this.getUserDetail(data['token']) }))
            ,catchError(err => of(new auth.LoginFaliure({ error: err })))
        );
    private getUserDetail(token: string): User {
        let data = token.split('.');
        if (data && data.length > 0) {
            let payload = data[1];
            let user = atob(payload);

            return JSON.parse(user);
        }
        return null;
    }
}