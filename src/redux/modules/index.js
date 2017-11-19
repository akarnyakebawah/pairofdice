import { routerReducer } from 'react-router-redux';
import auth from './auth';
import campaign from './campaign';

export default {
  auth,
  campaign,
  router: routerReducer,
};
