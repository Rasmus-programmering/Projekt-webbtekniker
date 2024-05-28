import React from 'react';

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) return <p>No data available</p>;

  return (
    <div>
      <h2>{weatherData.city}</h2>
      <p>Average temperature: {weatherData.temperature}°C</p>
    </div>
  );
};

export default WeatherDisplay;
