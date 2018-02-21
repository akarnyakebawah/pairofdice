/* @flow */
import { connect } from "react-redux";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import React from "react";
import ReactGA from "react-ga";
import styled from "styled-components";

// Redux
import { reload as reloadAuth, logout } from "../modules/authentication";

// Routes
import * as routes from "./constants";

// Containers
import Landing from "./landing";
import Campaign from "./campaign";
import CreateCampaign from "./t/create";
import Login from "./t/login";
import Logout from "./t/logout";
import Register from "./t/register";

// Layouts
import DefaultLayout from "./_layouts/Default";

interface PropTypes {
  auth: {
    loaded: boolean,
    loading: boolean,
    token: string
  };
  location: {
    pathname: string
  };
  reloadAuth: func;
  logout: func;
}

class App extends React.Component<PropTypes, any> {
  async componentDidMount() {
    await this.props.reloadAuth();
    ReactGA.initialize("UA-109827623-1");
    ReactGA.pageview(window.location.href);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      ReactGA.pageview(window.location.href);
    }
  }

  render() {
    return (
      <Switch>
        <DefaultLayout>
          <Route exact path={routes.BASE_ROUTE} component={Landing} />
          <Route path={routes.LOGIN_ROUTE} component={Login} />
          <Route path={routes.REGISTER_ROUTE} component={Register} />
          <Route
            path={routes.CREATE_CAMPAIGN_ROUTE}
            component={CreateCampaign}
          />
          <Route
            path={`${routes.BASE_ROUTE}:campaignUrl`}
            component={Campaign}
          />
          <Route path={routes.LOGOUT_ROUTE} component={Logout} />
        </DefaultLayout>
      </Switch>
    );
  }
}

export default withRouter(connect(state => state, { reloadAuth })(App));
