import React, { Component } from 'react';
import styled from 'styled-components';

import { ButtonLink } from '../../components/Button';
import { CREATE_CAMPAIGN_ROUTE } from '../../constants/routes';

const title = 'Build a better campaign.';
const subtitle = 'Easily share your campaign filter with friends and family.';
const buttonText = 'CREATE CAMPAIGN';

class Landing extends Component {
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
        {/* <UnflexButton primary to={CREATE_CAMPAIGN_ROUTE}>
          <span>{buttonText}</span>
        </UnflexButton> */}
      </Container>
    );
  }
}

const margin = '2rem';
const mobileMargin = '1rem';

const Container = styled.div`
  align-self: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.color.white};
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    width: 100%;
  }
  width: 80%;
  margin: ${margin};
`;

const Title = styled.div`
  color: ${props => props.theme.color.white};
  font-size: ${props => props.theme.fontSize.huge};
  font-weight: bolder;
  margin: 0 ${margin};
  width: 100%;
  text-align: center;
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
  font-size: ${props => props.theme.fontSize.jumbo};
  text-align: center;
  line-height: 1;
  margin: ${margin};
  width: 100%;
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    margin: ${mobileMargin};
    font-size: ${props => props.theme.fontSize.large};
    width: auto;
  }
  @media screen and (min-width: ${props => props.theme.breakpoint.largeDesktop}) {
    font-size: ${props => props.theme.fontSize.jumbo};
  }
`;

const UnflexButton = styled(ButtonLink)`
  align-self: center;
  display: flex;
  width: 20rem;
  > * {
    font-size: ${props => props.theme.fontSize.medium};
    font-weight: 900px;
  }
  @media screen and (max-width: ${props => props.theme.breakpoint.mobile}) {
    > * {
      font-size: ${props => props.theme.fontSize.medium};
    }
    margin: 0 ${mobileMargin};
    width: 50%;
  }
`;

export default Landing;
