import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "../styles/globalstyles";
import Home from "../home";

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
