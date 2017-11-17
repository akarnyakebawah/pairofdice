import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Form from './Form';
import Landing from './Landing';
import Login from './Login';
import ReactGA from 'react-ga';
import { loadAuthorizationToken } from '../api';
import * as routes from '../constants/routes';
import Logo from '../components/Logo';

class Home extends Component {
  componentDidMount() {
    loadAuthorizationToken();
    ReactGA.initialize('UA-109827623-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    return (
      <Container>
        <Logo />
        <Switch>
          <Route exact path={routes.BASE_ROUTE} component={Landing} />
          <Route path={routes.LOGIN_ROUTE} component={Login} />
          <Route path={routes.FORM_ROUTE} component={Form} />
        </Switch>
        <Footer />
      </Container>
    );
  }
}

const Container = styled.div`
  background: ${props => props.theme.linearGradient.main};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  font-family: ${props => props.theme.font.SFProDisplay};
  min-height: 100vh;
  width: 100%;
`;

const Footer = styled.div`
  width: 100%;
  background: black;
`;

export default Home;
