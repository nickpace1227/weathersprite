import React from "react";

export default function Home() {
    const fetchFunc = () => {
       fetch("https://api.weather.gov/gridpoints/PDT/57,165/forecast?units=us")
        .then(res => res.json())
        .then(data => console.log(data))
    }
    

    return(
        <button type="button" onClick={fetchFunc}>stuff</button>
    );
}