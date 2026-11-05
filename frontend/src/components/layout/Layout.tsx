import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div id="page" className="site-wrapper">
      <Navbar />
      <div id="content" className="site-content" style={{ paddingTop: isHome ? '0px' : '90px' }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
