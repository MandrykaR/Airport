import React from 'react';
import './flightsTable.scss';

const FlightsTable = ({ filteredFlights }) => {
  return (
    <div className="table">
      {filteredFlights.length > 0 ? (
        <table className="flights-table">
          <thead>
            <tr>
              <th>Terminal</th>
              <th>Schedule</th>
              <th>Purpose</th>
              <th>Status</th>
              <th>Airline</th>
              <th>Flight</th>
            </tr>
          </thead>
          <tbody>
            {filteredFlights.slice(0, 5).map((flight) => (
              <tr key={flight.id}>
                <td>
                  <span className={`terminal ${flight.terminal}`}>
                    {flight.terminal}
                  </span>
                </td>
                <td>
                  {new Date(flight.departureDateExpected).toLocaleTimeString()}
                </td>
                <td>{flight.arrivalCity}</td>
                <td>
                  Flew out
                  {new Date(flight.departureDateExpected).toLocaleTimeString()}
                </td>
                <td>
                  <img
                    src={flight.airlineLogo}
                    alt={flight.airlineName}
                    className="airline-logo"
                  />
                  {flight.airlineName}
                </td>
                <td>{flight.codeShare}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="filter__title">
          <h5 className="filter__message filter__message--null">No flights</h5>
        </div>
      )}
    </div>
  );
};

export default FlightsTable;
