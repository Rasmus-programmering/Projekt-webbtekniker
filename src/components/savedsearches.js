import React, { useEffect, useState } from 'react';

const SavedSearches = () => {
  const [savedSearches, setSavedSearches] = useState([]);

  // Hämta sparade sökningar från LocalStorage när komponenten laddas
  useEffect(() => {
    const searches = JSON.parse(localStorage.getItem('savedSearches')) || [];
    setSavedSearches(searches);
  }, []);

  // Hantera att välja en stad (t.ex. göra något med den valda sökningen)
  const handleSelect = (city) => {
    console.log('Selected city:', city);
  };

  // Hantera borttagning av en sparad sökning
  const handleRemove = (city) => {
    const updatedSearches = savedSearches.filter(search => search !== city);
    setSavedSearches(updatedSearches);
    localStorage.setItem('savedSearches', JSON.stringify(updatedSearches));
  };

  return (
    <div className="search">
      <h2>Saved Searches</h2>
      <ul>
        {savedSearches.map((city, index) => (
          <li key={index}>
            <img src="./images/save.png" height="25px" alt="Save Icon" className="save-icon" />
            <span className="city-name" onClick={() => handleSelect(city)}>{city}</span>
            <button className="remove-btn" onClick={() => handleRemove(city)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedSearches;
