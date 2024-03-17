import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import useAuth from '../../../hooks/useAuth';

export const PrivateLayout = () => {
  const { auth, loading } = useAuth();
  const [sidebarActive, setSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const handleLinkClick = () => {
    // Oculta el sidebar cuando se hace clic en un enlace dentro del sidebar
    setSidebarActive(false);
  };

  return (
    <>
      <div id="wrapper">
        <div id="main">
          <div className="inner">
            <Header />
            {auth._id ? <Outlet /> : <Navigate to="/publicaciones" />}
          </div>
        </div>

        <div id="sidebar" className={sidebarActive ? 'active' : 'inactive'}>
          <div className="inner">
            <Sidebar onLinkClick={handleLinkClick} />
            <Footer />
          </div>
          <Link to="#" className="toggle" onClick={toggleSidebar}>
            Toggle
          </Link>
        </div>
      </div>
    </>
  );
};
