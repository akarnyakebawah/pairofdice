import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import configureStore from './redux/configureStore';
import App from './containers/';
import theme from './constants/theme';
import './style';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();


const history = createHistory();
export default history;

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  // eslint-disable-next-line
  document.getElementById('app'),
);
registerServiceWorker();
