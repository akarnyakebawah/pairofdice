import React from 'react';
import styled, { css } from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const ButtonCss = css`
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  background: ${props => props.theme.color.white};
  border-radius: 3rem;
  border: 2px ${props => props.theme.color.white} solid;
  box-shadow: 0 2px 9px 0 rgba(54, 54, 54, 0.6);
  color: ${props => props.theme.color.white};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 10rem;
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  // transition: 1s;
  text-align: center;
  text-decoration: none;
  position: relative;
  ${props => props.secondary && 'background: transparent;'}
  ${props => props.caps && 'text-transform: uppercase;'};
  > * {
    font-size: ${props => props.theme.fontSize.small};
    font-weight: 900;
    background: ${props => props.theme.linearGradient.main};
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    // transition: 2s;
  }
  &:hover,
  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    font-size: ${props => props.theme.fontSize.small};
  }
  @media screen and (max-width: 100px) {
    min-width: auto;
    max-width: 80%;
  }
`;

export const Button = styled.button`
  ${ButtonCss}
`;

export const ButtonLink = styled(({ primary, caps, bold, gray, ...rest }) => (
  <RouterLink {...rest} />
))`
  ${ButtonCss}
`;

export default Button;
