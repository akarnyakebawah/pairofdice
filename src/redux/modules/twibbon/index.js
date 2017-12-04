import * as api from '../../../api';
import * as apiUrl from '../../../constants/apiUrl';

const TWIBBON_CREATED = 'twibbon/CAMPAIGN_CREATED';
const ERROR_CLEAR = 'twibbon/ERROR_CLEAR';
const ERROR_SET = 'twibbon/ERROR_SET';
const LOADED = 'twibbon/LOADED';
const LOADING = 'twibbon/LOADING';
const LOADING_COMPLETE = 'twibbon/LOADING_COMPLETE';
const IMAGE_RESIZED = 'twibbon/IMAGE_RESIZED';
const IMAGE_CHANGED = 'twibbon/IMAGE_CHANGED';
const IMAGE_CLEARED = 'twibbon/IMAGE_CLEARED';
const REHYDRATE = 'persist/REHYDRATE';

const INITIAL_STATE = {
  result: '',
  uploaded: false,
  imageDataUrl: '',
  imageFile: '',
  loading: false,
  loaded: false,
  error: null,
};

export default function reducer(state = Object.assign({}, INITIAL_STATE), action = {}) {
  switch (action.type) {
    case TWIBBON_CREATED:
      return { ...state, result: action.payload, uploaded: true };
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
    case IMAGE_CHANGED:
      return { ...state, ...action.payload };
    case IMAGE_CLEARED:
      return { ...INITIAL_STATE };
    case IMAGE_RESIZED:
      return { ...state, relativeImage: action.payload.relative_img };
    case REHYDRATE:
      if (!action.payload || !action.payload.createTwibbon) return state;
      return { ...action.payload.createTwibbon, loading: false, loaded: true, error: null };
    default:
      return state;
  }
}

// Action Creator
export function imageChanged(payload) {
  return {
    type: IMAGE_CHANGED,
    payload,
  };
}

export function imageCleared() {
  return { type: IMAGE_CLEARED };
}

export function createdTwibbon(payload) {
  return { type: TWIBBON_CREATED, payload };
}

export function resizedImage(payload) {
  return { type: IMAGE_RESIZED, payload };
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
export function createTwibbon({ x, y, width, height }) {
  return async (dispatch, getState) => {
    dispatch(loading());

    try {
      // Get url of original image and of campaign
      const state = getState();
      const { campaign } = state.campaign;
      const overlayImage = campaign.twibbon_img;

      const { imageFile } = state.twibbon;

      // Get url of original image and of campaign
      const { body } = await api.uploadImage({ imageFile });
      const relativeImage = body.relative_img;

      // Tembak ke imgix buat di overlay
      let campaignUrl = overlayImage;
      if (campaignUrl.indexOf('?') !== -1) {
        campaignUrl = campaignUrl.slice(0, campaignUrl.indexOf('?'));
      }

      // Query to generate overlayed image
      const result = apiUrl.overlayImageQuery(
        relativeImage,
        encodeURI(campaignUrl),
        x,
        y,
        width,
        height,
      );

      dispatch(createdTwibbon(result));
    } catch (e) {
      dispatch(setError(e));
    }

    dispatch(completeLoading());
  };
}

export function createTwibbonBeneran({ campaignUrl, caption, image }) {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { body: result } = await api.postTwibbon({ campaignUrl, caption, image });
      dispatch(createdTwibbon(result));
      dispatch(clearError());
      dispatch(loaded());
    } catch (error) {
      dispatch(setError(error));
    }
    dispatch(completeLoading());
  };
}

export function uploadImage({ image }) {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const { body: result } = await api.uploadImage({ image });
      dispatch(resizedImage(result));
    } catch (error) {
      dispatch(setError(error));
    }
    dispatch(completeLoading());
  };
}

export function onImageChange({ imageDataUrl, imageFile }) {
  return (dispatch) => {
    dispatch(imageChanged({ imageDataUrl, imageFile }));
  };
}

export function clearImage() {
  return (dispatch) => {
    dispatch(imageCleared());
  };
}
