import React from 'react';
import './search.scss';

const Search = () => {
  return (
    <form>
      <input
        type="text"
        className="search-input"
        placeholder="Airline, destination or flight#"
      />
      <button className="btn-search" type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;
