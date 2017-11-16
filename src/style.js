import { injectGlobal } from 'styled-components';
import { SFProDisplay } from './constants/theme';
import SFProDisplayFontUrl from '../static/fonts/SanFranciscoDisplay-Regular.otf';
/* eslint-disable no-unused-expressions */
injectGlobal`
  html {
    font-size: 16px; // 1rem = 16px
  }
  body {
    margin: 0;
  }
  @font-face {
    font-family: ${SFProDisplay};
    src: url(${SFProDisplayFontUrl}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;
/* eslint-enable */
