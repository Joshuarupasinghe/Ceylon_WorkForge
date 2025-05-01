// Layout.js (using React Router's Outlet)
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './NavListMenu';
import Footer from './footer'; // ← import your Footer component

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
