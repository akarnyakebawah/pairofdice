import { injectGlobal } from "styled-components";

import { Apercu } from "./commons/theme";
// import { ApercuLight } from "./commons/theme";
// import { SFProDisplay } from "./commons/theme";

import ApercuFontUrl from "./assets/fonts/Apercu_Regular.otf";
// import ApercuLightFontUrl from "./assets/fonts/Apercu_Light.otf";
// import SFProDisplayFontUrl from "./assets/fonts/SanFranciscoDisplay-Regular.otf";

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
