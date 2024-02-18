import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "../Styles/globalstyles";
import Home from "../Home";

export default function Weathersprite() {
  return (
    <BrowserRouter>
      <GlobalStyles>
        <Routes>
          <Route path="/" exact element={<Home />} />
        </Routes>
      </GlobalStyles>
    </BrowserRouter>
  );
}
