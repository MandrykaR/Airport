import React, { useEffect, useState } from 'react';
import FlightsTable from '../flightsTable/FlightsTable';
import DateSelector from '../dateSelector/DateSelector';
import { useNavigate } from 'react-router-dom';

import './boardContent.scss';

const BoardContent = ({ flights, type, date }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(
    date ? new Date(date) : new Date()
  );
  const [activeButton, setActiveButton] = useState(0);

  const cutoffDate = new Date('2022-02-23');

  useEffect(() => {
    if (date) {
      setSelectedDate(new Date(date.split('-').join('-')));
    }
  }, [date]);

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setSelectedDate(newDate);
    navigate(`/${type}/${newDate.toLocaleDateString().split('/').join('-')}`);
  };

  const handleDateButtonClick = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
    setActiveButton(days);
    navigate(`/${type}/${newDate.toLocaleDateString().split('/').join('-')}`);
  };

  const getFormattedDate = (offsetDays) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + offsetDays);
    return date.toLocaleDateString();
  };

  const filteredFlights = flights.filter((flight) => {
    const flightDate = new Date(flight.departureDateExpected);

    if (type === 'departures') {
      return flight.type === 'DEPARTURE' && flightDate <= selectedDate;
    } else if (type === 'arrivals') {
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
              type === 'departures' ? 'filter__button_current' : ''
            }`}
            onClick={() => navigate('/departures')}
          >
            DEPARTURES
          </button>
          <button
            className={`filter__button ${
              type === 'arrivals' ? 'filter__button_current' : ''
            }`}
            onClick={() => navigate('/arrivals')}
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
