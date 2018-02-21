/* @flow */
import React, { Component } from "react";
import { connect } from "react-redux";

// Redux
import { logout } from "modules/auth";

// Components
import LoadingIndicator from "components/LoadingIndicator";

import { BASE_ROUTE } from "routes/constants";

interface Props {
  auth: {
    loading: boolean,
    token: string
  };
  history: {
    replace: func,
    push: func
  };
  logout: func;
}

class Logout extends Component<Props, any> {
  async componentDidMount() {
    await this.props.logout();
    this.props.history.push(BASE_ROUTE);
  }

  render() {
    return <LoadingIndicator />;
  }
}

export default connect(
  state => ({
    auth: state.auth
  }),
  { logout }
)(Logout);
