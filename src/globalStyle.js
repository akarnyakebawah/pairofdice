import { injectGlobal } from "styled-components";

import { Apercu } from "./_constants/theme";
import { ApercuLight } from "./_constants/theme";
import { SFProDisplay } from "./_constants/theme";

import ApercuFontUrl from "./assets/fonts/Apercu_Regular.otf";
import ApercuLightFontUrl from "./assets/fonts/Apercu_Light.otf";
import SFProDisplayFontUrl from "./assets/fonts/SanFranciscoDisplay-Regular.otf";

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
