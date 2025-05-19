import React from 'react';
import './footerAirport.scss';

const FooterAirport = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h2>Airport</h2>
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        <div className="footer-links">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/lastNews">Last News</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default FooterAirport;
