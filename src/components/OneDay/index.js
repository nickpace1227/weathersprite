import React, { useState, useEffect } from "react";
import { Wrapper } from "./styles.js";

export default function OneDay(props) {
  const [weather, setWeather] = useState([]);
  const [temp, setTemp] = useState("No Search");

  const callWeather = async () => {
    try {
      const weather = await fetch(`
        https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.lon}&appid=3629692cef6e7a55af67ced0043c6264&units=${props.units}`);
      const processedWeather = await weather.json();
      setTemp(processedWeather["main"].temp);
      console.log(processedWeather);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (props.lat !== "" && props.lon !== "") {
      callWeather();
    }
  });

  return (
    <Wrapper>
      <div>Today's Forecast</div>
      <div>Temp in Seattle: {temp}F</div>
    </Wrapper>
  );
}

//processedForecast["list"][0]["main"].temp
