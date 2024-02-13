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
  const [cityName, setCityName] = useState("_placeholder");
  const [stateCode, setStateCode] = useState("");
  const [units, setUnits] = useState("imperial");
  const [error, setError] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentForecast, setCurrentForecast] = useState([]);
  const [twelveHourForecast, setTwelveHourForecast] = useState([]);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState("Clear");

  const handleUnitToggle = () => {
    if (units === "imperial") {
      setUnits("metric");
    }
    if (units === "metric") {
      setUnits("imperial");
    }
  };

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

      const currentForecast = {
        currentTemp: Math.floor(weather.main.temp),
        feelsLike: Math.floor(weather.main.feels_like),
        highTemp: Math.floor(weather.main.temp_max),
        lowTemp: Math.floor(weather.main.temp_min),
        humidity: Math.floor(weather.main.humidity),
        conditions: weather.weather[0].main,
        icon: weather.weather[0].icon,
        alt: weather.weather[0].main,
      };

      const twelveHourForecast = ["0", "1", "2", "3"].map((timestamp) => {
        const timeInfo = new Date(forecast.list[timestamp].dt_txt + " UTC");
        const hourOfDay = timeInfo.getHours();
        return {
          temp: forecast.list[timestamp].main.temp,
          time: (hourOfDay % 12 || 12) + (hourOfDay < 12 ? " AM" : " PM"),
          icon: forecast.list[timestamp].weather[0].icon,
          conditions: forecast.list[timestamp].weather[0].icon,
          alt: forecast.list[timestamp].weather[0].main,
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
        const dateInfo = new Date(forecast.list[timestamp].dt_txt);
        const dayOfWeek = dateInfo.getDay();
        return {
          currentTemp: forecast.list[timestamp].main.temp,
          feelsLike: forecast.list[timestamp].main.feels_like,
          highTemp: forecast.list[timestamp].main.temp_max,
          lowTemp: forecast.list[timestamp].main.temp_min,
          humidity: forecast.list[timestamp].main.humidity,
          day: arrayOfDays[dayOfWeek],
          conditions: forecast.list[timestamp].weather[0].main,
          icon: forecast.list[timestamp].weather[0].icon,
          alt: forecast.list[timestamp].weather[0].main,
          key: timestamp,
        };
      });
      setBackgroundColor(currentForecast.conditions);
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
      <div className={backgroundColor}>
        {/* Begin Search */}
        <div className="site-title">WeatherSpout</div>
        <div className="search">
          <input
            className={`input ${cityName ? "" : "invalid"}`}
            type="text"
            placeholder="City"
            onChange={(e) => setCityName(e.target.value)}
          />
          <select
            className="search-options"
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
          <div className="unit-and-search">
            <input
              type="checkbox"
              id="check"
              className="toggle"
              onClick={handleUnitToggle}
            />
            <label for="check" />
            <button
              className="button"
              type="button"
              onClick={(e) => {
                createForecast(e);
              }}
            >
              Search
            </button>
          </div>
        </div>

        {/* End Search */}

        {error ? (
          <div className="error-div">
            <div className="error-message">
              <div>Something went wrong.</div>
              <div>Try searching again.</div>
            </div>
          </div>
        ) : (
          <div className="page-content">
            {hasSearched ? (
              <div className="forecast">
                {/* Current Forecast */}
                <div className="current-forecast">
                  <div className="forecast-title">Current Forecast</div>
                  <div className="current-forecast-item">
                    <div className="temp-and-conditions">
                      <img
                        title={currentForecast.alt}
                        src={`https://openweathermap.org/img/wn/${currentForecast.icon}.png`}
                        alt={currentForecast.alt}
                      />
                      <div className="forecast-value">
                        {currentForecast.currentTemp}&deg;
                        {units === "imperial" ? "F" : "C"}
                      </div>
                    </div>
                    <div className="forecast-value">
                      Feels Like: {currentForecast.feelsLike}&deg;
                      {units === "imperial" ? "F" : "C"}
                    </div>
                    <div className="forecast-value">
                      Humidity: {currentForecast.humidity}%
                    </div>
                  </div>
                </div>

                {/* Twelve Hour Forecast */}

                <div className="twelve-hour-forecast">
                  <div className="forecast-title">Twelve Hour Forecast</div>
                  <div className="forecast-container">
                    {twelveHourForecast.map((hour) => {
                      return (
                        <div className="forecast-item" key={hour.key}>
                          <div className="forecast-time">{hour.time}</div>
                          <div className="temp-and-conditions">
                            <img
                              title={hour.alt}
                              src={`https://openweathermap.org/img/wn/${hour.icon}.png`}
                              alt={hour.alt}
                            />
                            <div>
                              {Math.floor(hour.temp)}&deg;
                              {units === "imperial" ? "F" : "C"}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Five Day Forecast */}
                <div className="five-day-forecast">
                  <div className="forecast-title">Five Day Forecast</div>
                  <div className="forecast-container">
                    {fiveDayForecast.map((day) => {
                      return (
                        <div className="forecast-item" key={day.key}>
                          <div className="forecast-day">{day.day}</div>
                          <div className="temp-and-conditions">
                            <img
                              title={day.alt}
                              src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                              alt={day.alt}
                            />
                            <div>
                              {Math.floor(day.currentTemp)}&deg;
                              {units === "imperial" ? "F" : "C"}
                            </div>
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
              </div>
            ) : (
              <div className="landing-container">
                <div>Welcome to WeatherSpout!</div>
                <div className="landing-info">
                  Fill out the above form and see what your local weather looks
                  like in seconds!
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Wrapper>
  );
}
