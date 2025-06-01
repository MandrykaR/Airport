import React from 'react';
import { useLocation } from 'react-router-dom';
import AirportHeader from './components/headerAirport/AirportHeader';
import FooterAirport from './components/footerAirport/FooterAirport';
import './appLayout.scss';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const hideFooterRoutes = ['/login', '/auth/reset-password', '/admin'];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <div className="app-layout">
      <AirportHeader />
      <main className="app-main">{children}</main>
      {!shouldHideFooter && <FooterAirport />}
    </div>
  );
};

export default AppLayout;
