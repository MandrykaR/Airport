import React from 'react';
import { useLocation } from 'react-router-dom';
import AirportHeader from './components/headerAirport/AirportHeader';
import FooterAirport from './components/footerAirport/FooterAirport';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const hideFooterRoutes = ['/login', '/auth/reset-password', '/admin'];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <AirportHeader />
      {children}
      {!shouldHideFooter && <FooterAirport />}
    </>
  );
};

export default AppLayout;
