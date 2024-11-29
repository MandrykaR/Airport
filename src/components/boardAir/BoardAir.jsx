import React, { useEffect, useState } from 'react';
import Search from '../search/Search';
import BoardContent from '../boardContent/BoardContent';
import { useSearchParams } from 'react-router-dom';

const BoardAir = ({ type }) => {
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const queryType = searchParams.get('type') || 'arrivals';
  const todayDate = new Date();
  const defaultDate = todayDate.toISOString().split('T')[0]; // YYYY-MM-DD

  const date = searchParams.get('date') || defaultDate;

  useEffect(() => {
    if (!searchParams.get('type') || !searchParams.get('date')) {
      setSearchParams({ type: 'arrivals', date: defaultDate });
    }
  }, [searchParams, setSearchParams, defaultDate]);

  return (
    <main>
      <div className="container">
        <Search setFilteredFlights={setFilteredFlights} />
        <BoardContent flights={filteredFlights} type={queryType} date={date} />
      </div>
    </main>
  );
};

export default BoardAir;
