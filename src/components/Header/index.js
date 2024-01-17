import React from "react";
import { Wrapper } from "./styles.js";

export default function Header() {
  return (
    <Wrapper>
      <div className="main-div">
        <div className="site-title">WeatherSpout</div>
        <div className="nav-item">Home</div>
        <div className="nav-item">Forecast</div>
        <div className="nav-item">Contact</div>
      </div>
    </Wrapper>
  );
}
