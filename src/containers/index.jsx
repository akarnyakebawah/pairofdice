import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// eslint-disable-next-line react/jsx-filename-extension
class Home extends Component {
  render() {
    return (
      <Container>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100%;
  background: ${props => props.theme.linearGradient.main};
`;

export default Home;
