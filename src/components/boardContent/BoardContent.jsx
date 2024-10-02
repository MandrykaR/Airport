import React, { useState } from 'react';
import FlightsTable from '../flightsTable/FlightsTable';
import './boardContent.scss';

const BoardContent = ({ flights }) => {
  const [filteredStatus, setFilteredStatus] = useState('departures');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleChangeStatus = (type) => {
    setFilteredStatus(type);
  };

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  const cutoffDate = new Date('2022-02-23');

  const filteredFlights = flights.filter((flight) => {
    const flightDate = new Date(flight.departureDateExpected);

    return filteredStatus === 'departures'
      ? flight.type === 'DEPARTURE'
      : flight.type === 'ARRIVAL' &&
          flightDate <= selectedDate &&
          selectedDate <= cutoffDate;
  });

  return (
    <div className="board__content">
      <div className="filter">
        <div className="filter__buttons-wrapper">
          <button
            className={`filter__button ${
              filteredStatus === 'departures' ? 'filter__button_current' : ''
            }`}
            onClick={() => handleChangeStatus('departures')}
          >
            DEPARTURES
          </button>
          <button
            className={`filter__button ${
              filteredStatus === 'arrivals' ? 'filter__button_current' : ''
            }`}
            onClick={() => handleChangeStatus('arrivals')}
          >
            ARRIVALS
          </button>
        </div>

        <div className="filter__date-wrapper">
          <label
            htmlFor="filter-date-input"
            className="filter__date-input-label"
          >
            <p>{selectedDate.toLocaleDateString()}</p>
            <input
              type="date"
              className="filter__date-input"
              id="filter-date-input"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={handleDateChange}
            />
          </label>

          <div className="filter__date-buttons">
            <div className="filter__date-button filter__date-button_current">
              <p>26/09</p>
              <p>YESTERDAY</p>
            </div>
            <div className="filter__date-button">
              <p>27/09</p>
              <p>TODAY</p>
            </div>
            <div className="filter__date-button">
              <p>28/09</p>
              <p>TOMORROW</p>
            </div>
          </div>
        </div>
      </div>
      {selectedDate > cutoffDate ? (
        <h5 className="table__null">
          No flights
        </h5>
      ) : (
        <FlightsTable filteredFlights={filteredFlights} />
      )}
    </div>
  );
};

export default BoardContent;
