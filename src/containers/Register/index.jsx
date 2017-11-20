import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Constants
import { LOGIN_ROUTE, CREATE_CAMPAIGN_ROUTE } from '../../constants/routes';

// Redux
import { register } from '../../redux/modules/auth';

// Components
import { Button } from '../../components/Button';
import LoadingButtonIndicator from '../../components/LoadingButtonIndicator';
import * as routes from '../../constants/routes';

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
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    register: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    birthDate: null,
    email: '',
    password: '',
  };
  componentDidMount() {
    if (this.props.auth.token) {
      this.props.history.replace(routes.BASE_ROUTE);
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
    const { name, birthDate, email, password } = this.state;
    const { loading, error } = this.props.auth;
    return (
      <Form>
        <Input
          name="name"
          onChange={e => this.onChangeState(e)}
          placeholder="Name"
          value={name}
        />
        <Input
          name="birthDate"
          onChange={e => this.onChangeState(e)}
          placeholder="Birthdate"
          type="date"
          value={birthDate}
        />
        <Input
          name="email"
          onChange={e => this.onChangeState(e)}
          placeholder="Email"
          type="email"
          value={email}
        />
        <Input
          name="password"
          onChange={e => this.onChangeState(e)}
          placeholder="Password"
          type="password"
          value={password}
        />
        {error && error.status === 400 && <div>Error</div>}
        <RegisterButton
          onClick={e => this.register(e)}
          disabled={loading}
          style={{ display: 'flex' }}
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

const margin = '1rem';

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
  border-bottom: 3px rgba(255,255,255,0.75) solid;
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
