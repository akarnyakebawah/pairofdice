import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as routes from "../routes/constants";

import { logout } from "modules/authentication";

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

const FooterContainer = styled.div`
  width: 100%;
  background: transparent;
`;

class Footer extends React.Component {
  render() {
    const { token } = this.props.auth;
    const { pathname } = this.props.location;
    return (
      <FooterContainer>
        {token &&
          pathname !== routes.BASE_ROUTE && (
            <MobileLogoutButton onClick={() => this.props.logout()}>
              <span>Logout</span>
            </MobileLogoutButton>
          )}
      </FooterContainer>
    );
  }
}

export default withRouter(connect(state => state, { logout })(Footer));
