import React, { useState } from 'react';
import Search from '../search/Search';
import BoardContent from '../boardContent/BoardContent';

const BoardAir = () => {
  const [filteredFlights, setFilteredFlights] = useState([]);

  return (
    <main>
      <div className="container">
        <Search setFilteredFlights={setFilteredFlights} />
        <BoardContent flights={filteredFlights} />
      </div>
    </main>
  );
};

export default BoardAir;
