// Layout.js (using React Router's Outlet)
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './NavListMenu';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
