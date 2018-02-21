import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

// Redux Modules
import { logout } from "../modules/authentication";

import * as routes from "routes/constants";

import Logo from "./Logo";

const NavbarContainer = styled.div`
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

class Navbar extends React.Component {
  render() {
    const { token } = this.props.auth;
    // const { pathname } = this.props.history && this.props.history.location;
    const pathname = "hehe";
    return (
      <NavbarContainer>
        <Logo />
        {token &&
          pathname !== routes.BASE_ROUTE && (
            <LogoutButton onClick={() => this.props.logout()}>
              <span>Logout</span>
            </LogoutButton>
          )}
      </NavbarContainer>
    );
  }
}

export default connect(state => state, { logout })(Navbar);
