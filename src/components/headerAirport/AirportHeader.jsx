import React from 'react';
import './airportHeader.scss';

const AirportHeader = () => {
  return (
    <header className="header">
      <a href="./" className="header__logo">
        <img
          className="header__logo--air"
          src="https://chic-banoffee-85a54a.netlify.app/images/header/logo.webp"
          alt="Logo"
        />
      </a>
      <nav className="header__navigation">
        <ul className="header__links">
          <li className="header__link">
            <a href="./">For passengers</a>
          </li>
          <li className="header__link">
            <a href="./">IEV Services</a>
          </li>
          <li className="header__link">
            <a href="./">VIP</a>
          </li>
          <li className="header__link">
            <a href="./">Corporate</a>
          </li>
          <li className="header__link">
            <a href="./">Press Room</a>
          </li>
          <li className="header__link">
            <a href="./">EN</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AirportHeader;
