import { routerReducer } from 'react-router-redux';
import auth from './auth';
import createCampaign from './createCampaign';
import createTwibbon from './createTwibbon';

import campaign from './campaign';


export default {
  auth,
  createCampaign,
  campaign,
  createTwibbon,
  router: routerReducer,
};
