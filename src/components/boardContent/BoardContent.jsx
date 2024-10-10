import React, { useState } from 'react';
import FlightsTable from '../flightsTable/FlightsTable';
import DateSelector from '../dateSelector/DateSelector';
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

        <DateSelector
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
          handleDateButtonClick={handleDateButtonClick}
          getFormattedDate={getFormattedDate}
          activeButton={activeButton}
        />
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
