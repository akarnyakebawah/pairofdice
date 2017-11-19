import { routerReducer } from 'react-router-redux';
import auth from './auth';
import createCampaign from './createCampaign';
import campaign from './campaign';


export default {
  auth,
  createCampaign,
  campaign,
  router: routerReducer,
};
