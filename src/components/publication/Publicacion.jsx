import React, { useEffect, useState } from 'react';
import { Global } from '../../helpers/Global';
import { Link, useParams } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import { Spiner } from '../../hooks/Spiner';
import useAuth from '../../hooks/useAuth';

export const Publicacion = () => {
  const params = useParams();
  const { auth } = useAuth({});
  const [articulobuscado, setArticulobuscado] = useState(null);
  const [error, setError] = useState(null); // Agregamos un estado para el error

  useEffect(() => {
    articuloObtenido();
  }, [params]);

  const articuloObtenido = async () => {
    const articuloId = params.id;
    try {
      const request = await fetch(Global.url + 'articulo/obtenido/' + articuloId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await request.json();
      console.log(data.articulo);

      if (data.status === 'success') {
        setArticulobuscado(data.articulo);
      } else {
        setError('La publicación no existe o fue eliminada.'); // Configuramos el mensaje de error
      }
    } catch (error) {
      setError('Error al obtener el artículo.'); // Configuramos el mensaje de error
    }
  };

  const DeletePublicacion = async (ArticuloId) => {
    try {
      const request = await fetch(Global.url + 'articulo/delete/' + ArticuloId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token'),
        },
      });

      const data = await request.json(); // Espera a que la promesa se resuelva

      if (data.status === 'success') {
        articuloObtenido();
      } else {
        setError(data.message); // Configuramos el mensaje de error
      }
    } catch (error) {
      setError(error.message); // Configuramos el mensaje de error
    }
  };




  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          {articulobuscado ? (
            <>
              <section>
                <header className='main'>
                  <h1>{articulobuscado.titulo}</h1>
                </header>

                <span className='image publi'>
                  {auth._id === articulobuscado.userId._id && (
                    <i onClick={() => DeletePublicacion(articulobuscado._id)} className='bi bi-trash'>
                      <span>Eliminar publicacion</span>
                    </i>
                  )}

                </span>

                <img src={Global.url + 'articulo/media/' + articulobuscado.imagen} alt='' className='articulo'/>

                <hr className='major' />
                <h2>{articulobuscado.titulo}</h2>
                <p>{articulobuscado.descripcion}</p>
                <p>{articulobuscado.contenido}</p>
                <p>
                  Publicado por {articulobuscado.userId.name} {articulobuscado.userId.surname}{' '}
                  <ReactTimeAgo date={new Date(articulobuscado.fecha)}></ReactTimeAgo>
                </p>
               

                {auth && auth._id ? (
                  <li>
                    <Link to={`/auth/perfil/${articulobuscado.userId._id}`}>Ir al Perfil</Link>
                  </li>
                ) : (
                  <li>
                    <Link to={`/perfil/${articulobuscado.userId._id}`}>Ir al Perfil</Link>
                  </li>
                )}

                {auth && auth._id ? (
                  <li>
                    <Link to={`/auth/acerca/${articulobuscado.userId._id}`}>volver atras</Link>
                  </li>
                ) : (
                  <li>
                    <Link to={`/acerca/${articulobuscado.userId._id}`}>volver atras</Link>
                  </li>
                )}

              </section>
            </>
          ) : (
            <Spiner></Spiner>
          )}
        </>
      )}
    </>
  );
};
