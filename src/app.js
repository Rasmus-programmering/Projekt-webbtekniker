import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/searchbar';
import WeatherDisplay from './components/weatherdisplay';
import SavedSearches from './components/savedsearches';
import './index.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [savedSearches, setSavedSearches] = useState([]);

  const getCityCoordinates = async (city) => {
    try {
      const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search`, {
        params: {
          name: city,
        },
      });
      return response.data.results[0];
    } catch (error) {
      console.error(error);
    }
  };

  const getWeather = async (city) => {
    try {
      const cityData = await getCityCoordinates(city);
      const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: cityData.latitude,
          longitude: cityData.longitude,
          hourly: 'temperature_2m',
        },
      });
      setWeatherData({
        city: cityData.name,
        temperature: response.data.hourly.temperature_2m[0],
      });
      if (!savedSearches.includes(city)) {
        setSavedSearches([...savedSearches, city]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <SearchBar onSearch={getWeather} />
      <WeatherDisplay weatherData={weatherData} />
      <SavedSearches savedSearches={savedSearches} onSelect={getWeather} />
    </div>
  );
};

export default App;
