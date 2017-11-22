/*
  All style variables are declared here
  - Fonts are used for font-family names
  - Colors are HEX values / rgb() values
  - Linear-gradients are linear-gradient CSS string
  - Declare all font-family names into const here and export it
*/

export const Apercu = 'Apercu';
export const ApercuLight = 'ApercuLight';
export const SFProDisplay = 'SFProDisplay';

const breakpoint = {
  mobile: '32rem',
  tablet: '48rem',
  desktop: '60rem',
  largeDesktop: '72rem',
};

const button = {
  medium: '5rem',
  large: '10rem',
};

const color = {
  black: '#000',
  gray: '#F0F0F0',
  grayTransparent: opacity => `rgba(240, 240, 240, ${opacity})`,
  mediumPink: '#F54EA2',
  red: 'red',
  salmon: '#FF7676',
  white: '#FFF',
};

const font = {
  Apercu,
};

const fontSize = {
  small: '0.75rem',
  medium: '1rem',
  large: '1.5rem',
  jumbo: '2rem',
  huge: '5rem',
  superHuge: '8rem',
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
