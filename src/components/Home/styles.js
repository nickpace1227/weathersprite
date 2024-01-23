import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-attachment: fixed;

  .Clouds,  {
    background-image: linear-gradient(gray, white);
    min-height: 100vh;
    background-attachment: fixed;
    min-width: 100vw;
  }

  .Clear {
    background-image: linear-gradient(#03b1fc, white);
    min-height: 100vh;
    background-attachment: fixed;
    min-width: 100vw;
}

  .Rain, Thunderstorm, Drizzle, Snow {
    background-image: linear-gradient(#272a2b, white);
    min-height: 100vh;
    background-attachment: fixed;
    min-width: 100vw;
  }

  .Mist, Smoke, Haze, Dust, Fog, Sand, Dust, Ash, Squall, Tornado {
    background-image: linear-gradient(red, white);
    min-height: 100vh;
    background-attachment: fixed;
    min-width: 100vw;
  }

  .site-title {
    font-family: "LemonRegular";
    margin: 5px;
    font-size: 30px;
    text-align: center;
    text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white;
  }

  .input {
    margin: 2px;
    border-radius: 8px;
    padding: 8px;
    width: 140px;
  }

  .search-options {
    margin: 2px;
    border-raidus: 8px;
    padding: 8px;
    width: 160px;
  }

  .button {
    margin: 2px;
    border-radius: 8px;
    padding 8px;
    width: 80px;
  }

  .invalid {
    border: 4px solid red;
  }

  .error-div {
    margin: 16px;
    width: 200px;
    padding: 8px;
    border-radius: 8px;
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
    margin: 4px;
    font-weight: bold;
    font-size: 32px;
  }

  .forecast-value {
    margin: 2px;
    text-align: center;
  }

  .forecast-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 8px;
    border: 1px solid black;
    padding: 8px;
    border-radius: 8px;
  }

  .current-forecast-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 4px;
    padding: 8px;
    border-radius: 8px;
  }

  .forecast-time {
    font-size: 20px;
  }

  .forecast-day {
    font-size: 24px;
    margin: 2px;
    text-align: center;
    font-weight: bold;
    }

  .temp-and-conditions {
    display: flex;
    align-items: center;
  }

  @media (min-width: 1200px) {
    .search {
      display: flex;
      justify-content: center;
    }

    .current-forecast {
      margin: 16px;
      padding: 8px;
      border-radius: 8px;
      border: 4px solid black;
      background-color: grey;
      width: 200px;
    }

    .twelve-hour-forecast {
      margin: 16px;
      padding: 8px;
      border-radius: 8px;
      border: 4px solid black;
      background-color: grey;
      width: 475px;
    }

    .forecast-container {
      display: flex;
      justify-content: center;
    }

    .five-day-forecast {
      margin: 16px;
      padding: 8px;
      border-radius: 8px;
      border: 4px solid black;
      background-color: grey;
    }

    .landing-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 25px;
      border: 4px solid black;
      padding: 8px;
      border-radius: 8px;
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
      margin: 16px;
      padding: 8px;
      border-radius: 8px;
      border: 4px solid black;
      background-color: grey;
      width: 200px;
    }

    .twelve-hour-forecast {
      margin: 16px;
      padding: 8px;
      border-radius: 8px;
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
      margin: 16px;
      padding: 8px;
      border-radius: 8px;
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
      padding: 8px;
      border-radius: 8px;
      background-color: grey;
      width: 200px;
    }
  }
`;
