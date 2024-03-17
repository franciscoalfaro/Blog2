import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth';
import ListPublicaciones from '../../publication/ListPublicaciones';

export const Sidebar = ({ onLinkClick }) => {
    const { auth } = useAuth({})
    const navegar = useNavigate();
 
    const buscador = (e) => {
        e.preventDefault()
        let miBusqueda = e.target.search_field.value
        //aca paso el parametro del campo de la busquera y la derivo a la ruta donde esta, con este codigo { replace: true } reemplazo lo que se escribe en la url
        if(miBusqueda == ''){
            console.log('debe de ingresar texto')
        }
        navegar("/auth/search/" + miBusqueda, { replace: true })

    }





    return (
        <>
            <section id="search">
                <form onSubmit={buscador}>
                    <input type="text" name="search_field" id="query" placeholder="Buscar Articulos" required></input>
                </form>
            </section>
            <nav id="menu">
                <header className="major">
                    <h2>Menu</h2>
                </header>
                <ul>
                    <li><NavLink to="/auth/inicio" onClick={onLinkClick}>Inicio</NavLink></li>
                    <li><NavLink to="/auth/agregarstack" onClick={onLinkClick}>Mi Stack</NavLink></li>
                    <li><NavLink to="/auth/publicar/" onClick={onLinkClick}>Crear publicacion</NavLink></li>
                    <li><NavLink to="/auth/mis-publicaciones" onClick={onLinkClick}>Mis Publicaciones</NavLink></li>
                    <li><NavLink to="/auth/miperfil" onClick={onLinkClick}>Mis Datos</NavLink></li>
                    <li><NavLink to="/auth/perfiles" onClick={onLinkClick}>otros perfiles</NavLink></li>
                    <li><NavLink to="/auth/logout" onClick={onLinkClick}>Cerrar sesion</NavLink></li>
                </ul>
            </nav>
            <section>
               <ListPublicaciones></ListPublicaciones>
            </section>


            <section>
                <header className="major">
                    <h2>Mi informacion de contacto</h2>
                </header>
                <p>si deseas ponerte en contacto conmigo te dejo mis datos de contacto.</p>
                <ul className="contact">
                    <li className="icon solid fa-envelope"><a to="#">franciscoalfar@gmail.com</a></li>
                    <li className="icon solid fa-phone">(+56) 982202241</li>
                </ul>
            </section>
        </>
    )
}
