import React from 'react'
import { NavLink } from 'react-router-dom'

export const Sidebar = () => {



    return (
        <>
            <section id="search" className="alt">
                <form method="post" action="#">
                    <input type="text" name="query" id="query" placeholder="Buscar" />
                </form>
            </section>
            <nav id="menu">
                <header className="major">
                    <h2>Menu</h2>
                </header>
                <ul>
                    <li><NavLink to="/auth/inicio">Inicio</NavLink></li>
                    <li><NavLink to="/auth/publicar">Crear publicacion</NavLink></li>
                    <li><NavLink to="/auth/publicaciones">publicaciones</NavLink></li>
                    <li><NavLink to="/auth/logout">Cerrar sesion</NavLink></li>
                </ul>
            </nav>
            <section>
                <header className="major">
                    <h2>mis ultimas publicaciones</h2>
                </header>
                <div className="mini-posts">
                    <article>
                        <a to="#" className="image"><img src="../src/assets/img/blog.png" alt="" /></a>
                        <p>Plataforma de gastos</p>
                        <ul className="actions">
                            <li><a to="#" className="button">Leer</a></li>
                        </ul>
                    </article>
                    <article>
                        <a to="#" className="image"><img src="../src/assets/img/redsocial.png" alt="" /></a>
                        <p>Red social</p>
                        <ul className="actions">
                            <li><a to="#" className="button">Leer</a></li>
                        </ul>
                    </article>
                    <article>
                        <a to="#" className="image"><img src="../src/assets/img/redsocial.png" alt="" /></a>
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
                <p>si deseas ponerte en contacto conmigo te dejo mis datos de contacto.</p>
                <ul className="contact">
                    <li className="icon solid fa-envelope"><a to="#">franciscoalfar@gmail.com</a></li>
                    <li className="icon solid fa-phone">(+56) 982202241</li>
                </ul>
            </section>
        </>
    )
}
