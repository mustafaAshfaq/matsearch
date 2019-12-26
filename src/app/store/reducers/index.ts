import {  ActionReducerMap,MetaReducer,createFeatureSelector,createSelector} from '@ngrx/store';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { RouterStateUrl } from '../../shared/utils';
import * as Auth  from './auth';
import {AuthState} from '../states/auth/auth.state';
export interface State extends Auth.State  {
    router: RouterReducerState<RouterStateUrl>
}

 export const reducer: ActionReducerMap<State> = {
    router: routerReducer,
    fromAuth:Auth.authReducer,
    login:Auth.loginReducer
};
const authFeature = createFeatureSelector<AuthState>('fromAuth');
export const getAuthStatus=createSelector(authFeature,
    (fromAuth)=>fromAuth.loggedIn)

export const metaReducers: MetaReducer<State>[] = [];
