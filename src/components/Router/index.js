import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Header";
import Home from "../Home";

export default function Weatherspout() {
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" exact element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}