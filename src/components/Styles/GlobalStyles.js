import styled from "styled-components";
import LemonRegular from "../../assets/Fonts/LemonRegular.ttf";
import CabinRegular from "../../assets/Fonts/CabinRegular.ttf";

export const GlobalStyles = styled.div`
  @font-face {
    font-family: "LemonRegular";
    src: local("LemonRegular"), url(${LemonRegular});
  }

  @font-face {
    font-family: "CabinRegular";
    src: local("CabinRegular"), url(${CabinRegular});
  }

  * {
    font-family: "CabinRegular";
  }
`;
