import React, { useEffect, useState } from 'react';
import Search from '../search/Search';
import BoardContent from '../boardContent/BoardContent';
import { useSearchParams } from 'react-router-dom';

const BoardAir = () => {
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const queryType = searchParams.get('type') || 'arrivals';
  const date =
    searchParams.get('date') || new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (!searchParams.has('type') || !searchParams.has('date')) {
      return;
    }
  }, [searchParams]);

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
