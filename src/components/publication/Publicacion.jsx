import React, { useEffect, useState } from 'react'
import { Global } from '../../helpers/Global'
import { Link, useParams } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'
import { Spiner } from '../../hooks/Spiner';
import useAuth from '../../hooks/useAuth';

import avatar from '../../assets/img/logo1.png'

export const Publicacion = () => {
  const params = useParams()
  const { auth } = useAuth({})

  const [articulobuscado, setArticulobuscado] = useState(null)

  useEffect(() => {
    articuloObtenido()
  }, [params])

  const articuloObtenido = async () => {


    const articuloId = params.id


    try {
      const request = await fetch(Global.url + 'articulo/obtenido/' + articuloId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }

      })
      const data = await request.json()


      if (data.status === 'success') {
        setArticulobuscado(data.articulo)


      } else {
        console.log('error al obtener el articulo')
      }
    } catch (error) {
      console.log(error)

    }


  }

  return (
    <>
      {articulobuscado ? (
        <>
          <section>
            <header className="main">
              <h1>Articulo</h1>
            </header>

            <span className='image publi'>
              {articulobuscado.imagen !== "default2.png" ? (
                <img src={Global.url + "articulo/media/" + articulobuscado.imagen} alt='' />
              ) : (
                <img src={avatar} alt='' />
              )}
            </span>

            <hr className="major" />
            <h2>{articulobuscado.titulo}</h2>
            <p>{articulobuscado.descripcion}</p>
            <p>{articulobuscado.contenido}</p>
            <p>Publicado por {articulobuscado.userId.name}  {articulobuscado.userId.surname}  <ReactTimeAgo date={new Date(articulobuscado.fecha)}></ReactTimeAgo></p>


            {auth && auth._id ? (
              <li><Link to={`/auth/perfil/${articulobuscado.userId._id}`} >Ir al Perfil</Link></li>
            ) : (
              <li><Link to={`/perfil/${articulobuscado.userId._id}`} >Ir al Perfil</Link></li>
            )}

            <li><Link to={`/auth/acerca/${articulobuscado.userId._id}`}>volver atras</Link></li>

          </section>

        </>
      ) : (
        <Spiner></Spiner>
      )}



    </>
  )
}
