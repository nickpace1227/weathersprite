import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  .weather-day {
    margin: 10px;
  }

  .forecast-card {
    display: flex;
    flex-direction: column;
    border: solid 5px black;
    border-radius: 10px;
    padding: 20px;
    margin-top: 50px;
  }

  .forecast-header {
    font-size: 20px;
    font-weight: bold;
    text-decoration: underline;
  }

  .forecast-value {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px;
  }
`;
