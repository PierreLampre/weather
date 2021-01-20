import React, { useState } from "react";
import env from "react-dotenv";
import "./zipform.css";

const ZipForm = () => {

  const [placeholder, setPlaceholder] = useState("Enter Zip Code")
  const [zipcode, setZipcode] = useState("");
  const [weather, setWeather] = useState(null);
  
  let url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=${env.API_KEY}`

  const fetchRequest = () => {
  
    if((zipcode.length > 4) && (zipcode !== "")) {

      console.log(weather);

      fetch(url)
      .then(response => response.json())
      .then(function (data) {
      console.log(data);
      setWeather(data);
      })

    } else {
      document.getElementById("input").value = "";
      setPlaceholder("Invalid Entry, try again");
    }

  }

  const reset = () => {
    setZipcode("");
    setWeather(null);
    setPlaceholder("Enter Zip Code");
  }

  const kelvinToFarenheit = (num) => {

    let temp = (Math.floor(((num - 273) * 1.8) + 32));

    return temp;
  }

  return (
    <div>
      {weather ? (
        <section className="container">
          <h3 className="weather-h3">Weather for {weather.name}</h3>
          <div className="icon-box">
            <img className="weather-icon" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon"/>
          </div>
          <div className="description">{weather.weather[0].description}</div>
          <div className="temp">Temperature: {kelvinToFarenheit(weather.main.temp)}</div>
          <div className="feels-like">Feels Like: {kelvinToFarenheit(weather.main.feels_like)}</div>
          <div className="feels-like">Low: {kelvinToFarenheit(weather.main.temp_min)}</div>
          <div className="feels-like">High: {kelvinToFarenheit(weather.main.temp_max)}</div>
          <button className="btn m-top" onClick={() => reset()}>Go Back</button>
        </section>
      ):(
      <section className="container">
        <h1 className="app-label">Get Me Weather</h1>
       
          <label>Zip Code</label>
          <input
            id="input"
            type="text"
            placeholder={placeholder}
            className="form-input"
            onChange={e => setZipcode(e.target.value)}
          />
      
        <button
          className="btn"
          variant="primary"
          type="button"
          onClick={() => fetchRequest()}
        >
          Submit
        </button>
      </section>
      )}
      
    </div>
  );
};

export default ZipForm;