import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "../Styles/GlobalStyles";
import Header from "../Header";
import Home from "../Home";

export default function Weatherspout() {
  return (
    <BrowserRouter>
      <GlobalStyles>
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
        </Routes>
      </GlobalStyles>
    </BrowserRouter>
  );
}
