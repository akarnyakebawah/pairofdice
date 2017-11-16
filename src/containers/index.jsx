import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

class Home extends Component {
  state = { sesuatu: 'wow' };

  render() {
    return (
      <Container>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Container>
    );
  }
}

export default Home;
