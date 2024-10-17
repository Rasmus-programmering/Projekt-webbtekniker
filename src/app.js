import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/searchbar';
import WeatherDisplay from './components/weatherdisplay';
import SavedSearches from './components/savedsearches';
import './index.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); // Nytt state för felmeddelanden

  // Använd initialisering för att hämta data från localStorage
  const [savedSearches, setSavedSearches] = useState(() => {
    const saved = localStorage.getItem('savedSearches');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCelsius, setIsCelsius] = useState(true);

  // Spara savedSearches och favorites till localStorage varje gång de ändras
  useEffect(() => {
    localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
  }, [savedSearches]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Hämtar koordinater för staden eller platsen
  const getCityCoordinates = async (city) => {
    try {
      const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search`, {
        params: { name: city },
      });

      // Om inga resultat finns
      if (!response.data.results || response.data.results.length === 0) {
        throw new Error(`Location not found for "${city}". Please check the spelling or try another location.`);
      }

      // Kontrollera om det returnerade platsnamnet matchar användarens input
      const location = response.data.results[0];
      if (!location.name.toLowerCase().includes(city.toLowerCase())) {
        throw new Error(`Location "${city}" does not match any valid place.`);
      }

      return location;  // Returnera den första träffen om resultat finns och är giltigt
    } catch (error) {
      console.error(error);
      throw new Error('Could not retrieve location. Please try again later or check your network connection.');
    }
  };

  // Hämtar vädret baserat på stad/plats
  const getWeather = async (city) => {
    try {
      setErrorMessage(null);  // Återställ felmeddelandet innan ny förfrågan
      const cityData = await getCityCoordinates(city); // Få stadens koordinater

      const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: cityData.latitude,
          longitude: cityData.longitude,
          hourly: 'temperature_2m',
          current_weather: true,
        },
      });

      const temperatures = response.data.hourly.temperature_2m;
      const currentTemperature = response.data.current_weather.temperature;
      const weatherCondition = response.data.current_weather.weathercode;
      const averageTemperature = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;

      setWeatherData({
        city: cityData.name,
        currentTemperature: isCelsius ? currentTemperature : celsiusToFahrenheit(currentTemperature),
        averageTemperature: isCelsius ? averageTemperature : celsiusToFahrenheit(averageTemperature),
        weatherCondition,
      });

      setErrorMessage(null);  // Om vädret hämtas korrekt, rensa eventuellt tidigare felmeddelande

      // Spara endast om platsen är giltig
      if (!savedSearches.includes(city)) {
        setSavedSearches([...savedSearches, city]);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);  // Visa felmeddelandet i UI:t
    }
  };

  // Hämtar väder för den aktuella platsen (baserat på geolocation)
  const getCityName = async (latitude, longitude) => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
        params: {
          lat: latitude,
          lon: longitude,
          format: 'json'
        }
      });
      return response.data.address.city || response.data.address.town || response.data.address.village || 'Unknown location';
    } catch (error) {
      console.error(error);
      return 'Unknown location';
    }
  };

  const getWeatherForCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const cityName = await getCityName(latitude, longitude);
        try {
          const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
              latitude: latitude,
              longitude: longitude,
              hourly: 'temperature_2m',
              current_weather: true,
            },
          });

          const temperatures = response.data.hourly.temperature_2m;
          const currentTemperature = response.data.current_weather.temperature;
          const weatherCondition = response.data.current_weather.weathercode;
          const averageTemperature = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;

          setWeatherData({
            city: cityName,
            currentTemperature: isCelsius ? currentTemperature : celsiusToFahrenheit(currentTemperature),
            averageTemperature: isCelsius ? averageTemperature : celsiusToFahrenheit(averageTemperature),
            weatherCondition,
          });

          setErrorMessage(null); // Nollställ felmeddelandet om allt går bra
        } catch (error) {
          console.error(error);
          setErrorMessage('An error occurred while fetching weather data. Please try again later.');
        }
      }, (error) => {
        console.error(error);
        setErrorMessage('An error occurred while fetching your location. Please try again later.');
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
      setErrorMessage('Geolocation is not supported by this browser.');
    }
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
    if (weatherData && !weatherData.error) {
      setWeatherData({
        ...weatherData,
        currentTemperature: isCelsius ? celsiusToFahrenheit(weatherData.currentTemperature) : fahrenheitToCelsius(weatherData.currentTemperature),
        averageTemperature: isCelsius ? celsiusToFahrenheit(weatherData.averageTemperature) : fahrenheitToCelsius(weatherData.averageTemperature),
      });
    }
  };

  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9 / 5) + 32;
  };

  const fahrenheitToCelsius = (fahrenheit) => {
    return (fahrenheit - 32) * 5 / 9;
  };

  const removeSavedSearch = (city) => {
    setSavedSearches(savedSearches.filter(search => search !== city));
  };

  const addFavorite = (city) => {
    if (!favorites.includes(city)) {
      setFavorites([...favorites, city]);
    }
  };

  const removeFavorite = (city) => {
    setFavorites(favorites.filter(fav => fav !== city));
  };

  return (
    <div className="container">
      <h1>Find the current and average temperature in a city, town or place</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}  {/* Visa felmeddelandet */}
      <div className="change-temp-btn">
        <button onClick={toggleTemperatureUnit}>{isCelsius ? 'Fahrenheit' : 'Celsius'}</button>
      </div>
      <SearchBar onSearch={getWeather} />
      <button onClick={getWeatherForCurrentLocation}>Show Weather at My Location</button>
      <WeatherDisplay weatherData={weatherData} isCelsius={isCelsius} onAddFavorite={addFavorite} />
      <SavedSearches savedSearches={savedSearches} onSelect={getWeather} onRemove={removeSavedSearch} />
      <div className="favorites">
        <h2>Favorites</h2>
        <ul>
          {favorites.map((city, index) => (
            <li key={index}>
              <img src="./images/star.png" height="20px" alt="Star Icon" className="star-icon" />
              <span className="city-name" onClick={() => getWeather(city)}>{city}</span>
              <button className="remove-btn" onClick={() => removeFavorite(city)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
