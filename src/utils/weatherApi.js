// Weather API functions for the WTWR application

import { apiKey } from "./constants";

// Base URL for OpenWeatherMap API
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

// Function to check if the response is ok
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

// Function to parse weather data from API response
const parseWeatherData = (data) => {
  const parsedData = { temp: {}, condition: {} };
  
  parsedData.city = data.name;
  parsedData.temp.F = Math.round(data.main.temp);
  parsedData.temp.C = Math.round((data.main.temp - 32) * (5 / 9));
  
  // Include weather condition data
  if (data.weather && data.weather.length > 0) {
    parsedData.condition = {
      id: data.weather[0].id,
      main: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon
    };
  }
  
  return parsedData;
};

// Function to get weather data by coordinates
export const getWeather = (latitude, longitude) => {
  const url = `${baseUrl}?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
  
  return fetch(url)
    .then(checkResponse)
    .then(parseWeatherData);
};


