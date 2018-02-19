import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { BASE_ROUTE } from "../constants/routes.js";
import twiggsyLogoUrl from "../../static/assets/logo-white.png";

const Image = styled.img`
  margin: 2rem;
  object-fit: scale-down;
  width: ${props => props.theme.image.logo};
  top: 0;
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    margin: 1rem;
    width: ${props => props.theme.image.logoMobile};
  }
`;

const Logo = props => (
  <Link to={BASE_ROUTE} {...props}>
    <Image src={twiggsyLogoUrl} alt="twiggsy-logo" />
  </Link>
);

export default Logo;
