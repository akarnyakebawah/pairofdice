import React, { Component } from 'react';

class LoginForm extends Component {

  state = {
    username: '',
    password: '',
  }

  render() {
    const { username, password } = this.state;
    const { actionLogin } = this.props;

    return (
      <div>
        <input
          type="text"
          value={username}
          onChange={evt => this.setState({username: evt.target.value})}
        />
        <input
          type="password"
          value={password}
          onChange={evt => this.setState({password: evt.target.value})}
        />
        <input
          type="submit"
          onClick={() => actionLogin(username, password)}
        />
      </div>
    );
  }
}

export default LoginForm;