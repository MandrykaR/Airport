import React from 'react';
import './buttonFlights.scss';

const ButtonFlights = () => {
  return (
    <div className="view-flights">
      <button className="view-departures">ALL DEPARTURES</button>
      <button className="view-arrivals">ALL ARRIVALS</button>
    </div>
  );
};

export default ButtonFlights;
