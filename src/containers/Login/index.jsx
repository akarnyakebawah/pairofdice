import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

// Redux
import { login } from '../../redux/modules/auth';

// Components
import { Button } from '../../components/Button';
import { CREATE_CAMPAIGN_ROUTE } from '../../constants/routes';

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
      <Container>
        <FormTitle>Email</FormTitle>
        <form>
          <Form
            name="email"
            onChange={e => this.onChangeState(e)}
            placeholder="Email"
            type="email"
            value={email}
          />
          <FormTitle>Password</FormTitle>
          <Form
            name="password"
            onChange={e => this.onChangeState(e)}
            placeholder="Password"
            type="password"
            value={password}
          />
          <Button onClick={e => this.login(e)} disabled={loading}>
            {!loading && <span>Login</span>}
            {loading && <span>Loading...</span>}
          </Button>
        </form>
      </Container>
    );
  }
}

const Container = styled.div`
  align-self: center;
  width: 80%;
  color: ${props => props.theme.color.white};
`;

const Input = styled.input`
  border: none;
  color: ${props => props.theme.color.white};
  font-size: ${props => props.theme.fontSize.medium};
  padding: 1rem;
`;

const Form = styled(Input)`
  border: none;
  border-bottom: 1px ${props => props.theme.color.white} solid;
  background-color: transparent;
  color: ${props => props.theme.color.white};
  font-size: ${props => props.theme.fontSize.medium};
  margin: 1rem 0;
  width: 100%;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.color.grayTransparent(0.5)};
  }
`;

const FormTitle = styled.div`
  font-size: ${props => props.theme.fontSize.large};
  font-weight: bolder;
  margin: 1rem 0;
`;

export default Login;
