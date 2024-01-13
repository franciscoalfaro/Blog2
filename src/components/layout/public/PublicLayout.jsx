import React, { useState } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { Footer } from './Footer'
import useAuth from '../../../hooks/useAuth'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'


export const PublicLayout = () => {

  const { auth } = useAuth()
  const navigate = useNavigate()

  const [sidebarActive, setSidebarActive] = useState(true);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <>
      <div id="wrapper">
        <div id="main">
          <div className="inner">
            <Header></Header>
            {!auth._id ? <Outlet></Outlet> : <Navigate to="/auth"></Navigate>}
          </div>
        </div>
        <div id="sidebar" className={sidebarActive ? 'active' : 'inactive'}>
          <div className="inner">
            <Sidebar></Sidebar>
            <Footer></Footer>
          </div>
          <Link to="#" className="toggle" onClick={toggleSidebar}>
            Toggle
          </Link>
        </div>
      </div>
    </>
  )
}
