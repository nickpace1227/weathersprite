import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Weatherspout from "./Components/Router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Weatherspout />
  </React.StrictMode>
);
