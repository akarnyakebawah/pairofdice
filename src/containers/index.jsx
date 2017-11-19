import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import ReactGA from 'react-ga';
import styled from 'styled-components';

// Redux
import { reload as reloadAuth, logout } from '../redux/modules/auth';

// Routes
import * as routes from '../constants/routes';

// Components
import { Button } from '../components/Button';
import LoadingIndicator from '../components/LoadingIndicator';
import Logo from '../components/Logo';

// Containers
import CreateCampaign from './CreateCampaign';
import Landing from './Landing';
import Login from './Login';
import Register from './Register';
import ShareCampaign from './ShareCampaign';

@withRouter
@connect(state => ({ ...state }), { logout, reloadAuth })
class Home extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      loaded: PropTypes.bool.isRequired,
      loading: PropTypes.bool.isRequired,
      token: PropTypes.string.isRequired,
    }).isRequired,
    // eslint-disable-next-line
    history: PropTypes.object.isRequired,
    reloadAuth: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };

  static AUTHENTICATED_ROUTE = [
    {
      component: CreateCampaign,
      exact: true,
      path: routes.CREATE_CAMPAIGN_ROUTE,
    },
    {
      component: ShareCampaign,
      exact: true,
      path: routes.SHARE_CAMPAIGN_ROUTE,
    },
  ];

  async componentDidMount() {
    await this.props.reloadAuth();
    ReactGA.initialize('UA-109827623-1');
    ReactGA.pageview(window.location.href);
  }

  // eslint-disable-next-line
  checkAuthorization(Component) {
    const { token } = this.props.auth;
    if (!token) {
      return <Redirect to={routes.LOGIN_ROUTE} />;
    }
    return <Component />;
  }

  render() {
    const { loaded, token } = this.props.auth;
    if (!loaded) {
      return (
        <Container>
          <LoadingIndicator />
        </Container>
      );
    }
    return (
      <Container>
        <Navbar>
          <Logo />
          <Switch>
            {Home.AUTHENTICATED_ROUTE.map(route => token && (
              <Route
                exact={route.exact}
                path={route.path}
                key={route.path}
                component={() => (
                  <LogoutButton onClick={() => this.props.logout()}>
                    <span>Logout</span>
                  </LogoutButton>)}
              />)
            )}
          </Switch>
        </Navbar>
        <Switch>
          <Route exact path={routes.BASE_ROUTE} component={Landing} />
          <Route path={routes.LOGIN_ROUTE} component={Login} />
          <Route path={routes.REGISTER_ROUTE} component={Register} />
          {!token && <Redirect to={routes.LOGIN_ROUTE} />}
          {Home.AUTHENTICATED_ROUTE.map(route => token && <Route {...route} key={route.path} component={route.component} />)}
        </Switch>
        <Switch>
          {Home.AUTHENTICATED_ROUTE.map(route => token && (
            <Route
              path={route.path}
              exact={route.exact}
              key={route.path}
              component={() => (
                <MobileLogoutButton onClick={() => this.props.logout()}>
                  <span>Logout</span>
                </MobileLogoutButton>)}
            />)
          )}
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

const LogoutButton = styled.button`
  text-decoration: underline;
  color: white;
  border: none;
  cursor: pointer;
  font-size: ${props => props.theme.fontSize.small};
  margin-right: 3rem;
  font-size: ${props => props.theme.fontSize.medium};
  border: none;
  background: transparent;
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    display: none;
  }
`;

const MobileLogoutButton = styled(LogoutButton)`
  display: none;
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    display: block;
  }
  margin: auto;
  font-size: ${props => props.theme.fontSize.small};
`;

const Navbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const Footer = styled.div`
  width: 100%;
  background: black;
`;

export default Home;
