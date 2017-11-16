/*
  All style variables are declared here
  - Fonts are used for font-family names
  - Colors are HEX values / rgb() values
  - Linear-gradients are linear-gradient CSS string
*/

const color = {
  black: '#000',
  white: '#FFF',
  salmon: '#ff7676',
  mediumPink: '#f54ea2',
};

const font = {

};

const linearGradient = {
  main: `linear-gradient(305deg, ${color.salmon}, ${color.mediumPink}`,
};

const theme = {
  color,
  font,
  linearGradient,
};

export default theme;
