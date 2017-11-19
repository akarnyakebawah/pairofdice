import React from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import PropTypes from 'prop-types';

import theme from '../constants/theme';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    margin-right: 1rem;
  }
`;

export default function LoadingButtonComponent({ children, ...props }) {
  return (
    <Container {...props}>
      <Spinner name="circle" fadeIn="none" color={theme.color.mediumPink} />
      {children}
    </Container>
  );
}

LoadingButtonComponent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string
};

LoadingButtonComponent.defaultProps = {
  className: null,
  children: 'Loading...'
};
