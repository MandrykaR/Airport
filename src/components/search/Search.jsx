import React, { useState } from 'react';
import { fetchFlights } from '../../flightsSlice';
import './search.scss';
import { useDispatch, useSelector } from 'react-redux';

const Search = ({ setFilteredFlights }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const flights = useSelector((state) => state.flights.data);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    dispatch(fetchFlights());

    const filtered = flights.filter((flight) => {
      return (
        flight.departureCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flight.arrivalCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        flight.codeShare.includes(searchTerm)
      );
    });

    console.log(filtered);

    setFilteredFlights(filtered);
  };

  return (
    <div className="search">
      <h2 className="search__title">FLIGHT SEARCH</h2>
      <div className="search__wrapper">
        <form onSubmit={handleSearch}>
          <input
            className="search__input"
            type="search"
            placeholder="Flight № ..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <input type="submit" className="search__button" value="SEARCH" />
        </form>
      </div>
    </div>
  );
};

export default Search;
