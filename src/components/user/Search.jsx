import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { Global } from '../../helpers/Global'
import { Publicacion } from '../publication/Publicacion'

export const Search = () => {

    const [buscado, setBuscado] = useState([])
    const params = useParams()
    const auth = useAuth()
    const [articulos, setArticulos] = useState({})
    const [page, setPage] = useState(1)
    const { articulo } = useParams()

    const nextPage = () => {
        let next = page + 1;
        setPage(next);
        buscarArticulos(next);
    };


    useEffect(() => {
        buscarArticulos(1)

    }, [articulo])

    const buscarArticulos = async (nextPage = 1) => {
        const request = await fetch(Global.url + 'articulo/search/' + params.articulo + '/' + nextPage, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'

            },
        })
        const data = await request.json()
        if (data.status === 'success') {
            console.log(data)
            setArticulos(data.resultados)
        } else {
            console.log(data.message)
        }
    }


    //leer articulo 

    return (
        <>
        <section>
            <header className="main">
                <h1>Resultado de busqueda</h1>
            </header>
            {articulos.length > 0 && (
                <div>
                    {articulos.map((articulo) => (
                        <div key={articulo._id}>
                            <span className="image publi"><img src="../../src/assets/img/fondo2.png" alt="" /></span>
                            <hr className="major" />
                            <h2>{articulo.titulo}</h2>
                            <p>{articulo.descripcion}</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dapibus rutrum facilisis. className aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam tristique libero eu nibh porttitor fermentum. Nullam venenatis erat id vehicula viverra. Nunc ultrices eros ut ultricies condimentum. Mauris risus lacus, blandit sit amet venenatis non, bibendum vitae dolor. Nunc lorem mauris, fringilla in aliquam at, euismod in lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In non lorem sit amet elit placerat maximus. Pellentesque aliquam maximus risus, vel sed vehicula. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque venenatis dolor imperdiet dolor mattis sagittis. Praesent rutrum sem diam, vitae egestas enim auctor sit amet. Pellentesque leo mauris, consectetur id ipsum sit amet, fersapien risus, commodo eget turpis at, elementum convallis elit. Pellentesque enim turpis, hendrerit tristique lorem ipsum dolor.</p>
                            <ul className="actions">
                                <li><NavLink to={`/auth/publicacion/${articulo._id}`} className="button">Leer mas</NavLink></li>
                                
                            </ul>
                        </div>
                    ))}
                    <ul className="pagination">
                        <li><span className={`button ${page === 1 ? 'disabled' : ''}`} onClick={() => setPage(page - 1)}>Anterior</span></li>
                        <li><a href="#" className={`page ${page === 1 ? 'active' : ''}`} onClick={() => setPage(1)}>1</a></li>
                        <li><a href="#" className={`page ${page === 2 ? 'active' : ''}`} onClick={() => setPage(2)}>2</a></li>
                        <li><span className="button" onClick={nextPage}>Siguiente</span></li>
                    </ul>
                    
                </div>
                
            )}


        </section>

        

    
    </>
    )
}
