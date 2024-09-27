import React from 'react';
import './boardContent.scss';

const BoardContent = () => {
  return (
    <div className="board__content">
      <div className="filter">
        <div className="filter__buttons-wrapper">
          <button className="filter__button">DEPARTURES</button>
          <button className="filter__button">ARRIVALS</button>
        </div>

        <div className="filter__date-wrapper"></div>
      </div>
    </div>
  );
};

export default BoardContent;
