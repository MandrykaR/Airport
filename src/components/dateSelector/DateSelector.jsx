import React from 'react';
import moment from 'moment';

import './dateSelector.scss';

const DateSelector = ({
  selectedDate,
  handleDateChange,
  handleDateButtonClick,
  getFormattedDate,
  activeButton,
}) => {
  const formattedDate = selectedDate
    ? moment(selectedDate).format('YYYY-MM-DD')
    : '';

  return (
    <div className="filter__date-wrapper">
      <label htmlFor="filter-date-input" className="filter__date-input-label">
        <p>{formattedDate}</p>
        <input
          type="date"
          className="filter__date-input"
          id="filter-date-input"
          value={formattedDate}
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
          onClick={() => handleDateButtonClick(1)}
          className={`filter__date-button ${
            activeButton === 1 ? 'filter__date-button_current' : ''
          }`}
        >
          <p>{getFormattedDate(1)}</p>
          <p>TOMORROW</p>
        </button>
      </div>
    </div>
  );
};

export default DateSelector;
  