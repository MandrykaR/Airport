import React from 'react';
import './airportHeader.scss';

const links = [
  { href: '/lastNews', label: 'Last News' },
  { href: '/login', label: 'Login' },
];

const AirportHeader = () => {
  return (
    <header className="header">
      <a href="./" className="header__logo">
        <img src="/src/image/27638198_7302018.svg" />
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
