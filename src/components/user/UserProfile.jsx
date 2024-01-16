import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { Global } from '../../helpers/Global'

export const UserProfile = () => {


  const { auth } = useAuth({})
  

  const [usuario, setUsuario] = useState([])

  useEffect(() => {
    profileSelect()
    
  }, [])


  const profileSelect = async () => {

    try {
      const userId = auth._id

      const request = await fetch(Global.url + 'user/profile/' + userId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      })
      const data = await request.json()
   

      if (data.status === 'success') {
        setUsuario(data.user)

      } else {
        console.log(data.message)
      }

    } catch (error) {

    }
  }




  return (
    <>
      <section id="banner">
        <div className="content">
          <header>
            <h1>{usuario.name}<br />
            </h1>
            <p>{usuario.bio}</p>
          </header>
          <p>Aca ire subiendo mis aprendizajes, el detalle de mis proyectos personales</p>
          <ul className="actions">
            {auth && auth._id ? (
              <li><Link to={`/auth/acerca/${usuario._id}`} className="button">Leer mas</Link></li>
            ) : (
              <li><Link to={`/acerca/${usuario._id}`} className="button">Leer mas</Link></li>
            )}

          </ul>
        </div>
        <span className="image object">
          <img src="../src/assets/img/logo1.png" alt="" />
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
