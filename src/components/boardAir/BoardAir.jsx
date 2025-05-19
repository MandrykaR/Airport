import React, { useEffect, useState } from 'react';
import Search from '../search/Search';
import BoardContent from '../boardContent/BoardContent';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFlights } from '../../redux/flightsSlice';

import moment from 'moment';

const BoardAir = () => {
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const flights = useSelector((state) => state.flights.data);

  const queryType = searchParams.get('type') || 'arrivals';
  const queryDate =
    searchParams.get('date') || moment.utc().format('YYYY-MM-DD');

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  useEffect(() => {
    const search = searchParams.get('search') || '';
    setSearchTerm(search);
  }, [searchParams]);

  useEffect(() => {
    if (!flights) return;

    const selectedDate = moment.utc(queryDate, 'YYYY-MM-DD');
    const searchLower = searchTerm.toLowerCase();

    const filteredFlights = flights.filter((flight) => {
      const departureDate = flight.departureDateExpected
        ? moment.utc(flight.departureDateExpected)
        : null;
      const arrivalDate = flight.arrivalDateExpected
        ? moment.utc(flight.arrivalDateExpected)
        : null;

      const matchesType =
        queryType.toLowerCase() === 'departures'
          ? flight.type === 'DEPARTURE'
          : flight.type === 'ARRIVAL';

      const matchesDate =
        (departureDate && departureDate.isSame(selectedDate, 'day')) ||
        (arrivalDate && arrivalDate.isSame(selectedDate, 'day'));

      const cityFilter = [flight.departureCity, flight.arrivalCity]
        .filter(Boolean)
        .map((c) => c.toLowerCase())
        .some((city) => city.includes(searchLower));

      return matchesType && matchesDate && cityFilter;
    });

    setFilteredFlights(filteredFlights);
  }, [flights, queryType, queryDate, searchTerm]);

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);

    const params = new URLSearchParams(location.search);
    if (newSearchTerm) params.set('search', newSearchTerm);
    else params.delete('search');

    navigate({ search: params.toString() }, { replace: true });
  };

  return (
    <main>
      <div className="container">
        <Search searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        <BoardContent
          flights={filteredFlights}
          type={queryType}
          date={queryDate}
        />
      </div>
    </main>
  );
};

export default BoardAir;
