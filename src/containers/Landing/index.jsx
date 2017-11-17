import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-109827623-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const title = 'Build a better campaign.';
const subtitle = `When your event, your causes, or your friend's birthday needs to kick off a cool-ass campaign, Twiggsy is here to save your day.`;

class Home extends Component {
  state = { sesuatu: 'wow' }

  render() {
    return (
      <Container>
        <Title>
          {title}
        </Title>
        <Subtitle>
          {subtitle}
        </Subtitle>
      </Container>
    );
  }
}

const Container = styled.div`
  background: ${props => props.theme.linearGradient.main};
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: ${props => props.theme.font.SFProDisplay};
  height: 100vh;
  width: 100%;
`;

const Title = styled.div`
  color: ${props => props.theme.color.white};
  font-size: ${props => props.theme.fontSize.large};
  font-weight: bold;
`;

const Subtitle = styled.div`
  color: ${props => props.theme.color.white};
  font-size: ${props => props.theme.fontSize.medium};
`;

export default Home;
