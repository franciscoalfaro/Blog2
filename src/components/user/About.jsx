import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { NavLink, useParams } from 'react-router-dom'
import { Global } from '../../helpers/Global'

export const About = () => {

  const { auth } = useAuth({})
  const [page, setPage] = useState(1)
  const [articulos, setArticulos] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [usuario, setUsuario] = useState([])
  const params = useParams()  

  const nextPage = () => {
    let next = page + 1;
    setPage(next);

  };


  useEffect(() => {
    listarPublicaciones(page)

  }, [page,params])


  const listarPublicaciones = async (nextPage = 1) => {
    try {
      const userId = params.id

      const request = await fetch(Global.url + 'articulo/articulouser/' +userId+'/' + nextPage, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await request.json()
   
      if (data.status === 'success') {
        setArticulos(data.articulos)
        setTotalPages(data.totalPages)
        setUsuario(data.articulos.userId)

      } else {
        console.log(data.message)
      }

    } catch (error) {

    }
  }



  return (
    <section>

    {articulos.length > 0 && (
      <div>
        {articulos.map((articulo) => (
          <div key={articulo._id}>
            <span className="image publi"><img src="../../src/assets/img/fondo2.png" alt="" /></span>
            <hr className="major" />
            <h2>{articulo.titulo}</h2>
            <p>{articulo.descripcion}</p>
            <p>{articulo.contenido}</p>

            <ul className="actions">
              {auth && auth._id ? (
                <li><NavLink to={`/auth/publicacion/${articulo._id}`} className="button">Leer mas</NavLink></li>
              ) : (
                <li><NavLink to={`/publicacion/${articulo._id}`} className="button">Leer mas</NavLink></li>
              )}
            </ul>
          </div>
        ))}
        <ul className="pagination">
          <li><span className={`button ${page === 1 ? 'disabled' : ''}`} onClick={() => setPage(page - 1)}>Anterior</span></li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <a to="#" className={`page ${page === index + 1 ? 'active' : ''}`} onClick={() => setPage(index + 1)} > {index + 1} </a></li>))}
          <li>
            <span className={`button ${page === totalPages ? 'disabled' : ''}`} onClick={nextPage}>Siguiente</span></li>
        </ul>
      </div>

    )}


  </section>
  )
}
