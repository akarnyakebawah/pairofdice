import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Logo from '../../components/Logo';
import Button from '../../components/Button';

const title = 'Build a better campaign.';
const subtitle = "When your event, your causes, or your friend's birthday needs to kick off a cool-ass campaign, Twiggsy is here to save your day.";
const button = 'Create Campaign.';

class Landing extends Component {
  state = { sesuatu: 'wow' }

  render() {
    return (
      <Container>
        <Logo />
        <Title>
          {title}
        </Title>
        <Subtitle>
          {subtitle}
        </Subtitle>
        <UnflexButton primary>
          <p>{button}</p>
        </UnflexButton>
      </Container>
    );
  }
}

const margin = '2rem';
const mobileMargin = '1rem';

const Container = styled.div`
  background: ${props => props.theme.linearGradient.main};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  font-family: ${props => props.theme.font.SFProDisplay};
  min-height: 100vh;
  width: 100%;
`;

const Title = styled.div`
  color: ${props => props.theme.color.white};
  font-size: ${props => props.theme.fontSize.huge};
  font-weight: bolder;
  margin: 0 ${margin};
  width: 50%;
  line-height: 1;
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    font-size: ${props => props.theme.fontSize.jumbo};
    margin: 0 ${mobileMargin};
    width: auto;
  }
  @media screen and (min-width: ${props => props.theme.breakpoint.largeDesktop}) {
    font-size: ${props => props.theme.fontSize.huge};
  }
`;

const Subtitle = styled.div`
  color: ${props => props.theme.color.white};
  font-size: ${props => props.theme.fontSize.large};
  line-height: 1;
  margin: ${margin};
  width: 60%;
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    margin: ${mobileMargin};
    font-size: ${props => props.theme.fontSize.medium};
    width: auto;
  }
  @media screen and (min-width: ${props => props.theme.breakpoint.largeDesktop}) {
    font-size: ${props => props.theme.fontSize.large};
  }
`;

const UnflexButton = styled(Button)`
  margin-left: ${margin};
  font-size: ${props => props.theme.fontSize.medium};
  width: 20rem;
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    margin: 0 ${mobileMargin};
    font-size: ${props => props.theme.fontSize.small};
    width: auto;
  }
`;

export default Landing;
