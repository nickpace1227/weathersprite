import React, { useState } from "react";
import { Wrapper } from "./styles.js";
import { states } from "./constants.js";

export default function Home() {
  const [cityName, setCityName] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [defaultUnits, setDefaultUnits] = useState("imperial");
  const [hasSearched, setHasSearched] = useState(false);
  const [forecast, setForecast] = useState("No Search");

  const createForecast = async () => {
    try {
      console.log("fetching coords");
      const coords = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},US&limit=5&appid=3629692cef6e7a55af67ced0043c6264`
      );
      const processedCoords = await coords.json();
      console.log("fetched coords");
      const lat = processedCoords[0].lat;
      const lon = processedCoords[0].lon;
      const forecast = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=3629692cef6e7a55af67ced0043c6264&units=${defaultUnits}`
      );
      console.log("fetching forecast");
      const processedForecast = await forecast.json();
      //forecastData.push(processedForecast["list"][0]["main"].temp);
      setHasSearched(true);
      console.log(processedForecast);
      setForecast(processedForecast["list"][0]["main"].temp);
      console.log("forecast fetched");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
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
          {states.map((state) => {
            return (
              <option key={state} value={state}>
                {state}
              </option>
            );
          })}
        </select>
        <input
          type="radio"
          id="imperial"
          name="units"
          value="imperial"
          defaultChecked="true"
          onClick={(e) => setDefaultUnits("imperial")}
        />
        <label htmlFor="imperial">Imperial</label>
        <input
          type="radio"
          id="metric"
          name="units"
          value="metric"
          onClick={(e) => setDefaultUnits("metric")}
        />
        <label htmlFor="metric">Metric</label>
        <button type="button" onClick={createForecast}>
          Search
        </button>
        <div>{forecast}</div>
      </div>
    </Wrapper>
  );
}
