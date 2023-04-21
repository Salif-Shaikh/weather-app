import React, { useState } from "react";
import axios from "axios";
import "../css/WeatherCard.css";

const API_KEY = "e1a1c43ee2e1d1a35171926ca6bf5bb9"; // Api Initiation key

const WeatherCard = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleCityChange = e => {
    setCity(e.target.value);
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setError("City not found");
      setWeatherData(null);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter a city name"
        />
        <button type="submit">Search</button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {weatherData && (
        <div className="weather-data">
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} &#8451;</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
