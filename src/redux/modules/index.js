import { routerReducer } from 'react-router-redux';
import auth from './auth';
import createCampaign from './createCampaign';

export default {
  auth,
  createCampaign,
  router: routerReducer,
};
