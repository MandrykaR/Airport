import React from 'react';
import './search.scss';

const Search = () => {
  return (
    <div className="search">
      <h2 className="search__title">FLIGHT SEARCH</h2>
      <div className="search__wrapper">
        <form>
          <input
            className="search__input"
            type="search"
            placeholder="Flight № ..."
            value=""
          />
          <input type="submit" class="search__button" value="SEARCH" />
        </form>
      </div>
    </div>
  );
};

export default Search;
