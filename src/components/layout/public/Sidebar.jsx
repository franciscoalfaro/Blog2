import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth';




export const Sidebar = () => {
    const { auth } = useAuth()
    const navegar = useNavigate();

    //crear un hooks para las ultimas publicaciones (3) y despues seleccionar al hacer clic en la publicacion se debe de ir a leer la misma

    const buscador = (e) => {
        e.preventDefault()
        let miBusqueda = e.target.search_field.value
        //aca paso el parametro del campo de la busquera y la derivo a la ruta donde esta, con este codigo { replace: true } reemplazo lo que se escribe en la url
        if(miBusqueda == ''){
            console.log('debe de ingresar texto')
        }
        navegar("search/" + miBusqueda, { replace: true })

    }

    return (
        <>
            <section id="search">
                <form onSubmit={buscador}>
                    <input type="text" name="search_field" id="query" placeholder="Buscar Articulos"></input>
                </form>
            </section>
            <nav id="menu">
                <header className="major">
                    <h2>Menu</h2>
                </header>
                <ul>
                    <li><NavLink to="inicio">Inicio</NavLink></li>
                    <li><NavLink to="publicaciones">publicaciones</NavLink></li>
                    <li><NavLink to="login">Iniciar sesion</NavLink></li>
                    <li><NavLink to="registro">Crear Cuenta</NavLink></li>
                </ul>
            </nav>
            <section>
                <header className="major">
                    <h2>mis ultimas publicaciones</h2>
                </header>
                <div className="mini-posts">
                    <article>
                        <a to="#" className="image"><img src="src/assets/img/blog.png" alt="" /></a>
                        <p>Plataforma de gastos</p>
                        <ul className="actions">
                            <li><a to="#" className="button">Leer</a></li>
                        </ul>
                    </article>
                    <article>
                        <a to="#" className="image"><img src="src/assets/img/redsocial.png" alt="" /></a>
                        <p>Red social</p>
                        <ul className="actions">
                            <li><a to="#" className="button">Leer</a></li>
                        </ul>
                    </article>
                    <article>
                        <a to="#" className="image"><img src="src/assets/img/redsocial.png" alt="" /></a>
                        <p>configurar nodemailer</p>
                        <ul className="actions">
                            <li><a to="#" className="button">Leer</a></li>
                        </ul>
                    </article>
                </div>
            </section>


            <section>
                <header className="major">
                    <h2>Mi informacion de contacto</h2>
                </header>
                <p>si deseas ponerte en contacto conmigo te dejo mis datos de contacto</p>
                <ul className="contact">
                    <li className="icon solid fa-envelope"><a to="#">franciscoalfar@gmail.com</a></li>
                    <li className="icon solid fa-phone">(+56) 982202241</li>
                </ul>
            </section>
        </>
    )
}
