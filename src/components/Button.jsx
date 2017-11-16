import React from 'react';
import styled, { css } from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

const Button = styled.button`
  cursor: pointer;
  letter-spacing: 0.7px;
  color: ${props => props.primary || props.outline ? props.theme.white : props.theme.orange};
  border: 2px
    ${props => (props.outline ? props.theme.white : props.theme.orange)} solid;
  background: ${props =>
    props.primary ? props.theme.orange : props.theme.white};
  padding: 0.5rem 3rem;
  border-radius: 3rem;
  text-decoration: none;
  ${props => props.outline && 'background: transparent;'};
  ${props => props.caps && 'text-transform: uppercase;'};

  &:hover,
  &:focus {
    background: ${props => props.theme.orange};
    color: ${props => props.theme.white};
  }

  &:disabled {
    cursor: not-allowed;
    border-color: ${props => props.theme.disabled};
    background: ${props => props.theme.disabled};
  }
`;

export const Link = styled(({ primary, caps, bold, gray, ...rest }) => (
  <RouterLink {...rest} />
))`
  ${props => props.size && `font-size: ${props.size};`} letter-spacing: 0.05rem;
  color: ${props => (props.primary ? props.theme.white : props.theme.orange)};
  border: 0.2rem ${props => props.theme.orange} solid;
  background: ${props =>
    props.primary ? props.theme.orange : props.theme.white};
  ${props => props.bold && 'font-weight: 700;'} padding: .5rem 2rem;
  border-radius: 3rem;
  text-decoration: none;
  ${props => props.caps && 'text-transform: uppercase;'} &:hover, &:focus {
    background: ${props => props.theme.orange};
    color: ${props => props.theme.white};
  }

  ${props =>
    props.gray &&
    `
    color: ${props.theme.lightGray};
    border-color: ${props.theme.lightGray};

    &:hover {
      background: ${props.theme.lightGray};
    }
  `};

  &:disabled {
    cursor: not-allowed;
    border-color: ${props => props.theme.disabled};
    background: ${props => props.theme.disabled};
  }
`;

export const Stepper = styled.button`
  cursor: pointer;
  background: ${props => (props.active ? props.theme.orange : 'transparent')};
  border: 0.125rem solid ${props => props.theme.orange};
  padding: 0.5rem;
  border-radius: 50%;
  color: ${props => (props.active ? props.theme.white : props.theme.orange)};
  font-size: 2rem;
  line-height: 1.5rem;
  font-family: Cabin, sans-serif;
  width: 3rem;
  height: 3rem;
  margin-bottom: 0.5rem;
  margin-right: 1.5rem;

  &:hover {
    background: ${props => props.theme.orange};
    color: ${props => props.theme.white};
  }

  @media screen and (max-width: 48rem) {
    font-size: 1.25rem;
    line-height: 0.625rem;
    padding: 0.25rem;
    margin-right: 0.5rem;
  }
`;

const BlueButtonStyle = css`
  cursor: pointer;
  font-size: 16px;
  letter-spacing: 0.7px;
  font-weight: ${props => (props.bold ? 'bold' : 400)};
  color: ${props => (props.primary ? props.theme.white : props.theme.blue)};
  border: 2px ${props => props.theme.blue} solid;
  background: ${props =>
    props.primary ? props.theme.blue : props.theme.white};
  padding: 0.5rem 3rem;
  border-radius: 3rem;
  text-align: center;
  text-decoration: none;
  ${props =>
    props.shadow &&
    `box-shadow: .1rem .1rem .325rem ${props.theme.blackTransparent(
      props.shadow
    )};`} ${props => props.caps && 'text-transform: uppercase;'} &:hover,
    &:focus {
    background: ${props => props.theme.blue};
    color: ${props => props.theme.white};
    ${props =>
      props.shadow && `box-shadow: .1rem .1rem .325rem ${props.theme.blue};`};
  }

  &:disabled {
    cursor: not-allowed;
    border-color: ${props => props.theme.disabled};
    background: ${props => props.theme.disabled};
  }
`;

export const BlueButton = styled.button`${BlueButtonStyle};`;

export const BlueLink = styled(({ primary, caps, bold, shadow, ...rest }) => (
  <RouterLink {...rest} />
))`
  ${BlueButtonStyle};
`;

export default Button;
