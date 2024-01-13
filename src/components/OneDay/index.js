import React, { useState, useEffect } from "react";
import { Wrapper } from "./styles.js";

export default function OneDay(props) {
  const [currentTemp, setCurrentTemp] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [highTemp, setHighTemp] = useState("");
  const [lowTemp, setLowTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [hasFetched, setHasFetched] = useState(false);
  const forecast = [];

  const callWeather = async () => {
    if (props.lat !== "" && props.lon !== "" && hasFetched === false) {
      try {
        const weather = await fetch(`
          https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.lon}&appid=3629692cef6e7a55af67ced0043c6264&units=${props.units}`);
        const processedWeather = await weather.json();
        console.log(processedWeather);
        setCurrentTemp(Math.floor(processedWeather["main"].temp));
        setFeelsLike(Math.floor(processedWeather["main"].feels_like));
        setHighTemp(Math.floor(processedWeather["main"].temp_max));
        setLowTemp(Math.floor(processedWeather["main"].temp_min));
        setHumidity(Math.floor(processedWeather["main"].humidity));
        forecast.push(processedWeather);
        setHasFetched(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    callWeather();
  });

  return (
    <Wrapper>
      {hasFetched ? (
        <div>
          <div>Today's Forecast</div>
          <div>Current Temp: {currentTemp}</div>
          <div>Feels Like: {feelsLike}</div>
          <div>Today's High: {highTemp}</div>
          <div>Today's Low: {lowTemp}</div>
          <div>Humidity: {humidity}</div>
        </div>
      ) : (
        <div>Do a Search</div>
      )}
    </Wrapper>
  );
}

//processedForecast["list"][0]["main"].temp
