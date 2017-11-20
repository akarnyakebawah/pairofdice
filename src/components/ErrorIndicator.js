import styled from 'styled-components';

const ErrorIndicator = styled.div`
  font-weight: bold;
  font-size: ${props => props.theme.fontSize.medium};
  color: ${props => props.theme.color.white};
  font-style: italic;
`;

export default ErrorIndicator;
