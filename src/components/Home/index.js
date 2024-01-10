import React, {useState} from "react";
import {Wrapper} from "./styles.js";

export default function Home() {
const [cityName, setCityName] = useState("");
const [stateCode, setStateCode] = useState("");
const [defaultUnits, setDefaultUnits] = useState("imperial")
const states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
const [forecastData, setForecastData] = useState({});


    const fetchCoords = () => {       
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},US&limit=5&appid=3629692cef6e7a55af67ced0043c6264`)
            .then(res => {
                return res.json()})
            .then(data => {
                return ({lat: data[0].lat, lon: data[0].lon})})
            .then(data => {
                fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&appid=3629692cef6e7a55af67ced0043c6264&units=${defaultUnits}`)
                .then(res => {
                    return res.json()})
                .then(forecast => {
                    setForecastData(forecast);
                    console.log(forecastData)
                })
                .catch(err => console.log(err))
            .catch(err => console.log(err));
            });       
    }

    return(
    <Wrapper>
        <div className="forecast-page">
        <input type="text" placeholder="city" onChange={(e) => setCityName(e.target.value)} />
        <select placeholder="state" onChange={(e) => setStateCode(e.target.value)}>
            <option value="">State</option>
            {states.map((state) => {
                return (
                    <option key={state} value={state}>{state}</option>
                )
            })}
        </select>
            <input type="radio" id="imperial" name="units" value="imperial" defaultChecked="true" onClick={(e) => setDefaultUnits("imperial")} />
            <label for="imperial">Imperial</label>
            <input type="radio" id="metric" name="units" value="metric" onClick={(e) => setDefaultUnits("metric")}/>
            <label for="metric">Metric</label>
        <button type="button" onClick={fetchCoords}>Search</button>
            <div></div>
        </div>
    </Wrapper>
    );
}