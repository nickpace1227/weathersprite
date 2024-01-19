import React, { useState, useEffect } from "react";
import { Wrapper } from "./styles.js";

export default function ThreeDay(props) {
  const [units, setUnits] = useState("");
  const [hasFetched, setHasFetched] = useState(false);
  const [days, setDays] = useState([]);

  const callForecast = async () => {
    if (props.lat !== "" && props.lon !== "") {
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
        // replace ^^ with
        // const processedForecast = await fetch(
        //   `http://api.openweathermap.org/data/2.5/forecast?lat=${props.lat}&lon=${props.lon}&appid=3629692cef6e7a55af67ced0043c6264&units=${props.units}`
        // ).then(async (response) => await response.json());
        console.log("Forecast Processed!");
        setHasFetched(true);
        const arrayOfDays = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        // replace below with this:
        // const fiveDayForecast = ["7", "15", "23", "31", "39"].map(
        //   (timestamp) => {
        //     const day = new Date(processedForecast["list"][timestamp].dt_txt);
        //     const dayOfWeek = day.getDay();
        //     return {
        //       currentTemp: processedForecast["list"][timestamp]["main"].temp,
        //       feelsLike:
        //         processedForecast["list"][timestamp]["main"].feels_like,
        //       highTemp: processedForecast["list"][timestamp]["main"].temp_max,
        //       lowTemp: processedForecast["list"][timestamp]["main"].temp_min,
        //       humidity: processedForecast["list"][timestamp]["main"].humidity,
        //       day: arrayOfDays[dayOfWeek],
        //       key: timestamp,
        //     };
        //   }
        // );
        const fiveDayForecast = [];
        ["7", "15", "23", "31", "39"].forEach((timestamp) => {
          const day = new Date(processedForecast["list"][timestamp].dt_txt);
          const dayOfWeek = day.getDay();
          fiveDayForecast.push({
            currentTemp: processedForecast["list"][timestamp]["main"].temp,
            feelsLike: processedForecast["list"][timestamp]["main"].feels_like,
            highTemp: processedForecast["list"][timestamp]["main"].temp_max,
            lowTemp: processedForecast["list"][timestamp]["main"].temp_min,
            humidity: processedForecast["list"][timestamp]["main"].humidity,
            day: arrayOfDays[dayOfWeek],
            key: timestamp,
          });
        });

        setDays(fiveDayForecast);
        console.log(processedForecast);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    callForecast();
    // you have to add callForecast to the dependency array
  }, [props.lat, props.lon]);

  return (
    <Wrapper>
      {/* dead div */}
      <div>
        {/*  dont need the has Fetched because it is defaulted to oneDay */}
        {hasFetched ? (
          <div className="forecast-layout">
            <div className="forecast-length">
              <div className="forecast-selection">Five Day Forecast</div>
            </div>
            <div className="forecast-days">
              {days.map((day) => {
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
        ) : (
          <div className="blank-search">
            <div>Get Searchin!</div>
            <div>
              Fill out the form above and see the local forecast for your city!
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
}
