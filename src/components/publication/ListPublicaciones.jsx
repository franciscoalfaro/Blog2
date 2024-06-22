import React, { useEffect, useState } from 'react'
import { Global } from '../../helpers/Global';
import useAuth from '../../hooks/useAuth';

import { NavLink } from 'react-router-dom';

export const ListPublicaciones = () => {
    const [ultimos, setUltimos] = useState([]);
    const { auth } = useAuth({});

    useEffect(() => {
        obtenerUltimasPublicaciones();
    }, []);

    const obtenerUltimasPublicaciones = async () => {
        try {
            const request = await fetch(Global.url + 'articulo/ultimos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await request.json();
            if (data.status === 'success') {

                setUltimos(data.articulos);

            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div>
                <header className="major">
                    <h2>ultimas publicaciones</h2>
                </header>
                {ultimos.length > 0 && (
                    <div className="mini-posts">
                        {ultimos.map((ultimo) => (
                            <article key={ultimo._id} className='image'>

                                {auth && auth._id ? (
                                    <NavLink to={`/auth/publicacion/${ultimo._id}`} className='image'>
                                        {ultimo.imagen != "default.png" && <img src={Global.url + "articulo/media/" + ultimo.imagen} className='image' alt=''></img>}
                                        {ultimo.imagen == "default.png" && <img src={Global.url + "articulo/media/" + ultimo.imagen} className='image'></img>}
                                    </NavLink>
                                ) : (
                                    <NavLink to={`/publicacion/${ultimo._id}`} className='image'>
                                        {ultimo.imagen != "default.png" && <img src={Global.url + "articulo/media/" + ultimo.imagen} className='image' alt=''></img>}
                                        {ultimo.imagen == "default.png" && <img src={Global.url + "articulo/media/" + ultimo.imagen} className='image'></img>}
                                    </NavLink>
                                )}

                                <p>{ultimo.titulo}</p>
                                <p>{ultimo.descripcion}</p>
                                <p>{ultimo.Autor} {ultimo.ApellidoAutor}</p>
                                <ul className="actions">
                                    {auth && auth._id ? (
                                        <li><NavLink to={`/auth/publicacion/${ultimo._id}`} className="button">Leer mas</NavLink></li>
                                    ) : (
                                        <li><NavLink to={`/publicacion/${ultimo._id}`} className="button">Leer mas</NavLink></li>
                                    )}
                                </ul>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default ListPublicaciones;
