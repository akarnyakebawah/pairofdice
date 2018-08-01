import React, { Component } from "react";
import styled from "styled-components";

import { ButtonLink } from "components/Button";
import { CREATE_CAMPAIGN_ROUTE } from "routes/constants";

const title = "Start a photo campaign!";
const subtitle =
  "Twiggsy is a simple tool that let you share a personalized photo frame for your events.";
const buttonText = "START CAMPAIGN";

class Landing extends Component {
  state = { sesuatu: "wow" };

  render() {
    return (
      <Container>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <UnflexButton primary to={CREATE_CAMPAIGN_ROUTE}>
          <span>{buttonText}</span>
        </UnflexButton>
      </Container>
    );
  }
}

const margin = "2rem";
const mobileMargin = "1rem";

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
  text-align: left;
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
  text-align: left;
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
  align-self: start;
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
