import { login } from '../../../api';

const REHYDRATE = 'persist/REHYDRATE';
const LOGIN = 'auth/login';
const LOGIN_SUCCESS = 'auth/login_success';
const LOGIN_ERROR = 'auth/login_error';

const LOGOUT = 'auth/logout';

const INITIAL_STATE = {
  loading: false,
  loaded: false,
  error: null,
  user: null,
  token: null,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case REHYDRATE:
      if (!action.payload.auth) return state;
      return {
        ...action.payload.auth,
        loading: false,
      };
    case LOGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        loaded: false,
        user: { ...action.payload.user },
        token: action.payload.token,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case LOGOUT:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
}

// Action Creator
export function successLogin(payload) {
  return { type: LOGIN_SUCCESS, payload };
}

export function errorLogin(error) {
  return { type: LOGIN_ERROR, error };
}

// Thunk
export function authLogin(username, password) {
  return async (dispatch) => {
    dispatch({ type: LOGIN });
    try {
      const { body: result } = await login(username, password);
      localStorage.setItem('authenticationToken', result.token);
      dispatch(successLogin(result));
    } catch (error) {
      dispatch(errorLogin(error));
    }
  };
}

export function authLogout() {
  return async (dispatch) => {
    localStorage.removeItem('authenticationToken');
    return dispatch({ type: LOGOUT });
  };
}
