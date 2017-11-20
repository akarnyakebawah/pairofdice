import * as api from '../../../api';

const TWIBBON_CREATED = 'create_twibbon/campaign_created';
const ERROR_CLEAR = 'create_twibbon/error_clear';
const ERROR_SET = 'create_twibbon/error_set';
const LOADED = 'create_twibbon/loaded';
const LOADING = 'create_twibbon/loading';
const LOADING_COMPLETE = 'create_twibbon/loading_complete';

const INITIAL_STATE = {
  result: {},
  loading: false,
  loaded: false,
  error: null,
};

export default function reducer(
  state = INITIAL_STATE,
  action = {},
) {
  switch (action.type) {
    case TWIBBON_CREATED:
      return { ...state, result: action.payload };
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
    default:
      return state;
  }
}

// Action Creator
export function createdTwibbon(payload) {
  return { type: TWIBBON_CREATED, payload };
}

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

export function setError(payload) {
  return { type: ERROR_SET, payload, error: true };
}

// Thunk
export function createTwibbon({ campaignUrl, caption, image }) {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const {body: result} = await api.postTwibbon({ campaignUrl, caption, image });
      dispatch(createdTwibbon(result));
      dispatch(clearError());
      dispatch(loaded());
    } catch (error) {
      dispatch(setError(error));
    }
    dispatch(completeLoading());
  };
}