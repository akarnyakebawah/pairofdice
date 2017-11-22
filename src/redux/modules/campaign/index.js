import * as api from '../../../api';

const CAMPAIGN_LOADED = 'campaign/campaign_loaded';
const ERROR_CLEAR = 'campaign/error_clear';
const ERROR_SET = 'campaign/error_set';
const LOADED = 'campaign/loaded';
const LOADING = 'campaign/loading';
const LOADING_COMPLETE = 'campaign/loading_complete';
const REHYDRATE = 'persist/REHYDRATE';

const INITIAL_STATE = {
  campaign: {},
  loading: false,
  loaded: false,
  error: null,
};

export default function reducer(
  state = INITIAL_STATE,
  action = {},
) {
  switch (action.type) {
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
    case REHYDRATE:
      if (!action.payload || !action.payload.campaign || !action.payload.campaign.campaign) {
        return state;
      }
      return { ...action.payload.campaign, loading: false, loaded: true, error: null };
    default:
      return state;
  }
}

// Action Creators
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
