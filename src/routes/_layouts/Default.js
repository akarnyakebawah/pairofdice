import React from "react";
import styled from "styled-components";

// Components
import Navbar from "components/Navbar";
import Footer from "components/Footer";

const Container = styled.div`
  background: ${props => props.theme.linearGradient.main};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  font-family: ${props => props.theme.font.Apercu};
  min-height: 100vh;
  width: 100%;
  ${props =>
    props.hideOverflow &&
    `
    max-height: 100vh;
    overflow-y: hidden;
  `};
`;

class Default extends React.Component {
  render() {
    return (
      <Container>
        <Navbar />
        {this.props.children}
        <Footer />
      </Container>
    );
  }
}

export default Default;
