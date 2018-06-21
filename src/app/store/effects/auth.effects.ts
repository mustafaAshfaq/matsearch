import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of'
import { Injectable } from '@angular/core';
import *  as auth from '../actions/auth/auth.action';
import { User } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/Observable/of';
@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions,private authService:AuthService) { }
    @Effect()
    Login$ = this.actions$.ofType(auth.LOGIN)
        .map((action: auth.Login) => action.payload)
            .exhaustMap(authenticate =>
                this.authService.authenticateUser(authenticate)
                    .map(data => new auth.LoginSuccess({ user: this.getUserDetail(data['token']) }))
                    .catch(err => Observable.of(new auth.LoginFaliure({ error: err })))

               // Observable.of(new auth.LoginSuccess({ user: ({ email: authenticate.username, id: 1, name: 'abc' } as User) }))
    );
    @Effect({ dispatch: false })
    Logout$ = this.actions$.ofType(auth.LOGOUT)
        .do(action=>
            this.authService.logout()
    );

    @Effect()
    register$ = this.actions$.ofType(auth.REGISTER)
        .map((actn: auth.Register) => actn.payload)
        .exhaustMap(payload => this.authService.register(payload)
            .map(data => new auth.LoginSuccess({ user: this.getUserDetail(data['token']) }))
            .catch(err => Observable.of(new auth.LoginFaliure({ error: err })))
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