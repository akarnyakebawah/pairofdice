/*
  All style variables are declared here
  - Fonts are used for font-family names
  - Colors are HEX values / rgb() values
  - Linear-gradients are linear-gradient CSS string
  - Declare all font-family names into const here and export it
*/

export const SFProDisplay = 'SFProDisplay';

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
};

const linearGradient = {
  main: `linear-gradient(305deg, ${color.salmon}, ${color.mediumPink})`,
};

const theme = {
  color,
  font,
  fontSize,
  linearGradient,
};

export default theme;
