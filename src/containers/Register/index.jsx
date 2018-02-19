/* @flow */
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Constants
import {
  BASE_ROUTE,
  LOGIN_ROUTE,
  CREATE_CAMPAIGN_ROUTE
} from "../../constants/routes";

// Redux
import { register } from "../../redux/modules/auth";

// Components
import { Button } from "../../components/Button";
import LoadingButtonIndicator from "../../components/LoadingButtonIndicator";
import ErrorIndicator from "../../components/ErrorIndicator";

@connect(
  state => ({
    auth: state.auth
  }),
  { register }
)
class Register extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      token: PropTypes.string.isRequired,
      error: PropTypes.object.isRequired
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired
    }).isRequired,
    register: PropTypes.func.isRequired
  };

  state = {
    name: "",
    birthDate: null,
    email: "",
    password: "",
    username: ""
  };

  componentDidMount() {
    if (this.props.auth.token) {
      this.props.history.replace(BASE_ROUTE);
    }
  }
  onChangeState(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async register(event) {
    event.preventDefault();
    await this.props.register(this.state);
    if (!!this.props.auth.token) {
      this.props.history.push(CREATE_CAMPAIGN_ROUTE);
    }
  }

  render() {
    const { username, name, birthDate, email, password } = this.state;
    const { loading, error } = this.props.auth;
    let nameError = "";
    let dateError = "";
    let emailError = "";
    let passwordError = "";
    let usernameError = "";
    if (error && error.status === 400) {
      usernameError =
        error.response.body.name && error.response.body.username[0];
      nameError = error.response.body.name && error.response.body.name[0];
      dateError = error.response.body.date && error.response.body.date[0];
      emailError = error.response.body.email && error.response.body.email[0];
      passwordError =
        error.response.body.password && error.response.body.password[0];
    }
    return (
      <Form>
        <Input
          name="username"
          onChange={e => this.onChangeState(e)}
          placeholder="Username"
          value={username}
        />
        {usernameError && <ErrorIndicator>{nameError}</ErrorIndicator>}
        <Input
          name="name"
          onChange={e => this.onChangeState(e)}
          placeholder="Name"
          value={name}
        />
        {nameError && <ErrorIndicator>{nameError}</ErrorIndicator>}
        <Input
          name="birthDate"
          onChange={e => this.onChangeState(e)}
          placeholder="Birthdate"
          type="date"
          value={birthDate}
        />
        {dateError && <ErrorIndicator>{dateError}</ErrorIndicator>}
        <Input
          name="email"
          onChange={e => this.onChangeState(e)}
          placeholder="Email"
          type="email"
          value={email}
        />
        {emailError && <ErrorIndicator>{emailError}</ErrorIndicator>}
        <Input
          name="password"
          onChange={e => this.onChangeState(e)}
          placeholder="Password"
          type="password"
          value={password}
        />
        {passwordError && <ErrorIndicator>{passwordError}</ErrorIndicator>}
        <RegisterButton
          onClick={e => this.register(e)}
          disabled={loading}
          style={{ display: "flex" }}
        >
          {!loading && <span>Register</span>}
          {loading && <LoadingButtonIndicator />}
        </RegisterButton>
        <RedirectToRegister>
          Already have an account? <Link to={LOGIN_ROUTE}>Login</Link>
        </RedirectToRegister>
      </Form>
    );
  }
}

const margin = "1rem";

const RegisterButton = styled(Button)`
  self-align: center;
  width: 30%;
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

const FormTitle = styled.div`
  font-size: ${props => props.theme.fontSize.large};
  font-weight: bolder;
  margin: 1rem 0;
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    font-size: ${props => props.theme.fontSize.large};
  }
`;

const RedirectToRegister = styled.div`
  margin-top: 1rem;
  a {
    font-weight: bold;
    color: ${props => props.theme.color.white};
  }
`;

export default Register;
