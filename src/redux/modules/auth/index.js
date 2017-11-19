import * as api from '../../../api';
import * as localStorageKey from '../../../constants/localStorage';

const ERROR_CLEAR = 'auth/error_clear';
const ERROR_SET = 'auth/error_set';
const LOADED = 'auth/loaded';
const LOADING = 'auth/loading';
const LOADING_COMPLETE = 'auth/loading_complete';
const LOGIN = 'auth/login';
const LOGOUT = 'auth/logout';
const TOKEN_SET = 'auth/token_set';
const REHYDRATE = 'persist/REHYDRATE';

const INITIAL_STATE = {
  loading: true,
  loaded: false,
  error: null,
  user: {},
  token: '',
};

export default function reducer(state = Object.assign({}, INITIAL_STATE), action = {}) {
  switch (action.type) {
    case ERROR_SET:
      return { ...state, error: action.payload };
    case ERROR_CLEAR:
      return { ...state, error: null };
    case LOADED:
      return { ...state, loaded: true };
    case LOADING:
      return { ...state, loading: true };
    case LOADING_COMPLETE:
      return { ...state, loading: false };
    case LOGIN:
      return { ...state, user: { ...action.payload.user }, token: action.payload.token };
    case LOGOUT:
      return { ...state, error: {}, user: {}, token: '' };
    case REHYDRATE:
      if (!action.payload || !action.payload.auth) return state;
      return { ...action.payload.auth, loading: false, loaded: true, error: null };
    case TOKEN_SET:
      return { ...state, loaded: true, token: action.payload };
    default:
      return state;
  }
}

// Action Creator
export function completeLoading() {
  return { type: LOADING_COMPLETE };
}

export function clearError() {
  return { type: ERROR_CLEAR };
}

export function loaded() {
  return { type: LOADED };
}

export function loading() {
  return { type: LOADING };
}

export function onLogin(payload) {
  return { type: LOGIN, payload };
}

export function onLogout() {
  return { type: LOGOUT };
}

export function setError(payload) {
  return { type: ERROR_SET, payload, error: true };
}

export function setToken(payload) {
  return { type: TOKEN_SET, payload };
}

// Thunk

export function reload() {
  return async (dispatch) => {
    dispatch(loading());
    const token = localStorage.getItem(localStorageKey.TOKEN);
    if (token) {
      api.setAuthorizationToken(token);
      dispatch(setToken(token));
    }
    dispatch(loaded());
    dispatch(completeLoading());
  };
}

export function login(credentials) {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { body: result } = await api.login(credentials);
      localStorage.setItem(localStorageKey.TOKEN, result.token);
      api.setAuthorizationToken(result.token);
      dispatch(onLogin(result));
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
    }
    dispatch(completeLoading());
  };
}

export function logout() {
  return async (dispatch) => {
    dispatch(loading());
    localStorage.removeItem(localStorageKey.TOKEN);
    api.setAuthorizationToken(null);
    dispatch(onLogout());
    dispatch(completeLoading());
  };
}

export function register(credentials) {
  return async (dispatch) => {
    dispatch(loading());
    let user;
    try {
      const { body: user } = await api.register(credentials);
      await dispatch(login(credentials));
    } catch (error) {
      console.log(user);
      dispatch(setError(error));
    }
    dispatch(completeLoading());
  };
}
