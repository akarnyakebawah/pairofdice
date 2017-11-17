/*
  All style variables are declared here
  - Fonts are used for font-family names
  - Colors are HEX values / rgb() values
  - Linear-gradients are linear-gradient CSS string
  - Declare all font-family names into const here and export it
*/

export const SFProDisplay = 'SFProDisplay';

const breakpoint = {
  mobile: '32rem',
  tablet: '48rem',
  desktop: '60rem',
  largeDesktop: '72rem',
};

const button = {
  medium: '10rem',
  large: '20rem',
};

const color = {
  black: '#000',
  white: '#FFF',
  salmon: '#ff7676',
  mediumPink: '#f54ea2',
};

const font = {
  SFProDisplay,
};

const fontSize = {
  small: '1rem',
  medium: '1.5rem',
  large: '2rem',
  jumbo: '3.5rem',
  huge: '5rem',
};

const image = {
  logo: '5rem',
  logoMobile: '3rem',
};

const linearGradient = {
  main: `linear-gradient(305deg, ${color.salmon}, ${color.mediumPink})`,
};

const transition = {
  short: '1s',
  long: '2s',
};

const theme = {
  breakpoint,
  button,
  color,
  font,
  fontSize,
  image,
  linearGradient,
  transition,
};

export default theme;
