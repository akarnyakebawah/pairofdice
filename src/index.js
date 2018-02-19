import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { ConnectedRouter } from "react-router-redux";
import { PersistGate } from "redux-persist/es/integration/react";

import App from ".routes/App";
import configureStore from "./modules/store";
import registerServiceWorker from "./registerServiceWorker";
import theme from "./_constants/theme";

import "./globalStyle";

const { persistor, store, history } = configureStore();

render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
