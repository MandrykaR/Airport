import React, { useState, useEffect } from 'react';
import { fetchFlights } from '../../redux/flightsSlice';
import './search.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const Search = ({ setFilteredFlights }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const flights = useSelector((state) => state.flights.data);
  const loadingStatus = useSelector((state) => state.flights.loadingStatus);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    const params = new URLSearchParams(location.search);
    if (newSearchTerm) {
      params.set('search', newSearchTerm);
    } else {
      params.delete('search');
    }
    navigate({ search: params.toString() });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (loadingStatus === 'succeeded') {
      const searchTermLower = searchTerm.toLowerCase();

      const filtered = flights.filter((flight) =>
        [
          flight.departureCity,
          flight.arrivalCity,
          flight.codeShare,
          new Date(flight.arrivalDateExpected).toLocaleString(),
        ]
          .map((field) => field?.toLowerCase())
          .some((field) => field?.includes(searchTermLower))
      );

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
