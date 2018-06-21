import { AuthState as State,defaultAuthState} from '../../states/auth/auth.state';
import * as authActions from '../../actions/auth/auth.action';
import { ActionReducer } from '@ngrx/store';
export { State as AuthState };
const initialRecord = new defaultAuthState() as State;
export const reducer: ActionReducer<State> = (state = initialRecord, action: authActions.Actions) => {
    console.log('from auth reducer'+ action.type);
    switch (action.type) {
        case authActions.LOGIN_SUCCESS:
            return state.merge({
                user: action.payload.user,
                loggedIn: true
            }) as State;
        case authActions.LOGOUT:
            return initialRecord;
        default:
            return state;
    }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getLoggedInUser = (state: State) => state.user;