import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Redux
import { clearError, login } from "modules/auth";

// Components
import { Button } from "components/Button";
import LoadingButtonIndicator from "components/LoadingButtonIndicator";

import { BASE_ROUTE, CREATE_CAMPAIGN_ROUTE, REGISTER_ROUTE } from "routes/constants";

class Login extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      token: PropTypes.string.isRequired
    }).isRequired,
    history: PropTypes.shape({
      replace: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired
    }).isRequired,

    clearError: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired
  };

  state = {
    email: "",
    password: ""
  };

  componentDidMount() {
    if (this.props.auth.token) {
      this.props.history.replace(BASE_ROUTE);
      this.props.clearError();
    }
  }

  onChangeState(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async login(event) {
    event.preventDefault();
    const { username, password } = this.state;
    await this.props.login({ username, password });
    // eslint-disable-next-line
    if (!!this.props.auth.token) {
      this.props.history.push(CREATE_CAMPAIGN_ROUTE);
      this.props.clearError();
    }
  }

  render() {
    const { username, password } = this.state;
    const { loading, error } = this.props.auth;
    return (
      <Form>
        <Input
          name="username"
          onChange={e => this.onChangeState(e)}
          placeholder="Username / Email"
          value={username}
        />
        <Input
          name="password"
          onChange={e => this.onChangeState(e)}
          placeholder="Password"
          type="password"
          value={password}
        />
        {error &&
          error.status === 400 && (
            <ErrorHelper>Unable to login with provided credentials</ErrorHelper>
          )}
        <LoginButton onClick={e => this.login(e)} disabled={loading} style={{ display: "flex" }}>
          {!loading && <span>Login</span>}
          {loading && <LoadingButtonIndicator />}
        </LoginButton>
        <RedirectToRegister>
          Doesn't have account yet? <Link to={REGISTER_ROUTE}>Register</Link>
        </RedirectToRegister>
      </Form>
    );
  }
}

const ErrorHelper = styled.div`
  color: ${props => props.theme.color.white};
  // font-style: italic;
  font-weight: bold;
  font-size: ${props => props.theme.fontSize.medium};
  text-decoration: underline;
`;

const LoginButton = styled(Button)`
  self-align: center;
  width: 30%;
  margin-top: 1rem;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  color: ${props => props.theme.color.white};
  font-size: ${props => props.theme.fontSize.medium};
  padding: 1rem 0rem 0.5rem 0rem;
  border: none;
  border-bottom: 3px rgba(255, 255, 255, 0.75) solid;
  background-color: transparent;
  color: ${props => props.theme.color.white};
  font-size: ${props => props.theme.fontSize.medium};
  margin: 1rem 0;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.color.grayTransparent(0.5)};
  }

  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    font-size: ${props => props.theme.fontSize.medium};
  }
`;

const Form = styled.form`
  min-width: 15rem;
  max-width: 40rem;
  align-self: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.color.white};
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
  }
`;

const RedirectToRegister = styled.div`
  margin-top: 1rem;
  a {
    font-weight: bold;
    color: ${props => props.theme.color.white};
  }
`;

export default connect(
  state => ({
    auth: state.auth
  }),
  { clearError, login }
)(Login);
