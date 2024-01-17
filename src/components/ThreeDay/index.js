import React, { useState, useEffect } from "react";
import { Wrapper } from "./styles.js";

export default function ThreeDay(props) {
  const [units, setUnits] = useState("");
  const [hasFetched, setHasFetched] = useState(false);
  const [days, setDays] = useState([]);

  const callForecast = async () => {
    if (props.lat !== "" && props.lon !== "" && hasFetched === false) {
      if (props.units === "imperial") {
        setUnits("F");
      }

      if (props.units === "metric") {
        setUnits("C");
      }
      try {
        console.log("Fetching Forecast...");
        const forecast = await fetch(
          `http://api.openweathermap.org/data/2.5/forecast?lat=${props.lat}&lon=${props.lon}&appid=3629692cef6e7a55af67ced0043c6264&units=${props.units}`
        );
        const processedForecast = await forecast.json();
        console.log("Forecast Processed!");
        setHasFetched(true);
        console.log(forecast);
        setDays([
          {
            currentTemp: processedForecast["list"][7]["main"].temp,
            feelsLike: processedForecast["list"][7]["main"].feels_like,
            highTemp: processedForecast["list"][7]["main"].temp_max,
            lowTemp: processedForecast["list"][7]["main"].temp_min,
            humidity: processedForecast["list"][7]["main"].humidity,
            key: 1,
          },
          {
            currentTemp: processedForecast["list"][15]["main"].temp,
            feelsLike: processedForecast["list"][15]["main"].feels_like,
            highTemp: processedForecast["list"][15]["main"].temp_max,
            lowTemp: processedForecast["list"][15]["main"].temp_min,
            humidity: processedForecast["list"][15]["main"].humidity,
            key: 2,
          },
          {
            currentTemp: processedForecast["list"][23]["main"].temp,
            feelsLike: processedForecast["list"][23]["main"].feels_like,
            highTemp: processedForecast["list"][23]["main"].temp_max,
            lowTemp: processedForecast["list"][23]["main"].temp_min,
            humidity: processedForecast["list"][23]["main"].humidity,
            key: 3,
          },
        ]);
        console.log(days);
        console.log(processedForecast);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    callForecast();
  });

  return (
    <Wrapper>
      {hasFetched ? (
        <div>
          <div>Three Day Forecast</div>
          {days.map((day) => {
            return (
              <div key={day.key} className="forecast-card">
                <div className="forecast-header">Placeholder Forecast</div>
                <div className="forecast-value">
                  Temp: {Math.floor(day.currentTemp)} {units}
                </div>
                <div className="forecast-value">
                  Feels Like: {Math.floor(day.feelsLike)} {units}
                </div>
                <div className="forecast-value">
                  High: {Math.floor(day.highTemp)} {units}
                </div>

                <div className="forecast-value">
                  Low: {Math.floor(day.lowTemp)} {units}
                </div>
                <div className="forecast-value">
                  Humidity: {Math.floor(day.humidity)}%
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Do a Search</div>
      )}
    </Wrapper>
  );
}
