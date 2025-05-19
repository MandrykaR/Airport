import React from 'react';

import './search.scss';

const Search = ({ searchTerm, onSearchChange }) => {
  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="search">
      <h2 className="search__title">FLIGHT SEARCH</h2>
      <div className="search__wrapper">
        <div>
          <input
            className="search__input"
            type="search"
            placeholder="Flight № or City ..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <input type="submit" className="search__button" value="SEARCH" />
        </div>
      </div>
    </div>
  );
};

export default Search;
