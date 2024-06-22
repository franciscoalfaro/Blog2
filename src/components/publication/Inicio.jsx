import React from 'react'
import { Link, useParams } from 'react-router-dom'
import logo from '../../assets/img/logo1.png'
import useAuth from '../../hooks/useAuth'
import { Global } from '../../helpers/Global'
import { Proyects } from '../user/Proyects'

export const Inicio = () => {
    const { auth } = useAuth({})


    return (
        <>

            <section id="banner">
                <div className="content">
                    <header>
                        <h1>Hola, Soy Francisco Alfaro<br />
                        </h1>
                        <p>Creador y desarrollador de Blog - Inspirate y comparte</p>
                    </header>
                    <p>Te invitamos a Resgistrarte y comparte tus conocimientos tus ideas e inspirate</p>
                    <ul className="actions">
                        <li><Link to="/registro" className="button">Registrate aqui</Link></li>
                    </ul>
                </div>
                <span className="image object">
                    {auth.imagen === 'default.png' && <img src={logo} className="" alt=""></img>}
                    {auth.imagen !== 'default.png' && <img src={Global.url + "user/avatar/" + auth.imagen} className="" alt=""></img>}
                </span>
            </section>

            <section>
                <header className="major">
                    <h2>Mis stack </h2>
                </header>
                <div className="features">
                    <article>
                        <span className="icon">
                            <img src="/react.png" className="img-iconos" ></img>
                        </span>
                        <div className="content">
                            <h3>REACT</h3>
                            <p>Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.</p>
                        </div>
                    </article>
                    <article>
                        <span className="icon">
                            <img src="/mongodb.png" className="img-iconos" ></img>
                        </span>
                        <div className="content">
                            <h3>MONGODB</h3>
                            <p>Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.</p>
                        </div>
                    </article>
                    <article>
                        <span className="icon">
                            <img src="/mern.png" className="img-iconos" ></img>
                        </span>
                        <div className="content">
                            <h3>MERN</h3>
                            <p>Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.</p>
                        </div>
                    </article>
                    <article>
                        <span className="icon">
                            <img src="/postman.png" className="img-iconos" ></img>
                        </span>
                        <div className="content">
                            <h3>POSTMAN</h3>
                            <p>Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.</p>
                        </div>
                    </article>
                </div>
            </section>

            <Proyects></Proyects>

        </>
    )
}
