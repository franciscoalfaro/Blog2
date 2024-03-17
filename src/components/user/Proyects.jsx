import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { Global } from '../../helpers/Global'

export const Proyects = () => {

    const { auth } = useAuth({})
    const params = useParams()
    const [page, setPage] = useState(1)
    const [projects, setProjects] = useState([])
    const [totalPages, setTotalPages] = useState(1)

    const nextPage = () => {
        let next = page + 1;
        setPage(next);

    };

    useEffect(() => {
        getProyect(page)

    }, [page])


    const getProyect = async (nextPage = 1) => {

        try {

            const userId = params.id

            const request = await fetch(Global.url + 'proyecto/listproyectuser/' + userId + '/' + nextPage, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',

                }
            })
            const data = await request.json()
            console.log('proyecto',data)

            if (data.status === 'success') {
                setProjects(data.proyectos)
                setTotalPages(data.totalPages)
                

            } else {
                console.log(data.message)
            }

        } catch (error) {

        }
    }



    return (
        <section>
            <header className="major">
                <h2>Mis ultimos proyectos</h2>
            </header>
            <div className="posts">
                {projects.length > 0 ? (
                    projects.map((proyecto) => (
                        <article key={proyecto._id}>
                            <NavLink className='image'>
                                {proyecto.imagen != "default.png" && <img src={Global.url + "proyecto/media/" + proyecto.imagen} alt=''></img>}
                                {proyecto.imagen == "default.png" && <img src={Global.url + "proyecto/media/" + proyecto.imagen}></img>}
                            </NavLink>

                            <h3>{proyecto.titulo}</h3>
                            <p>{proyecto.descripcion}</p>
                            <ul className="actions">
                                <li><Link to="#" className="button">leer mas</Link></li>
                            </ul>
                        </article>

                    ))
                ) : (
                    <p>No tiene proyectos disponibles.</p>
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
    )
}
