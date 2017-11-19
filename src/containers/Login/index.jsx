import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Redux
import { login } from '../../redux/modules/auth';

// Components
import { Button } from '../../components/Button';
import LoadingButtonIndicator from '../../components/LoadingButtonIndicator';

import { CREATE_CAMPAIGN_ROUTE, REGISTER_ROUTE } from '../../constants/routes';

@connect(
  state => ({
    auth: state.auth,
  }),
  { login },
)
class Login extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
    }).isRequired,
    login: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    password: ''
  };

  onChangeState(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async login(event) {
    event.preventDefault();
    const { email, password } = this.state;
    await this.props.login({ email, password });
    if (!!this.props.auth.token) {
      this.props.history.push(CREATE_CAMPAIGN_ROUTE);
    }
  }

  render() {
    const { email, password } = this.state;
    const { loading, error } = this.props.auth;
    return (
      <Form>
        <FormTitle>Email</FormTitle>
        <Input
          name="email"
          onChange={e => this.onChangeState(e)}
          placeholder="Email"
          type="email"
          value={email}
        />
        <FormTitle>Password</FormTitle>
        <Input
          name="password"
          onChange={e => this.onChangeState(e)}
          placeholder="Password"
          type="password"
          value={password}
        />
        {error && error.status === 400 && <ErrorHelper>Unable to login with provided credentials</ErrorHelper>}
        <LoginButton onClick={e => this.login(e)} disabled={loading} style={{display: "flex"}}>
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

const margin = '1rem';

const LoginButton = styled(Button)`
  margin-top: 1rem;
`;

const Input = styled.input`
  border: none;
  color: ${props => props.theme.color.white};
  font-size: ${props => props.theme.fontSize.medium};
  padding: 1rem;
  border: none;
  border-bottom: 1px ${props => props.theme.color.white} solid;
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
    font-size: ${props => props.theme.fontSize.small};
    padding: 0.5rem;
    margin: 0.5rem 0;
  }
`;

const Form = styled.form`
  align-self: center;
  width: 80%;
  max-width: 30rem;
  color: ${props => props.theme.color.white};
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const FormTitle = styled.div`
  font-size: ${props => props.theme.fontSize.large};
  font-weight: bolder;
  margin: 1rem 0;
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    font-size: ${props => props.theme.fontSize.medium};
  }
`;

const RedirectToRegister = styled.div`
  margin-top: 1rem;
  a {
    font-weight: bold;
    color: ${props => props.theme.color.white};
  }
`;

export default Login;
