import React, {useState} from "react";

export default function Home() {
const [currentTemp, setCurrentTemp] = useState("");
const [searchLocation, setSearchLocation] = useState("");

    const fetchCoords = () => {
        const stringSearchLocation = searchLocation.split(" ");
        const formattedSearch = stringSearchLocation.join('%20');
        
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${formattedSearch}`)
            .then(res => {
                return res.json()})
            .then(data => {
                console.log(data)})
            .catch(err => console.log(err));
    }
    
    const fetchFunc = () => {
        fetch("https://api.weather.gov/gridpoints/PDT/57,165/forecast/hourly?units=us")
        .then(res => {
            return res.json()})
        .then(data => {
            setCurrentTemp(data.properties.periods[50].temperature)})
        .catch(err => console.log(err))

    }
    

    return(
        <div>
        <button type="button" onClick={fetchFunc}>Forecast</button>
        <div>{currentTemp}</div>
        </div>
    );
}


{/*<input type="text" placeholder="place" onChange={(e) => setSearchLocation(e.target.value)} />
<button type="button" onClick={fetchCoords}>Coordinates</button> */}