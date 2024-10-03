import React from 'react';

const SavedSearches = ({ savedSearches, onSelect, onRemove }) => {
  return (
    <div className="search">
      <h2>Search History</h2>
      <ul>
        {savedSearches.map((city, index) => (
          <li key={index}>
            <img src="./images/save.png" height="25px" alt="Save Icon" className="save-icon" />
            <span className="city-name" onClick={() => onSelect(city)}>{city}</span>
            <button className="remove-btn" onClick={() => onRemove(city)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedSearches;

