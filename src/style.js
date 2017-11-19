import { injectGlobal } from 'styled-components';
import { Apercu } from './constants/theme';
import ApercuFontUrl from '../static/fonts/Apercu_Regular.otf';
import { ApercuLight } from './constants/theme';
import ApercuLightFontUrl from '../static/fonts/Apercu_Light.otf';
import { SFProDisplay } from './constants/theme';
import SFProDisplayFontUrl from '../static/fonts/SanFranciscoDisplay-Regular.otf';
/* eslint-disable no-unused-expressions */
injectGlobal`
  html {
    font-size: 100%;
  }
  body {
    margin: 0;
  }
  @font-face {
    font-family: ${Apercu};
    src: url(${ApercuFontUrl}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;
/* eslint-enable */
