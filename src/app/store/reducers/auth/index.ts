import { ActionReducerMap, createFeatureSelector, createSelector,combineReducers, ActionReducer } from '@ngrx/store';
import {compose} from '@ngrx/core/compose';
import {reducer as authReducer,AuthState ,getLoggedIn,getLoggedInUser} from './auth.reducer';
import {reducer as loginReducer,LoginState,getError,getPending} from './login.reducer';
export {authReducer as authReducer};
export {loginReducer as loginReducer}
export interface State {
    fromAuth: AuthState,
    login: LoginState
}


//   const reducer= compose(combineReducers)({fromAuth:authReducer,login:loginReducer});

//  export function AuthReducer(state:State,action:any){
//      return reducer(state,action);
//  }

//  export const Authreducer:  ActionReducerMap<State> = {
//      fromAuth: authReducer,
//      login: loginReducer
//  }

export const selectAuth = createFeatureSelector<AuthState>('fromAuth');

export const selectLoggedIn = createSelector(selectAuth, getLoggedIn);
export const selectLoggedInUser = createSelector(selectAuth, getLoggedInUser);
export const selectLogin = createFeatureSelector<LoginState>('login');
export const selectLoginError = createSelector(selectLogin, getError);
export const selectLoginPending = createSelector(selectLogin, getPending);