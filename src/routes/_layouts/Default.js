import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

const Container = styled.div`
  background: ${props => props.theme.linearGradient.main};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  font-family: ${props => props.theme.font.Apercu};
  min-height: 100vh;
  width: 100%;
  ${props =>
    props.hideOverflow &&
    `
    max-height: 100vh;
    overflow-y: hidden;
  `};
`;

const LoadingContainer = styled.div`
  background: ${props => props.theme.linearGradient.main};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  font-family: ${props => props.theme.font.Apercu};
  min-height: 100vh;
  width: 100%;
  .hide-overflow {
    height: 100vh;
    overflow-y: hidden;
  }
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
  margin-bottom: 2rem;
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

class Default extends React.Component {
  render() {
    return (
      <Container>
        <Navbar>
          <Logo />
          {token &&
            this.props.history.location.pathname !== routes.BASE_ROUTE && (
              <LogoutButton onClick={() => this.props.logout()}>
                <span>Logout</span>
              </LogoutButton>
            )}
        </Navbar>
        {this.props.children}
        {!isLoading &&
          token &&
          this.props.location.pathname !== routes.BASE_ROUTE && (
            <MobileLogoutButton
              onClick={() => this.props.logout()}
              disabled={isLoading}
            >
              <span>Logout</span>
            </MobileLogoutButton>
          )}
        <Footer />
      </Container>
    );
  }
}

export default withRouter(connect(state, { logout, reloadAuth })(App));
