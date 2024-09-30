import React, { useState, useEffect } from 'react';
import { fetchFlights } from '../../flightsSlice';
import './search.scss';
import { useDispatch, useSelector } from 'react-redux';

const Search = ({ setFilteredFlights }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [initialFlights, setInitialFlights] = useState([]);

  const dispatch = useDispatch();
  const flights = useSelector((state) => state.flights.data);
  const loadingStatus = useSelector((state) => state.flights.loadingStatus);

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  useEffect(() => {
    if (loadingStatus === 'succeeded') {
      setFilteredFlights(flights);
      setInitialFlights(flights);
    }
  }, [flights, loadingStatus, setFilteredFlights]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (loadingStatus === 'succeeded') {
      const filtered = initialFlights.filter((flight) => {
        return (
          (flight.departureCity?.toLowerCase() || '').includes(
            searchTerm.toLowerCase()
          ) ||
          (flight.arrivalCity?.toLowerCase() || '').includes(
            searchTerm.toLowerCase()
          ) ||
          (flight.codeShare || '').includes(searchTerm) ||
          new Date(flight.arrivalDateExpected)
            .toLocaleString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      });
      setFilteredFlights(filtered);
    }
  };

  return (
    <div className="search">
      <h2 className="search__title">FLIGHT SEARCH</h2>
      <div className="search__wrapper">
        <form onSubmit={handleSearch}>
          <input
            className="search__input"
            type="search"
            placeholder="Flight № or City ..."
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
