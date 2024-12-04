import React from 'react';
import './airportHeader.scss';

const links = [
  { href: './', label: 'For passengers' },
  { href: './', label: 'IEV Services' },
  { href: './', label: 'VIP' },
  { href: './', label: 'Corporate' },
  { href: './', label: 'Press Room' },
  { href: './', label: 'EN' },
];

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
          {links.map((link, index) => (
            <li key={index} className="header__link">
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default AirportHeader;
