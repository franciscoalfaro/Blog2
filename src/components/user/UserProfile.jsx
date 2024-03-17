import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { Global } from '../../helpers/Global'

export const UserProfile = () => {


  const { auth } = useAuth({})
  console.log('asdsa', auth)
  const [page, setPage] = useState(1)
  const [stacks, setStacks] = useState([])
  const [totalPages, setTotalPages] = useState(1)

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




  const nextPage = () => {
    let next = page + 1;
    setPage(next);

  };

  useEffect(() => {
    getStack(page)

  }, [page])


  const getStack = async (nextPage = 1) => {

    try {

      const userId = auth._id
      console.log(userId)

      const request = await fetch(Global.url + 'stack/list/' + nextPage, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')

        }
      })
      const data = await request.json()

      if (data.status === 'success') {
        setStacks(data.stack)
        setTotalPages(data.totalPages)

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
          <p>{usuario.biodos}</p>
          <ul className="actions">
            {auth && auth._id ? (
              <li><Link to={`/auth/acerca/${usuario._id}`} className="button">Leer mas</Link></li>
            ) : (
              <li><Link to={`/acerca/${usuario._id}`} className="button">Leer mas</Link></li>
            )}

          </ul>
        </div>
        <span className="image object">
          {auth.image === 'default.png' && <img src={Global.url + "user/avatar/" + auth.image} className="" alt=""></img>}
          {auth.image !== 'default.png' && <img src={Global.url + "user/avatar/" + auth.image} className="" alt=""></img>}
        </span>
      </section>

      <section>

        <header className="major">
          <h2>Mis Stack </h2>
        </header>
        <div className="features">
          {stacks.length > 0 ? (
            stacks.map((stack) => (
              <article key={stack._id}>
                <span className="icon">
                  <img src={`/src/assets/img/${stack.name}.png`} className="img-iconos" ></img>
                </span>
                <div className="content">
                  <h3>{stack.name}</h3>
                  <p>{stack.description}</p>
                </div>
              </article>
            ))
          ) : (
            <p>No tiene stack disponibles.</p>
          )}
        </div>



        <ul className="pagination">
          <li><span className={`button ${page === 1 ? 'disabled' : ''}`} onClick={() => setPage(page - 1)}>Anterior</span></li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <a href="#" className={`page ${page === index + 1 ? 'active' : ''}`} onClick={() => setPage(index + 1)}> {index + 1} </a>
            </li>
          ))}
          <li>
            <span className={`button ${page === totalPages ? 'disabled' : ''}`} onClick={nextPage}>Siguiente</span>
          </li>
        </ul>
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
