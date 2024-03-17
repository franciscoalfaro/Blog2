import React, { useEffect, useState } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { Footer } from './Footer'
import useAuth from '../../../hooks/useAuth'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'


export const PublicLayout = () => {

  const { auth } = useAuth()
  const navigate = useNavigate()
  const [sidebarActive, setSidebarActive] = useState(true);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // Cambia el valor según el tamaño deseado
      if(window.innerWidth <= 1024){
        setSidebarActive(false);
      }else{
        setSidebarActive(true);
      }
      
    };

    handleResize(); // Llama a la función al principio para establecer el estado inicial
    window.addEventListener('resize', handleResize); // Agrega el event listener

    return () => {
      window.removeEventListener('resize', handleResize); // Remueve el event listener en el cleanup
    };
  }, []);




  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };
  const handleLinkClick = () => {
    // Oculta el sidebar cuando se hace clic en un enlace dentro del sidebar
    if (isMobile) {
      setSidebarActive(false);
    }

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
            <Sidebar onLinkClick={handleLinkClick}></Sidebar>
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
