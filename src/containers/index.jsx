import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './Landing';
import Login from './Login';
import { loadAuthorizationToken } from '../api';
import * as routes from '../constants/routes';
import ReactGA from 'react-ga';

class Home extends Component {
  componentDidMount() {
    loadAuthorizationToken();
    ReactGA.initialize('UA-109827623-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    return (
      <Switch>
        <Route exact path={routes.BASE_ROUTE} component={Landing} />
        <Route path={routes.LOGIN_ROUTE} component={Login} />
      </Switch>
    );
  }
}

export default Home;
