import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, ButtonLink } from '../../components/Button';

class Campaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: '',
    }
  }
  render() {
    const { campaign } = this.props.campaign;

    return (
      <Container>
        <Title>{campaign.name}</Title>
        {/* <h1>{campaign.name} {mediaUrl}</h1> */}
        <Button primary><span>Upload Image</span></Button>
      </Container>
    )
  }
}

export default Campaign;

const Container = styled.div`
  display: flex;
  /* align-items: center; */
  flex-directon: column;
  align-self: center;
`;

const Title = styled.h1`
  color: ${props => props.theme.color.white};
  font-size: ${props => props.theme.fontSize.superHuge};

  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    font-size: ${props => props.theme.fontSize.jumbo};
  }
`;