import React, { useState } from 'react';
import FlightsTable from '../flightsTable/FlightsTable';
import './boardContent.scss';

const BoardContent = ({ flights }) => {
  const [filteredStatus, setFilteredStatus] = useState('departures');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeButton, setActiveButton] = useState(0);

  const cutoffDate = new Date('2022-02-23');

  const handleChangeStatus = (type) => {
    setFilteredStatus(type);
  };

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  const handleDateButtonClick = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
    setActiveButton(days);
  };

  const getFormattedDate = (offsetDays) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + offsetDays);
    return date.toLocaleDateString();
  };

  const filteredFlights = flights.filter((flight) => {
    const flightDate = new Date(flight.departureDateExpected);

    if (filteredStatus === 'departures') {
      return flight.type === 'DEPARTURE' && flightDate <= selectedDate;
    } else if (filteredStatus === 'arrivals') {
      return (
        flight.type === 'ARRIVAL' &&
        flightDate <= selectedDate &&
        flightDate <= cutoffDate
      );
    }

    return false;
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

        {/* component */}
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
            <button
              onClick={() => handleDateButtonClick(-1)}
              className={`filter__date-button ${
                activeButton === -1 ? 'filter__date-button_current' : ''
              }`}
            >
              <p>{getFormattedDate(-1)}</p>
              <p>YESTERDAY</p>
            </button>
            <button
              onClick={() => handleDateButtonClick(0)}
              className={`filter__date-button ${
                activeButton === 0 ? 'filter__date-button_current' : ''
              }`}
            >
              <p>{getFormattedDate(0)}</p>
              <p>TODAY</p>
            </button>
            <button
              onClick={() => handleDateButtonClick(+1)}
              className={`filter__date-button ${
                activeButton === 1 ? 'filter__date-button_current' : ''
              }`}
            >
              <p>{getFormattedDate(+1)}</p>
              <p>TOMORROW</p>
            </button>
          </div>
        </div>
      </div>
      {selectedDate > cutoffDate ? (
        <h5 className="table__null">No flights</h5>
      ) : (
        <FlightsTable filteredFlights={filteredFlights} />
      )}
    </div>
  );
};

export default BoardContent;
