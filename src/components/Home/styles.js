import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-attachment: fixed;

  .Clouds,  {
    background-image: linear-gradient(#272a2b, #a7dbd8);
    min-height: 100vh;
    background-attachment: fixed;
    min-width: 100vw;
  }

  .Clear {
    background-image: linear-gradient(#69d2e7, white);
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
    background-image: linear-gradient(#c74066, white);
    min-height: 100vh;
    background-attachment: fixed;
    min-width: 100vw;
  }

  .site-title {
    font-family: "LemonRegular";
    margin: 16px;
    margin-top: 24px;
    font-size: 30px;
    text-align: center;
    text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white;
  }

  .input {
    margin: 4px;
    border-radius: 8px;
    padding: 8px;
    width: 140px;
  }

  .search-options {
    margin: 4px;
    border-raidus: 8px;
    padding: 8px;
    width: 160px;
  }

  .button {
    margin: 4px;
    border-radius: 8px;
    padding 8px;
    width: 80px;
  }

  .invalid {
    border: 4px solid red;
  }

  .error-div {
    display: flex;
    justify-content: center;
    text-align: center;
  }

  .error-message {
    display: flex;
    flex-direction: column;
    margin: 16px;
    width: 200px;
    padding: 8px;
    border-radius: 8px;
    border: 4px solid black;
    background-color: #e0e4cc;
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

  .weather-image:hover {
    
  }

  .page-content {
    display: flex;
    justify-content: center;
  }

  label::before {
    content: "ass";
  }

  label::after {
    content: "fuck";
  }

  input[type="checkbox"].toggle {
    opacity: 0;
    position: absolute;
    left: -9000px;
    top: -9000px;
  }

  input[type="checkbox"].toggle + label {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  input[type="checkbox"].toggle + label::before {
    content: "";
    width: 74px;
    height: 36px;
    background-color: #DDD;
    border-radius: 24px;
    margin: 2px;
  }

  input[type="checkbox"].toggle + label::after {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    content: "F";
    left: 5px;
    width: 34px;
    height: 34px;
    background-color: #005bc5;
    border-radius: 24px;
    margin: 0px;
    position: absolute;
    transition: transform 150ms ease-in-out;
  }

  input[type="checkbox"].toggle:focus + label::before {
    outline: 1px solid black;
  }

  input[type="checkbox"].toggle:checked + label::after {
    transform: translateX(100%);
    background-color: #fa6900;
    content: "C";
  }

  .landing-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 25px;
    border: 2px solid black;
    padding: 8px;
    border-radius: 8px;
    background-color: #e0e4cc;
    width: 200px;
    text-align: center;
  }

  .landing-info {
    margin: 8px;
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
      border: 2px solid black;
      background-color: #e0e4cc;
      width: 200px;
    }

    .twelve-hour-forecast {
      margin: 16px;
      padding: 8px;
      border-radius: 8px;
      border: 2px solid black;
      background-color: #e0e4cc;
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
      border: 2px solid black;
      background-color: #e0e4cc;
    }
  }

  .unit-and-search {
    display: flex;
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
      border: 2px solid black;
      background-color: #e0e4cc;
      width: 200px;
    }

    .twelve-hour-forecast {
      margin: 16px;
      padding: 8px;
      border-radius: 8px;
      border: 2px solid black;
      background-color: #e0e4cc;
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
      border: 2px solid black;
      background-color: #e0e4cc;
      width: 200px;
    }
  }
`;
