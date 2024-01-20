import React, { useState } from "react";
import { Wrapper } from "./styles.js";
import { usStates } from "./constants.js";

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

export default function Home() {
  const [cityName, setCityName] = useState(null);
  const [stateCode, setStateCode] = useState("");
  const [units, setUnits] = useState("imperial");
  const [error, setError] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentForecast, setCurrentForecast] = useState([]);
  const [twelveHourForecast, setTwelveHourForecast] = useState([]);
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

      console.log(weather);
      console.log(forecast);

      const currentForecast = {
        currentTemp: Math.floor(weather["main"].temp),
        feelsLike: Math.floor(weather["main"].feels_like),
        highTemp: Math.floor(weather["main"].temp_max),
        lowTemp: Math.floor(weather["main"].temp_min),
        humidity: Math.floor(weather["main"].humidity),
      };

      const twelveHourForecast = ["0", "1", "2", "3"].map((timestamp) => {
        const arrayOfTimes = [
          "12 AM",
          "1 AM",
          "2 AM",
          "3 AM",
          "4 AM",
          "5 AM",
          "6 AM",
          "7 AM",
          "8 AM",
          "9 AM",
          "10 AM",
          "11 AM",
          "12 PM",
          "1 PM",
          "2 PM",
          "3 PM",
          "4 PM",
          "5 PM",
          "6 PM",
          "7 PM",
          "8 PM",
          "9 PM",
          "10 PM",
          "11 PM",
        ];
        const timeInfo = new Date(forecast["list"][timestamp].dt_txt);
        const timeOfDay = timeInfo.getHours();
        return {
          temp: forecast["list"][timestamp]["main"].temp,
          time: arrayOfTimes[timeOfDay],
          key: timestamp,
        };
      });

      const fiveDayForecast = ["7", "15", "23", "31", "39"].map((timestamp) => {
        const arrayOfDays = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const dateInfo = new Date(forecast["list"][timestamp].dt_txt);
        const dayOfWeek = dateInfo.getDay();
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
      setCurrentForecast(currentForecast);
      setTwelveHourForecast(twelveHourForecast);
      setFiveDayForecast(fiveDayForecast);
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
            {hasSearched ? (
              <div>
                {/* Current Forecast */}
                <div className="forecast-card">
                  <div className="forecast-header">Current Forecast</div>
                  <div className="forecast-value">
                    Current Temp: {currentForecast.currentTemp}&deg;
                    {units === "imperial" ? "F" : "C"}
                  </div>
                  <div className="forecast-value">
                    Feels Like: {currentForecast.feelsLike}&deg;
                    {units === "imperial" ? "F" : "C"}
                  </div>
                  <div className="forecast-value">
                    Humidity: {currentForecast.humidity}%
                  </div>
                </div>

                {/* Twelve Hour Forecast */}
                <div>Next Twelve Hours</div>
                {twelveHourForecast.map((day) => {
                  return (
                    <div key={day.key}>
                      <div>{day.time}</div>
                      <div>
                        {Math.floor(day.temp)}&deg;
                        {units === "imperial" ? "F" : "C"}
                      </div>
                      <div>conditions at time</div>
                    </div>
                  );
                })}

                {/* Five Day Forecast */}
                <div className="forecast-days">
                  <div className="forecast-selection">Five Day Forecast</div>
                  {fiveDayForecast.map((day) => {
                    return (
                      <div key={day.key} className="forecast-card">
                        <div className="forecast-header">{day.day}</div>
                        <div className="forecast-value">
                          Temp: {Math.floor(day.currentTemp)}&deg;
                          {units === "imperial" ? "F" : "C"}
                        </div>
                        <div className="forecast-value">
                          Feels Like: {Math.floor(day.feelsLike)}&deg;
                          {units === "imperial" ? "F" : "C"}
                        </div>
                        <div className="forecast-value">
                          High: {Math.floor(day.highTemp)}&deg;
                          {units === "imperial" ? "F" : "C"}
                        </div>
                        <div className="forecast-value">
                          Low: {Math.floor(day.lowTemp)}&deg;
                          {units === "imperial" ? "F" : "C"}
                        </div>
                        <div className="forecast-value">
                          Humidity: {Math.floor(day.humidity)}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>get searchin!</div>
            )}
          </div>
        )}
      </div>
    </Wrapper>
  );
}
