import * as api from '../../../api';

const CAMPAIGN_CREATED = 'create_campaign/campaign_created';
const ERROR_CLEAR = 'create_campaign/error_clear';
const ERROR_SET = 'create_campaign/error_set';
const LOADED = 'create_campaign/loaded';
const LOADING = 'create_campaign/loading';
const LOADING_COMPLETE = 'create_campaign/loading_complete';
const REHYDRATE = 'persist/REHYDRATE';

const INITIAL_STATE = {
  campaign: {},
  loading: true,
  loaded: false,
  error: null,
};

export default function reducer(
  state = INITIAL_STATE,
  action = {},
) {
  switch (action.type) {
    case CAMPAIGN_CREATED:
      return { ...state, campaign: action.payload };
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
    case REHYDRATE:
      if (!action.payload || !action.payload.campaign) return state;
      return { ...action.payload.campaign, loading: false, loaded: true, error: null };
    default:
      return state;
  }
}

// Action Creator
export function createdCampaign(payload) {
  return { type: CAMPAIGN_CREATED, payload };
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
export function createCampaign({ captions, name, image, url }) {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { body: campaign } = await api.postCampaign({ captions, name, image, url });
      dispatch(clearError());
      dispatch(createdCampaign(campaign));
    } catch (error) {
      dispatch(setError(error));
    }
    dispatch(loaded());
    return dispatch(completeLoading());
  };
}
