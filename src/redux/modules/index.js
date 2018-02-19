import { routerReducer } from "react-router-redux";
import auth from "./auth";
import twibbon from "./twibbon";

import campaign from "./campaign";

export default {
  auth,
  campaign,
  twibbon,
  router: routerReducer
};
