import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as authReducer from './auth.reducer';
import * as loginReducer from './login.reducer';
export interface AuthState {
    fromAuth: authReducer.AuthState,
    login: loginReducer.LoginState
}

//export interface State {
//    auth: AuthState
//}
export const Authreducer: ActionReducerMap<AuthState> = {
    fromAuth: authReducer.reducer,
    login: loginReducer.reducer
}

export const selectAuth = createFeatureSelector<authReducer.AuthState>('fromAuth');

export const selectLoggedIn = createSelector(selectAuth, authReducer.getLoggedIn);
export const selectLoggedInUser = createSelector(selectAuth, authReducer.getLoggedInUser);
export const selectLogin = createFeatureSelector<loginReducer.LoginState>('login');
export const selectLoginError = createSelector(selectLogin, loginReducer.getError);
export const selectLoginPending = createSelector(selectLogin, loginReducer.getPending);