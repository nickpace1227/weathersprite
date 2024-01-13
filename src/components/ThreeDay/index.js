import React, { useState, useEffect } from "react";
import { Wrapper } from "./styles.js";

export default function ThreeDay(props) {
  const [temp, setTemp] = useState("");

  const callForecast = async () => {
    try {
      console.log("Fetching Forecast...");
      const forecast = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${props.lat}&lon=${props.lon}&appid=3629692cef6e7a55af67ced0043c6264&units=${props.units}`
      );
      const processedForecast = await forecast.json();
      console.log("Forecast Processed!");
      setTemp(processedForecast["list"][0]["main"].temp);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (props.lat !== "" && props.lon !== "") {
      callForecast();
    }
  });

  return (
    <Wrapper>
      <div>Three Day Forecast</div>
      <div>{temp}</div>
    </Wrapper>
  );
}
