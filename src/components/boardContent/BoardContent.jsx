import React, { useEffect, useState } from 'react';
import FlightsTable from '../flightsTable/FlightsTable';
import DateSelector from '../dateSelector/DateSelector';
import { useSearchParams } from 'react-router-dom';

import './boardContent.scss';

const BoardContent = ({ flights, type: propType, date: propDate }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeButton, setActiveButton] = useState(0);
  const [selectedDate, setSelectedDate] = useState(
    propDate ? new Date(propDate) : new Date()
  );
  const cutoffDate = new Date('2022-02-23');

  const queryType = searchParams.get('type') || propType || 'departures';
  const queryDate =
    searchParams.get('date') ||
    (propDate ? propDate : new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (queryDate) {
      setSelectedDate(new Date(queryDate));
    }
  }, [queryDate]);

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setSelectedDate(newDate);
    setSearchParams({
      type: queryType,
      date: newDate.toISOString().split('T')[0],
    });
  };

  const handleDateButtonClick = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
    setActiveButton(days);
    setSearchParams({
      type: queryType,
      date: newDate.toISOString().split('T')[0],
    });
  };

  const getFormattedDate = (offsetDays) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + offsetDays);
    return date.toISOString().split('T')[0];
  };

  const filteredFlights = flights.filter((flight) => {
    const flightDate = new Date(flight.departureDateExpected);

    if (queryType === 'departures') {
      return flight.type === 'DEPARTURE' && flightDate <= selectedDate;
    } else if (queryType === 'arrivals') {
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
              queryType === 'departures' ? 'filter__button_current' : ''
            }`}
            onClick={() =>
              setSearchParams({
                type: 'departures',
                date: selectedDate.toISOString().split('T')[0],
              })
            }
          >
            DEPARTURES
          </button>
          <button
            className={`filter__button ${
              queryType === 'arrivals' ? 'filter__button_current' : ''
            }`}
            onClick={() =>
              setSearchParams({
                type: 'arrivals',
                date: selectedDate.toISOString().split('T')[0],
              })
            }
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
