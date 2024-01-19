import React, { useState, useEffect } from "react";
import { Wrapper } from "./styles.js";

export default function OneDay(props) {
  const [hasFetched, setHasFetched] = useState(false);
  const [units, setUnits] = useState("");
  const [forecast, setForecast] = useState({});

  const callWeather = async () => {
    if (props.lat !== "" && props.lon !== "") {
      if (props.units === "imperial") {
        setUnits("F");
      }

      if (props.units === "metric") {
        setUnits("C");
      }
      try {
        const weather = await fetch(`
          https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.lon}&appid=3629692cef6e7a55af67ced0043c6264&units=${props.units}`);
        const processedWeather = await weather.json();
        console.log(processedWeather);

        setForecast({
          currentTemp: Math.floor(processedWeather["main"].temp),
          feelsLike: Math.floor(processedWeather["main"].feels_like),
          highTemp: Math.floor(processedWeather["main"].temp_max),
          lowTemp: Math.floor(processedWeather["main"].temp_min),
          humidity: Math.floor(processedWeather["main"].humidity),
        });
        setHasFetched(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    callWeather();
  }, [props.lat, props.lon]);

  return (
    <Wrapper>
      {hasFetched ? (
        <div className="forecast-card">
          <div className="forecast-header">Today's Forecast</div>
          <div className="forecast-value">
            Current Temp: {forecast.currentTemp}&deg;{units}
          </div>
          <div className="forecast-value">
            Feels Like: {forecast.feelsLike}&deg;{units}
          </div>
          <div className="forecast-value">
            Today's High: {forecast.highTemp}&deg;{units}
          </div>
          <div className="forecast-value">
            Today's Low: {forecast.lowTemp}&deg;{units}
          </div>
          <div className="forecast-value">Humidity: {forecast.humidity}%</div>
        </div>
      ) : (
        <div className="blank-search">
          <div>Get Searchin!</div>
          <div>
            Fill out the form above and see the local forecast for your city!
          </div>
        </div>
      )}
    </Wrapper>
  );
}
