import React, { useEffect, useState } from 'react';
import Search from '../search/Search';
import BoardContent from '../boardContent/BoardContent';
import { useNavigate, useParams } from 'react-router-dom';

const BoardAir = ({ type }) => {
  const [filteredFlights, setFilteredFlights] = useState([]);
  const navigate = useNavigate();
  const { date } = useParams();

  useEffect(() => {
    if (!type) {
      navigate('/arrivals');
    }
  }, [type, navigate]);

  return (
    <main>
      <div className="container">
        <Search setFilteredFlights={setFilteredFlights} />
        <BoardContent flights={filteredFlights} type={type} date={date} />
      </div>
    </main>
  );
};

export default BoardAir;
