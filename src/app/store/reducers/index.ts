import {  ActionReducerMap,MetaReducer } from '@ngrx/store';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { RouterStateUrl } from '../../shared/utils';
import * as Auth from './auth';
export interface State extends Auth.AuthState {
    router: RouterReducerState<RouterStateUrl>
}
export const reducer: ActionReducerMap<State> = {
    router: routerReducer,
    ...Auth.Authreducer
    //fromAuth: Auth.Authreducer.fromAuth,
    //login: Auth.Authreducer.login
};
export const metaReducers: MetaReducer<State>[] = [];
