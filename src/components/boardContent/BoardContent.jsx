import React from 'react';
import './boardContent.scss';

const BoardContent = ({ flights }) => {
  return (
    <div className="board__content">
      <div className="filter">
        <div className="filter__buttons-wrapper">
          <button className="filter__button">DEPARTURES</button>
          <button className="filter__button">ARRIVALS</button>
        </div>

        <div className="filter__date-wrapper">
          <label
            htmlFor="filter-date-input"
            className="filter__date-input-label"
          >
            <p>26/09</p>
            <input
              type="date"
              className="filter__date-input"
              id="filter-date-input"
            />
          </label>

          {/*convert to a component */}
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

      <div className="table">
        {flights.length > 0 ? (
          <ul>
            {flights.map((flight) => (
              <li key={flight.id}>
                <img
                  src={flight.airlineLogo}
                  alt={flight.airlineName}
                  width="50"
                  height="50"
                />
                Flight: {flight.codeShare} | Airline: {flight.airlineName}
                <br />
                From: {flight.departureCity} | To: {flight.arrivalCity}
                <br />
                Expected Departure:
                {new Date(flight.departureDateExpected).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <h5 className="table__null">No Flights</h5>
        )}
      </div>
    </div>
  );
};

export default BoardContent;
