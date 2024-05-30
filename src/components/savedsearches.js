import React from 'react';

const SavedSearches = ({ savedSearches, onSelect, onRemove }) => {
  return (
    <div class="search">
      <h2>Saved Searches</h2>
      <ul>
        {savedSearches.map((city, index) => (
          <li key={index}>
            <img src="./images/save.png" height="25px" alt="Save Icon" className="save-icon" />
            <span onClick={() => onSelect(city)}>{city}</span>
            <button onClick={() => onRemove(city)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedSearches;
