import { login, setRequestAuthorization } from '../../api';

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
      return {
        ...action.payload.auth,
        loading: false,
      }
    LOGIN:
      return {
        ...state,
        loading: true,
        error: null,
      }
    LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        loaded: false,
        user: { ...action.payload.user },
        token: action.payload.token,
      }
    LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    LOGOUT:
      return {
        ...INITIAL_STATE,
      }
  }
}

export const authLogin = (username, password) => {
  return dispatch => {
    dispatch({ type: LOGIN });
    login(username, password).then(value => {
      const result = value.body;
      localStorage.setItem('authenticationToken', result.token);
      return dispatch({ type: LOGIN_SUCCESS, payload: result });
    }, error => {
      return dispatch({ type: LOGIN_ERROR, error });
    });
  }
}

export const authLogout = () => {
  return dispatch => {
    localStorage.setItem('authenticationToken', '');
    return dispatch({ type: LOGOUT });
  }
}