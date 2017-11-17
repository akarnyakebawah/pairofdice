import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { BASE_ROUTE } from '../constants/routes.js';
import twiggsyLogoUrl from '../../static/assets/logo-white.png';

const Image = styled.img`
  position: absolute;
  margin: 2rem;
  object-fit: scale-down;
  width: ${props => props.theme.image.logo};
  top: 0;
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    margin: auto;
    margin-top: 1rem;
    margin-left: 2rem;
    width: ${props => props.theme.image.logoMobile};
  }
`;

const Logo = () => (
  <Link to={BASE_ROUTE}>
    <Image src={twiggsyLogoUrl} alt="twiggsy-logo" />
  </Link>
);

export default Logo;