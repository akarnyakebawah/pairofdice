import * as api from '../../../api';

const CAMPAIGN_CREATED = 'campaign/CAMPAIGN_CREATED';
const CAMPAIGN_LOADED = 'campaign/CAMPAIGN_LOADED';
const ERROR_CLEAR = 'campaign/ERROR_CLEAR';
const ERROR_SET = 'campaign/ERROR_SET';
const LOADED = 'campaign/LOADED';
const LOADING = 'campaign/LOADING';
const LOADING_COMPLETE = 'campaign/LOADING_COMPLETE';
const REHYDRATE = 'persist/REHYDRATE';

const INITIAL_STATE = {
  campaign: {},
  loading: false,
  loaded: false,
  error: null,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case CAMPAIGN_CREATED:
      return { ...state, campaign: action.payload };
    case CAMPAIGN_LOADED:
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
    // case REHYDRATE:
    //   if (!action.payload || !action.payload.campaign || !action.payload.campaign.campaign) {
    //     return state;
    //   }
    //   return { ...action.payload.campaign, loading: false, loaded: true, error: null };
    default:
      return state;
  }
}

// Action Creators
export function createdCampaign(payload) {
  return { type: CAMPAIGN_CREATED, payload };
}

function loadedCampaign(payload) {
  return { type: CAMPAIGN_LOADED, payload };
}

function completeLoading() {
  return { type: LOADING_COMPLETE };
}

function clearError() {
  return { type: ERROR_CLEAR };
}

function loaded() {
  return { type: LOADED };
}

function loading() {
  return { type: LOADING };
}

function setError(payload) {
  return { type: ERROR_SET, payload, error: true };
}

// Thunks
export function loadCampaign(campaignUrl) {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { body: campaign } = await api.getCampaign(campaignUrl);
      dispatch(clearError());
      dispatch(loadedCampaign(campaign));
      dispatch(loaded());
    } catch (error) {
      dispatch(setError(error));
    }
    dispatch(completeLoading());
  };
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
