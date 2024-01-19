import styled from "styled-components";
import LemonRegular from "../../Assets/Fonts/LemonRegular.ttf";
import CabinRegular from "../../Assets/Fonts/CabinRegular.ttf";
import WeatherSpoutBackground from "../../Assets/Images/WeatherSpoutBackground.jpg";

export const GlobalStyles = styled.div`
  background-image: url(${WeatherSpoutBackground});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  min-height: 100vh;

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
