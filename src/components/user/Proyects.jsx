import React from 'react'
import { Link } from 'react-router-dom'

export const Proyects = () => {
    return (
        <section>
            <header className="major">
                <h2>Mis Proyectos del usuario</h2>
            </header>
            <div className="posts">
                <article>
                    <Link to="#" className="image"><img src="../src/assets/img/comogasto.png" alt="" /></Link>
                    <h3>Plataforma de gastos</h3>
                    <p>Aplicacion en la cual puede llevar un control de tus gastos mensuales </p>
                    <ul className="actions">
                        <li><Link to="#" className="button">leer mas</Link></li>
                    </ul>
                </article>
                <article>
                    <Link to="#" className="image"><img src="../src/assets/img/blog.png" alt="" /></Link>
                    <h3>Blog</h3>
                    <p>Aplicacion de blog</p>
                    <ul className="actions">
                        <li><Link to="#" className="button">Leer mas</Link></li>
                    </ul>
                </article>
                <article>
                    <Link to="#" className="image"><img src="../src/assets/img/redsocial.png" alt="" /></Link>
                    <h3>Red social</h3>
                    <p>Aplicacion de una red social</p>
                    <ul className="actions">
                        <li><Link to="#" className="button">Leer mas</Link></li>
                    </ul>
                </article>
            </div>
        </section>
    )
}
