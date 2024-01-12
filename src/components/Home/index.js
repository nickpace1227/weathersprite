import React, { useState } from "react";
import { Wrapper } from "./styles.js";
import { usStates } from "./constants.js";
import OneDay from "../OneDay";

export default function Home() {
  const [cityName, setCityName] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [units, setUnits] = useState("imperial");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [forecast, setForecast] = useState("No Search");
  const [error, setError] = useState(false);
  const [forecastLength, setForecastLength] = useState("oneDay");
  const [activeComponent, setActiveComponent] = useState("");

  const createForecast = async () => {
    try {
      console.log("fetching coords");
      const coords = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},US&limit=5&appid=3629692cef6e7a55af67ced0043c6264`
      );
      const processedCoords = await coords.json();
      console.log("fetched coords");
      setLat(processedCoords[0].lat);
      setLon(processedCoords[0].lon);

      // const forecast = await fetch(
      //   `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=3629692cef6e7a55af67ced0043c6264&units=${defaultUnits}`
      // );
      // console.log("fetching forecast");
      // const processedForecast = await forecast.json();
      // console.log(processedForecast);
      // setForecast(processedForecast);
      // console.log("forecast fetched");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <Wrapper>
      {/* Begin Search */}

      <div className="forecast-page">
        <input
          type="text"
          placeholder="city"
          onChange={(e) => setCityName(e.target.value)}
        />
        <select
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
        <select onChange={(e) => setUnits(e.target.value)}>
          <option value="imperial">Imperial</option>
          <option value="metric">Metric</option>
        </select>
        <select onChange={(e) => setForecastLength(e.target.value)}>
          <option value="oneDay">1 Day</option>
          <option value="threeDay">3 Day</option>
          <option value="fiveDay">5 Day</option>
        </select>
        <button type="button" onClick={createForecast}>
          Search
        </button>

        {/* End Search */}

        {forecastLength === "oneDay" && (
          <OneDay units={units} lat={lat} lon={lon} forecast={forecast} />
        )}

        <div></div>
      </div>
    </Wrapper>
  );
}
