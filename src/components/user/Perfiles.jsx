import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { Global } from '../../helpers/Global'

import avatar from '../../../src/assets/img/logo1.png'

export const Perfiles = () => {


    const { auth } = useAuth({})
    const [page, setPage] = useState(1)
    const [usuarios, setUsuarios] = useState([])
    const [totalPages, setTotalPages] = useState(1)



    const nextPage = () => {
        let next = page + 1;
        setPage(next);

    };

    useEffect(() => {
        listarUltimosPerfiles(page)

    }, [page])



    //aca se listan las publicaciones

    const listarUltimosPerfiles = async (nextPage = 1) => {
        try {

            const request = await fetch(Global.url + 'user/lastprofiles' + '/' + nextPage, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await request.json()

            if (data.status === 'success') {
                setUsuarios(data.usuarios)
                setTotalPages(data.totalPages)
            } else {
                console.log(data.message)
            }

        } catch (error) {

        }
    }




    return (
        <>
            <h2>Ultimos perfiles Creados</h2>
            {usuarios.length > 0 ? (
                usuarios.map((users) => (
                    <section id="banner" key={users._id}>
                        <div className="content">
                            <header>
                                <h1>{users.name}<br /></h1>
                                <p>{users.bio}</p>
                            </header>
                            <p>{users.biodos}</p>
                            <ul className="actions">
                                {auth && auth._id ? (
                                    <li><Link to={`/auth/perfil/${users._id}`} className="button">Leer mas</Link></li>
                                ) : (
                                    <li><Link to={`/perfil/${users._id}`} className="button">Leer mas</Link></li>
                                )}
                            </ul>
                        </div>
                        <span className="image perfillist">
                            {users.image == 'default.png' && <img src={avatar} className="" alt=""></img>}
                            {users.image != 'default.png' && <img src={Global.url + "user/avatar/" + users.image} className="" alt=""></img>}
                        </span>
                    </section>
                ))
            ) : (
                <p>No hay usuarios disponibles.</p>
            )}

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
        </>

    )
}
