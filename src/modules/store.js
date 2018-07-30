import thunk from "redux-thunk";
import storage from "redux-persist/es/storage";
import createHistory from "history/createBrowserHistory";
//import logger from "redux-logger";
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import { routerReducer } from "react-router-redux";

import { toastMiddleware } from "./toast/toastMiddleware";

import {
  createAuthService,
  createCampaignService,
  createHelpersService,
  createTwibbonService,
  createUserService
} from "modules/services";

import auth from "./auth";
import twibbon from "./twibbon";
import campaign from "./campaign";

const rootReducer = {
  auth,
  campaign,
  twibbon,
  router: routerReducer
};

const isOnProduction = () => process.env.NODE_ENV === "production";

export default function configureStore(initialState) {
  const config = {
    key: "root",
    storage
  };

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const history = createHistory();

  const enhancer = composeEnhancers(
    applyMiddleware(
      //isOnProduction() ? null : logger, // important, don't turn on logger on production!
      routerMiddleware(history),
      toastMiddleware,
      thunk.withExtraArgument({
        AuthService: createAuthService(),
        CampaignService: createCampaignService(),
        HelpersService: createHelpersService(),
        UserService: createUserService(),
        TwibbonService: createTwibbonService()
      })
    )
  );
  const store = createStore(persistCombineReducers(config, rootReducer), initialState, enhancer);

  const persistor = persistStore(store);

  if (!isOnProduction() && module.hot) {
    module.hot.accept(rootReducer, () => store.replaceReducer(rootReducer));
  }

  return { history, persistor, store };
}
