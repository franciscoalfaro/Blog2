import React from 'react'
import { Link } from 'react-router-dom'

export const Inicio = () => {
    return (
        <>

            <section id="banner">
                <div className="content">
                    <header>
                        <h1>Hola, Soy Francisco Alfaro<br />
                        </h1>
                        <p>Este es mi blog personal</p>
                    </header>
                    <p>Aca ire subiendo mis aprendizajes, el detalle de mis proyectos personales</p>
                    <ul className="actions">
                        <li><Link to="#" className="button big">Leer mas</Link></li>
                    </ul>
                </div>
                <span className="image object">
                    <img src="../src/assets/img/pic10.jpg" alt="" />
                </span>
            </section>
            <section>
                <header className="major">
                    <h2>Mi Stack</h2>
                </header>
                <div className="features">
                    <article>
                        <span className="icon">
                            <img src="../src/assets/img/react2.png" className="img-iconos" ></img>
                        </span>
                        <div className="content">
                            <h3>REACT</h3>
                            <p>Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.</p>
                        </div>
                    </article>
                    <article>
                        <span className="icon">
                            <img src="../src/assets/img/mongodb.png" className="img-iconos" ></img>
                        </span>
                        <div className="content">
                            <h3>MONGODB</h3>
                            <p>Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.</p>
                        </div>
                    </article>
                    <article>
                        <span className="icon">
                            <img src="../src/assets/img/mern2.png" className="img-iconos" ></img>
                        </span>
                        <div className="content">
                            <h3>MERN</h3>
                            <p>Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.</p>
                        </div>
                    </article>
                    <article>
                        <span className="icon">
                            <img src="../src/assets/img/postman.png" className="img-iconos" ></img>
                        </span>
                        <div className="content">
                            <h3>POSTMAN</h3>
                            <p>Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.</p>
                        </div>
                    </article>
                </div>
            </section>
            <section>
                <header className="major">
                    <h2>Mis Proyectos</h2>
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

        </>
    )
}
