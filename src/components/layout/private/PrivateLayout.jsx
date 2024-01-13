import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import useAuth from '../../../hooks/useAuth';

export const PrivateLayout = () => {
  const { auth, loading } = useAuth();
  const [sidebarActive, setSidebarActive] = useState(true);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
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
            <Sidebar />
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
