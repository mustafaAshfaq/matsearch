import {  ActionReducerMap,MetaReducer,combineReducers} from '@ngrx/store';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { RouterStateUrl } from '../../shared/utils';
import * as Auth  from './auth';
export interface State extends Auth.State  {
    router: RouterReducerState<RouterStateUrl>
}

 export const reducer: ActionReducerMap<State> = {
    router: routerReducer,
    fromAuth:Auth.authReducer,
    login:Auth.loginReducer
};
export const metaReducers: MetaReducer<State>[] = [];
