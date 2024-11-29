import React, { useEffect, useState } from 'react';
import FlightsTable from '../flightsTable/FlightsTable';
import DateSelector from '../dateSelector/DateSelector';
import { useSearchParams } from 'react-router-dom';

import './boardContent.scss';

const BoardContent = ({ flights, type: propType, date: propDate }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const todayDate = new Date();
  const defaultDate = todayDate.toISOString().split('T')[0];

  const queryType = searchParams.get('type') || propType || 'departures';
  const queryDate = searchParams.get('date') || propDate || defaultDate;

  const [selectedDate, setSelectedDate] = useState(() => {
    const parsedDate = new Date(queryDate);
    return isNaN(parsedDate) ? todayDate : parsedDate;
  });

  useEffect(() => {
    if (queryDate) {
      const parsedDate = new Date(queryDate);
      if (!isNaN(parsedDate)) {
        setSelectedDate(parsedDate);
      }
    }
  }, [queryDate]);

  const handleDateChange = (e) => {
    const dateValue = e.target.value;

    if (!dateValue) {
      setSelectedDate(new Date());
      setSearchParams({
        type: queryType,
        date: defaultDate,
      });
      return;
    }

    const newDate = new Date(dateValue);
    if (isNaN(newDate)) {
      console.error('Invalid date value:', dateValue);
      return;
    }

    setSelectedDate(newDate);
    setSearchParams({
      type: queryType,
      date: newDate.toISOString().split('T')[0],
    });
  };

  const handleDateButtonClick = (days) => {
    let newDate;

    if (days === 0) {
      newDate = new Date();
    } else {
      newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() + days);
    }

    if (isNaN(newDate)) {
      console.error('Invalid date after button click:', newDate);
      return;
    }

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

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');

    return `${day}/${month}`;
  };

  const filteredFlights = flights.filter((flight) => {
    const flightDate = new Date(flight.departureDateExpected);
    if (isNaN(flightDate)) {
      console.error('Invalid flight date:', flight.departureDateExpected);
      return false;
    }

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
              selectedDate
                ? setSearchParams({
                    type: 'departures',
                    date: selectedDate.toISOString().split('T')[0],
                  })
                : console.error('Selected date is null')
            }
          >
            DEPARTURES
          </button>
          <button
            className={`filter__button ${
              queryType === 'arrivals' ? 'filter__button_current' : ''
            }`}
            onClick={() =>
              selectedDate
                ? setSearchParams({
                    type: 'arrivals',
                    date: selectedDate.toISOString().split('T')[0],
                  })
                : console.error('Selected date is null')
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
        <div className="filter__title">
          <h5 className="filter__message filter__message--null">No flights</h5>
        </div>
      ) : (
        <FlightsTable filteredFlights={filteredFlights} />
      )}
    </div>
  );
};

export default BoardContent;
