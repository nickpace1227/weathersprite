import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .input {
    margin: 2px;
    border-radius: 10px;
    padding: 5px;
  }
  .invalid {
    border: 4px solid red;
  }
  .error-div {
    margin: 20px;
    width: 200px;
    padding: 10px;
    border-radius: 10px;
    border: 4px solid black;
    background-color: grey;
  }
  .forecast {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .forecast-title {
    text-align: center;
    text-decoration: underline;
    margin: 5px;
  }
  .forecast-value {
    margin: 2px;
    text-align: center;
  }
  .forecast-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px;
    border: 4px solid black;
    padding: 10px;
    border-radius: 10px;
  }

  @media (min-width: 1200px) {
    .search {
      display: flex;
      justify-content: center;
    }
    .current-forecast {
      margin: 20px;
      padding: 10px;
      border-radius: 10px;
      border: 4px solid black;
      background-color: grey;
      width: 200px;
    }
    .twelve-hour-forecast {
      margin: 20px;
      padding: 10px;
      border-radius: 10px;
      border: 4px solid black;
      background-color: grey;
      width: 475px;
    }
    .forecast-container {
      display: flex;
      justify-content: center;
    }
    .five-day-forecast {
      margin: 20px;
      padding: 10px;
      border-radius: 10px;
      border: 4px solid black;
      background-color: grey;
    }
    .landing-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 25px;
      border: 4px solid black;
      padding: 10px;
      border-radius: 10px;
      background-color: grey;
    }
  }

  @media (max-width: 1200px) {
    .search {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .current-forecast {
      margin: 20px;
      padding: 10px;
      border-radius: 10px;
      border: 4px solid black;
      background-color: grey;
      width: 200px;
    }
    .twelve-hour-forecast {
      margin: 20px;
      padding: 10px;
      border-radius: 10px;
      border: 4px solid black;
      background-color: grey;
      width: 200px;
    }
    .forecast-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .five-day-forecast {
      margin: 20px;
      padding: 10px;
      border-radius: 10px;
      border: 4px solid black;
      background-color: grey;
      width: 200px;
    }
    .landing-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 25px;
      border: 4px solid black;
      padding: 10px;
      border-radius: 10px;
      background-color: grey;
      width: 200px;
    }
  }
`;
