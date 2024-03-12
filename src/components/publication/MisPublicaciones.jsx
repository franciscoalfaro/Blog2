import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { Global } from '../../helpers/Global'
import { NavLink } from 'react-router-dom'
import avatar from '../../assets/img/fondo2.png'

export const MisPublicaciones = () => {

  const { auth } = useAuth({})
  const [page, setPage] = useState(1)
  const [articulos, setArticulos] = useState([])
  const [totalPages, setTotalPages] = useState(1)



  const nextPage = () => {
    let next = page + 1;
    setPage(next);

  };

  useEffect(() => {
    listarMisPublicaciones(page)

  }, [page])



  //aca se listan mis las publicaciones

  const listarMisPublicaciones = async (nextPage = 1) => {
    try {

      const request = await fetch(Global.url + 'articulo/misarticulos' + '/' + nextPage, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      })
      const data = await request.json()
      if (data.status === 'success') {
        setArticulos(data.articulos)
        setTotalPages(data.totalPages)

        console.log(data)


      } else {
        console.log(data.message)
      }

    } catch (error) {

    }
  }

  const DeletePublicacion = async (ArticuloId) => {


    try {
      const request = await fetch(Global.url + 'articulo/delete/' + ArticuloId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        }
      });

      const data = await request.json(); // Espera a que la promesa se resuelva
      console.log(data);

      if (data.status === "success") {
        listarMisPublicaciones();
      } else {
        console.log(data.message);
      }

    } catch (error) {
      console.log(error.message); // Error.message en lugar de data.message
    }
  }






  return (
    <section>
      <header className="main">
        <h1>Mis Publicaciones</h1>
      </header>
      {articulos.length > 0 && (
        <div>
          {articulos.map((articulo) => (
            <div key={articulo._id} className="publicacion">
              {auth._id === articulo.userId &&
               <i onClick={() => DeletePublicacion(articulo._id)} className="bi bi-trash"><span>Eliminar publicacion</span></i>
               
              }
              <span className='image publi'>
                {articulo.imagen !== "default.png" ? (
                  <img src={Global.url + "articulo/media/" + articulo.imagen} alt='' />
                ) : (
                  <img src={avatar} alt='' />
                )}
              </span>

  
              <h2>{articulo.titulo}</h2>
              <p>{articulo.descripcion}</p>
              <p>{articulo.contenido}</p>
              <ul className="actions">
                <li><NavLink to={`/auth/publicacion/${articulo._id}`} className="button">Leer mas</NavLink></li>
              </ul>
              <hr className="major"></hr>
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
