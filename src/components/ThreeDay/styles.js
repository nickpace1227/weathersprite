import styled from "styled-components";

export const Wrapper = styled.div`
  @media (min-width: 1200px) {
    height: 100vh;

    .forecast-selection {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }

    .forecast-days {
      display: flex;
    }

    .forecast-card {
      display: flex;
      flex-direction: column;
      border: solid 5px black;
      border-radius: 10px;
      padding: 20px;
      margin: 20px;
    }

    .forecast-header {
      align-text: center;
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
  }

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;

    .forecast-selection {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }

    .forecast-card {
      display: flex;
      flex-direction: column;
      border: solid 5px black;
      border-radius: 10px;
      padding: 20px;
      margin: 20px;
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
  }
`;
