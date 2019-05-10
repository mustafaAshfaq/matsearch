import * as auth from '../../actions/auth/auth.action';
import { LoginState as State, LoginStateRecord } from '../../states/auth/login.state';
export { State as LoginState };
export const initialState: State = new LoginStateRecord() as any;

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.LOGIN: {
      return state.merge({
        error: null,
        pending: true,
      }) as State;
    }

    case auth.LOGIN_SUCCESS: {
      return state.merge({
        error: null,
        pending: false,
      }) as State;
    }

    case auth.LOGIN_FAILURE: {
      return state.merge({
        error: action.payload.error,
        pending: false,
      }) as State;
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: State) => state.error;
export const getPending = (state: State) => state.pending;
