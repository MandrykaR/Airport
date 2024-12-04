import React, { useEffect, useState } from 'react';
import FlightsTable from '../flightsTable/FlightsTable';
import DateSelector from '../dateSelector/DateSelector';
import moment from 'moment';
import { useSearchParams } from 'react-router-dom';

import './boardContent.scss';

const BoardContent = ({ flights, type: propType, date: propDate }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeButton, setActiveButton] = useState(null);

  const [systemDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    propDate ? new Date(propDate) : new Date()
  );

  const cutoffDate = new Date('2022-02-23');

  const queryType = searchParams.get('type') || propType || 'departures';
  const queryDate =
    searchParams.get('date') ||
    (propDate ? propDate : moment().format('YYYY-MM-DD'));

  useEffect(() => {
    if (queryDate) {
      setSelectedDate(moment(queryDate, 'YYYY-MM-DD').toDate());
    }
  }, [queryDate]);

  const handleDateChange = (e) => {
    const dateValue = e.target.value;

    if (!dateValue) {
      const today = moment();
      setSelectedDate(today.toDate());
      setSearchParams({
        type: queryType,
        date: today.format('YYYY-MM-DD'),
      });
      return;
    }

    const newDate = moment(dateValue, 'YYYY-MM-DD');
    if (!newDate.isValid()) {
      console.error('Invalid date value:', dateValue);
      return;
    }

    setSelectedDate(newDate.toDate());
    setSearchParams({
      type: queryType,
      date: newDate.format('YYYY-MM-DD'),
    });
  };

  const handleDateButtonClick = (days) => {
    const newDate = moment(systemDate).add(days, 'days');

    if (!newDate.isValid()) {
      console.error('Invalid date after button click:', newDate);
      return;
    }

    setSelectedDate(newDate.toDate());
    setActiveButton(days);

    setSearchParams({
      type: queryType,
      date: newDate.format('YYYY-MM-DD'),
    });
  };

  const handleTypeChange = (type) => {
    setSearchParams({
      type,
      date: moment(selectedDate).format('YYYY-MM-DD'),
    });
  };

  const getFormattedDate = (offsetDays) => {
    return moment(systemDate).add(offsetDays, 'days').format('DD/MM');
  };

  const filteredFlights = flights.filter((flight) => {
    const flightDate = moment(flight.departureDateExpected, 'YYYY-MM-DD');

    if (queryType === 'departures') {
      return (
        flight.type === 'DEPARTURE' &&
        flightDate.isSameOrBefore(moment(selectedDate))
      );
    } else if (queryType === 'arrivals') {
      return (
        flight.type === 'ARRIVAL' &&
        flightDate.isSameOrBefore(moment(selectedDate)) &&
        flightDate.isSameOrBefore(moment(cutoffDate))
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
            onClick={() => handleTypeChange('departures')}
          >
            DEPARTURES
          </button>
          <button
            className={`filter__button ${
              queryType === 'arrivals' ? 'filter__button_current' : ''
            }`}
            onClick={() => handleTypeChange('arrivals')}
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
