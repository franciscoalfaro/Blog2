import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { Global } from '../../helpers/Global'

export const StackList = () => {
    const { auth } = useAuth({})
    const params = useParams()
    const [page, setPage] = useState(1)
    const [stacks, setStacks] = useState([])
    const [totalPages, setTotalPages] = useState(1)

    const nextPage = () => {
        let next = page + 1;
        setPage(next);

    };

    useEffect(() => {
        getStack(page)

    }, [page])


    const getStack = async (nextPage = 1) => {

        try {

            const userId = params.id

            const request = await fetch(Global.url + 'stack/listuser/' + userId + '/' + nextPage, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',

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
            console.log(data.error)

        }
    }





    return (
        <>
            <section>

                <header className="major">
                    <h2>Mis Stack </h2>
                </header>
                <div className="features">
                    {stacks.length > 0 ? (
                        stacks.map((stack) => (
                            <article key={stack._id}>
                                <span className="icon">
                                <img src={`/${stack.name}.png`} className="img-iconos" ></img>
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
        </>

    )
}
