import React, { useEffect, useState } from 'react';
import FlightsTable from '../flightsTable/FlightsTable';
import DateSelector from '../dateSelector/DateSelector';
import moment from 'moment';
import { useSearchParams } from 'react-router-dom';
import './boardContent.scss';

const BoardContent = ({ flights, type: propType, date: propDate }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedDate, setSelectedDate] = useState(
    propDate ? moment(propDate, 'YYYY-MM-DD').toDate() : new Date()
  );

  const [activeButton, setActiveButton] = useState(null);

  const queryType = searchParams.get('type') || propType || 'departures';
  const queryDate =
    searchParams.get('date') ||
    (propDate ? propDate : moment().format('YYYY-MM-DD'));

  useEffect(() => {
    setSelectedDate(moment(queryDate, 'YYYY-MM-DD').toDate());
  }, [queryDate]);

  const handleDateChange = (e) => {
    const value = e.target.value;
    const newDate = moment(value || undefined, 'YYYY-MM-DD');
    if (!newDate.isValid()) return;

    setSelectedDate(newDate.toDate());
    setSearchParams({ type: queryType, date: newDate.format('YYYY-MM-DD') });
  };

  const handleDateButtonClick = (days) => {
    const newDate = moment().add(days, 'days');
    setSelectedDate(newDate.toDate());
    setActiveButton(days);
    setSearchParams({ type: queryType, date: newDate.format('YYYY-MM-DD') });
  };

  const handleTypeChange = (type) => {
    setSearchParams({ type, date: moment(selectedDate).format('YYYY-MM-DD') });
  };

  const getFormattedDate = (d) => moment().add(d, 'days').format('DD/MM');

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

      {flights.length === 0 ? (
        <div className="filter__title">
          <h5 className="filter__message filter__message--null">No flights</h5>
        </div>
      ) : (
        <FlightsTable filteredFlights={flights} />
      )}
    </div>
  );
};

export default BoardContent;
