import React from 'react';
import Search from '../search/Search';
import ButtonFlights from '../buttonFlights/ButtonFlights';

import './flights.scss';

const FlightSearch = () => {
  return (
    <section className="main-search">
      <h2 className="main-search__title">FLIGHT SEARCH</h2>
      <Search />
      <ButtonFlights />
    </section>
  );
};

export default FlightSearch;
