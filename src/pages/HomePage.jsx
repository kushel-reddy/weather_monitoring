import React, { useState, useEffect } from "react";
import { TextField, Button } from '@mui/material';


const HomePage = () => {

    const [city, setCity] = useState("");
    const [cityDetails, setCityDetails] = useState();
    const [cityWeather, setCityWeather] = useState();


    useEffect(() => {
        if(cityDetails) {
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${cityDetails.latitude}&longitude=${cityDetails.longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`)
            .then(response => response.json())
            .then(data => {
                setCityWeather(data);
                console.log(data)
            })
        }
    }, [cityDetails])

    const geocodingEndpoint = "https://geocoding-api.open-meteo.com/v1/search";
    const changeCity = (city) => {
        setCity(city);
    }

    const handleSearch = () => {
        console.log("handleSearch");

        fetch(`${geocodingEndpoint}?name=${city}`)
            .then(response => response.json())
            .then(data => {
                setCityDetails(data.results[0]);
                console.log(data.results[0])
            })



    }


    return (
        <>
        <TextField
            id="standard-basic"
            label="Search for City"
            variant="standard"

            onChange={(e) => changeCity(e.target.value)}
        />
        <Button
            onClick={handleSearch}
        >Search</Button>

        <div>
            {
                cityWeather?.current.temperature_2m}
                {
                cityWeather?.current.wind_speed_10m}
        </div>
        </>
    )
}

export default HomePage;