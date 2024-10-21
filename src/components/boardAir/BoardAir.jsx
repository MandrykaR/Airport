import React, { useEffect, useState } from 'react';
import Search from '../search/Search';
import BoardContent from '../boardContent/BoardContent';
import { useSearchParams } from 'react-router-dom';

const BoardAir = ({ type }) => {
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const queryType = searchParams.get('type') || 'arrivals';
  const date =
    searchParams.get('date') ||
    new Date().toLocaleDateString().split('/').join('-');

  useEffect(() => {
    if (!searchParams.get('type')) {
      setSearchParams({ type: 'arrivals', date });
    }
  }, [searchParams, setSearchParams, date, type]);

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
