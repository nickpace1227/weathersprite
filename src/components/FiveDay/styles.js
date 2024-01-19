import styled from "styled-components";

export const Wrapper = styled.div`
  @media (min-width: 1200px) {
    height: auto;

    .forecast-selection {
      margin-top: 20px;
      border: solid 5px black;
      padding: 10px;
      border-radius: 10px;
      background-color: grey;
    }

    .forecast-length {
      display: flex;
      justify-content: center;
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
      background-color: grey;
    }

    .forecast-header {
      text-align: center;
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

    .blank-search {
      text-align: center;
      padding: 20px;
      margin: 20px;
      border-radius: 15px;
      background-color: grey;
    }
  }

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;

    .forecast-selection {
      margin-top: 20px;
      border: solid 5px black;
      padding: 10px;
      border-radius: 10px;
      background-color: grey;
    }

    .forecast-length {
      display: flex;
      justify-content: center;
    }

    .forecast-card {
      display: flex;
      flex-direction: column;
      border: solid 5px black;
      border-radius: 10px;
      padding: 20px;
      margin: 20px;
      background-color: grey;
    }

    .forecast-header {
      text-align: center;
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

    .blank-search {
      text-align: center;
      padding: 20px;
      margin: 20px;
      border-radius: 15px;
      background-color: grey;
    }
  }
`;
