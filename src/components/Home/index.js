import React, { useState } from "react";
import { Wrapper } from "./styles.js";
import { usStates } from "./constants.js";

const arrayOfDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getForecast = async (lat, lon, units) => {
  return await fetch(`
https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=3629692cef6e7a55af67ced0043c6264&units=${units}`).then(
    async (response) => await response.json()
  );
};

const getWeather = async (lat, lon, units) => {
  return await fetch(`
https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3629692cef6e7a55af67ced0043c6264&units=${units}`).then(
    async (response) => await response.json()
  );
};

let futureForecast = "";

export default function Home() {
  const [cityName, setCityName] = useState(null);
  const [stateCode, setStateCode] = useState("");
  const [units, setUnits] = useState("imperial");
  const [error, setError] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [oneDayForecast, setOneDayForecast] = useState([]);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);

  const createForecast = async () => {
    if (!cityName) {
      return;
    }
    try {
      console.log("fetching coords");
      const coords = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},US&limit=5&appid=3629692cef6e7a55af67ced0043c6264`
      ).then(async (response) => await response.json());
      console.log("fetched coords");

      // fetching all the weather data
      const lat = coords[0].lat;
      const lon = coords[0].lon;
      console.log("fetching weather");
      const apiCalls = [];
      apiCalls.push(getForecast(lat, lon, units), getWeather(lat, lon, units));
      const [forecast, weather] = await Promise.all(apiCalls);
      console.log("fetched weather data");

      const oneDayForecast = {
        currentTemp: Math.floor(weather["main"].temp),
        feelsLike: Math.floor(weather["main"].feels_like),
        highTemp: Math.floor(weather["main"].temp_max),
        lowTemp: Math.floor(weather["main"].temp_min),
        humidity: Math.floor(weather["main"].humidity),
      };

      const fiveDayForecast = ["7", "15", "23", "31", "39"].map((timestamp) => {
        const day = new Date(forecast["list"][timestamp].dt_txt);
        const dayOfWeek = day.getDay();
        return {
          currentTemp: forecast["list"][timestamp]["main"].temp,
          feelsLike: forecast["list"][timestamp]["main"].feels_like,
          highTemp: forecast["list"][timestamp]["main"].temp_max,
          lowTemp: forecast["list"][timestamp]["main"].temp_min,
          humidity: forecast["list"][timestamp]["main"].humidity,
          day: arrayOfDays[dayOfWeek],
          key: timestamp,
        };
      });
      setHasSearched(true);
      setError(false);
      setOneDayForecast(oneDayForecast);
      setFiveDayForecast(fiveDayForecast);
      console.log("one day forecast", oneDayForecast);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <Wrapper>
      {/* Begin Search */}

      {/* forecast page can be deleted and attach the styles to wrapper instead */}
      <div className="forecast-page">
        <div className="forecast-search">
          <input
            // className= `input ${cityName ? "" : "invalid"}`
            // .input {
            //   css goes here
            //   &.invalid {
            //     invalid css goes here
            //   }
            // }
            className={cityName ? "valid-input" : "invalid-input"}
            type="text"
            placeholder="City"
            onChange={(e) => setCityName(e.target.value)}
          />
          <select
            // change to just input
            className="valid-input"
            placeholder="state"
            onChange={(e) => setStateCode(e.target.value)}
          >
            <option value="">State</option>
            {usStates.map((state) => {
              return (
                <option key={state} value={state}>
                  {state}
                </option>
              );
            })}
          </select>
          <select
            // change to just input
            className="valid-input"
            onChange={(e) => setUnits(e.target.value)}
          >
            <option value="imperial">Imperial</option>
            <option value="metric">Metric</option>
          </select>
          <button
            // change to just input
            className="valid-input"
            type="button"
            onClick={(e) => {
              createForecast(e);
            }}
          >
            Search
          </button>
        </div>

        {/* End Search */}

        {error ? (
          <div>
            <div>Something Went Wrong</div>
            <div>Try searching again.</div>
          </div>
        ) : (
          <div className="forecast-layout">
            {hasSearched && (
              <div>
                <div className="forecast-card">
                  <div className="forecast-header">Today's Forecast</div>
                  <div className="forecast-value">
                    Current Temp: {oneDayForecast.currentTemp}&deg;{units}
                  </div>
                  <div className="forecast-value">
                    Feels Like: {oneDayForecast.feelsLike}&deg;{units}
                  </div>
                  <div className="forecast-value">
                    Today's High: {oneDayForecast.highTemp}&deg;{units}
                  </div>
                  <div className="forecast-value">
                    Today's Low: {oneDayForecast.lowTemp}&deg;{units}
                  </div>
                  <div className="forecast-value">
                    Humidity: {oneDayForecast.humidity}%
                  </div>
                </div>

                <div className="forecast-days">
                  <div className="forecast-selection">Five Day Forecast</div>
                  {fiveDayForecast.map((day) => {
                    return (
                      <div key={day.key} className="forecast-card">
                        <div className="forecast-header">{day.day}</div>
                        <div className="forecast-value">
                          Temp: {Math.floor(day.currentTemp)}&deg;{units}
                        </div>
                        <div className="forecast-value">
                          Feels Like: {Math.floor(day.feelsLike)}&deg;{units}
                        </div>
                        <div className="forecast-value">
                          High: {Math.floor(day.highTemp)}&deg;{units}
                        </div>
                        <div className="forecast-value">
                          Low: {Math.floor(day.lowTemp)}&deg;{units}
                        </div>
                        <div className="forecast-value">
                          Humidity: {Math.floor(day.humidity)}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Wrapper>
  );
}
