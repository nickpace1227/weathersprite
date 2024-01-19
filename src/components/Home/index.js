import React, { useState } from "react";
import { Wrapper } from "./styles.js";
import { usStates } from "./constants.js";
import OneDay from "../OneDay";
import ThreeDay from "../ThreeDay";
import FiveDay from "../FiveDay";

export default function Home() {
  const [cityName, setCityName] = useState("_placeholder");
  const [stateCode, setStateCode] = useState("");
  const [units, setUnits] = useState("imperial");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [error, setError] = useState(false);
  const [forecastLength, setForecastLength] = useState("oneDay");
  const [hasSearched, setHasSearched] = useState();

  const createForecast = async () => {
    if (cityName === "_placeholder" || cityName === "") {
      return;
    }
    if (cityName !== "") {
      try {
        console.log("fetching coords");
        const coords = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},US&limit=5&appid=3629692cef6e7a55af67ced0043c6264`
        );
        const processedCoords = await coords.json();
        console.log("fetched coords");
        setLat(processedCoords[0].lat);
        setLon(processedCoords[0].lon);
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

      <div className="forecast-page">
        <div className="forecast-search">
          <input
            className={cityName ? "valid-input" : "invalid-input"}
            type="text"
            placeholder="City"
            onChange={(e) => setCityName(e.target.value)}
          />
          <select
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
            className="valid-input"
            onChange={(e) => {
              setLat("");
              setLon("");
              setForecastLength(e.target.value);
            }}
          >
            <option value="oneDay">1 Day</option>
            <option value="threeDay">3 Day</option>
            <option value="fiveDay">5 Day</option>
          </select>
          <select
            className="valid-input"
            onChange={(e) => setUnits(e.target.value)}
          >
            <option value="imperial">Imperial</option>
            <option value="metric">Metric</option>
          </select>
          <button
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
            {forecastLength === "oneDay" && (
              <OneDay units={units} lat={lat} lon={lon} />
            )}
            {forecastLength === "threeDay" && (
              <ThreeDay units={units} lat={lat} lon={lon} />
            )}
            {forecastLength === "fiveDay" && (
              <FiveDay units={units} lat={lat} lon={lon} />
            )}
          </div>
        )}

        <div></div>
      </div>
    </Wrapper>
  );
}
