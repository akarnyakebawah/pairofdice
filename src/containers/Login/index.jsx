import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginForm from '../../components/LoginForm';
import { authLogin } from '../../redux/modules/auth';

@connect(
  state => ({
    auth: state.auth,
  }),
  dispatch => ({
    actionLogin: (username, password) => dispatch(authLogin(username, password)),
  }),
)
class Login extends Component {
  render() {
    const { actionLogin } = this.props;

    return (
      <LoginForm actionLogin={actionLogin} />
    );
  }
};

export default Login;
