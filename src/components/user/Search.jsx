import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { Global } from '../../helpers/Global'
import { Publicacion } from '../publication/Publicacion'

export const Search = () => {

    const [buscado, setBuscado] = useState([]);
    const params = useParams();
    const { auth } = useAuth({});
    const [articulos, setArticulos] = useState([]);
    const [page, setPage] = useState(1);
    const { articulo } = useParams();
    const [totalPages, setTotalPages] = useState(1);

    const nextPage = () => {
        let next = page + 1;
        setPage(next);

    };

    useEffect(() => {
        buscarArticulos(page)
    }, [page])

    useEffect(() => {
        buscarArticulos(1);
    }, [articulo]);

    const buscarArticulos = async (nextPage = 1) => {

        try {
            const request = await fetch(Global.url + 'articulo/search/' + params.articulo + '/' + nextPage, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = await request.json();

            if (data.status === 'success') {
                setArticulos(data.resultados);
                setTotalPages(data.totalPages);

            } else {
                setArticulos([])

            }

        } catch (error) {
            console.log(data.message);

        }



    };

    return (
        <>
            <section>
                <header className="main">
                    <h1>Resultado de tu busqueda</h1>
                    <p>buscaste: {params.articulo}</p>
                </header>
                {articulos.length > 0 ? (
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
                ) : (
                    <p>No se encontraron resultados.</p>

                )}

            </section>

        </>
    )
}
