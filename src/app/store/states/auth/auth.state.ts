import { User } from '../../../models/auth.model';
import { Record, Map } from 'immutable';

export interface AuthState extends Map<string,any>  {
    user: User,
    loggedIn:boolean
}

export const defaultAuthState = Record({
    user: null,
    loggedIn: false
});