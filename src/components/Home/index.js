import React, { useState } from "react";
import { Wrapper } from "./styles.js";
import { usStates } from "./constants.js";
import OneDay from "./OneDay/index.js";
import ThreeDay from "./ThreeDay/index.js";
import FiveDay from "./FiveDay/index.js";

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

const getWeater = async (lat, lon, units) => {
  return await fetch(`
https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3629692cef6e7a55af67ced0043c6264&units=${units}`).then(
    async (response) => await response.json()
  );
};

export default function Home() {
  const [cityName, setCityName] = useState("_placeholder"); // change this to null
  const [stateCode, setStateCode] = useState("");
  const [units, setUnits] = useState("imperial");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [error, setError] = useState(false);
  const [forecastLength, setForecastLength] = useState("oneDay"); // See constants statement below
  const [hasSearched, setHasSearched] = useState(); // you never use hasSearched, delete this and all references to it.

  const createForecast = async () => {
    // change this to if (!cityName) {
    //   return
    // }
    if (cityName === "_placeholder" || cityName === "") {
      return;
    }
    // this if statement is irrelevant, because you return if cityName is empty you can just go right into the logic
    if (cityName !== "") {
      try {
        console.log("fetching coords");
        const coords = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},US&limit=5&appid=3629692cef6e7a55af67ced0043c6264`
        ).then(async (response) => await response.json());
        console.log("fetched coords");
        // instead of setting these to state, just go ahead and fetch 1day, 3day, and 5day forecasts here
        setLat(coords[0].lat);
        setLon(coords[0].lon);

        // fetching all the weather data
        const lat = coords[0].lat;
        const lon = coords[0].lon;
        console.log("fetching weather");
        const apiCalls = [];
        apiCalls.push(getForecast(lat, lon, units), getWeater(lat, lon, units));
        const [forecast, weather] = await Promise.all(apiCalls);
        console.log("fetched weather data");

        const oneDayForecast = {
          currentTemp: Math.floor(weather["main"].temp),
          feelsLike: Math.floor(weather["main"].feels_like),
          highTemp: Math.floor(weather["main"].temp_max),
          lowTemp: Math.floor(weather["main"].temp_min),
          humidity: Math.floor(weather["main"].humidity),
        };

        const fiveDayForecast = ["7", "15", "23", "31", "39"].map(
          (timestamp) => {
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
          }
        );

        console.log("one day forecast", oneDayForecast);
        console.log("five day forecast", fiveDayForecast);

        setError(false);
      } catch (err) {
        setError(true);
        console.log(err);
      }
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
          {/* get rid of this selector, we are going to make all 3 fetches when you click get forecast*/}
          <select
            // change to just input
            className="valid-input"
            onChange={(e) => {
              setLat(""); // change to null
              setLon(""); // change to null
              setForecastLength(e.target.value);
            }}
          >
            <option value="oneDay">1 Day</option>
            <option value="threeDay">3 Day</option>
            <option value="fiveDay">5 Day</option>
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
              setHasSearched(true);
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
          <div>
            {/* using constants like this is PERFECT, but make them all caps ONE_DAY, THREE_DAY, FIVE_DAY it is programming convention */}
            {forecastLength === "oneDay" && (
              <OneDay units={units} lat={lat} lon={lon} />
            )}
            {/* I think you can delete three day forecast and just use one day or fiveDay */}
            {forecastLength === "threeDay" && (
              <ThreeDay units={units} lat={lat} lon={lon} />
            )}
            {forecastLength === "fiveDay" && (
              <FiveDay units={units} lat={lat} lon={lon} />
            )}
          </div>
        )}

        {/* this is a dead div, delete it */}
        <div></div>
      </div>
    </Wrapper>
  );
}
