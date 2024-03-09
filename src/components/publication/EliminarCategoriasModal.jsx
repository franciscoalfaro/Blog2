import React, { useEffect, useState } from 'react'
import { Global } from '../../helpers/Global';

export const EliminarCategoriasModal = ({ forceUpdate }) => {
    const [historicoCategorias, setHistoricoCategorias] = useState([]);

    const [totalPages, setTotalPages] = useState(1)
    const [page, setPage] = useState(1)

    const nextPage = () => {
        let next = page + 1;
        setPage(next);

    };

    useEffect(() => {
        obtenerCategorias(page)

    }, [page])

    const obtenerCategorias = async (nextPage = 1) => {
        try {
            const response = await fetch(Global.url + 'categoria/list/' + nextPage, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            });

            const data = await response.json();

            if (data.status === "success") {

                setHistoricoCategorias(data.categorias);

                setTotalPages(data.totalPages)

            }
        } catch (error) {
            console.error("Error al obtener las categorias:", error);
        }
    };

    useEffect(() => {
        obtenerCategorias();
    }, [forceUpdate]); // Llamar a obtenerCategorias al montar el componente



    const EliminarCategoria = async (categoriaId) => {
        try {
            const request = await fetch(Global.url + "categoria/delete/" + categoriaId, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            })

            const data = await request.json()
            if (data.status === "success") {
                setHistoricoCategorias(data.total);
                obtenerCategorias();
                forceUpdate()


            } else {
                console.log(data.message)
            }

        } catch (error) {

        }


    }
    return (

        <>
            <div className="table-wrapper">
                <table className="alt">
                    <thead>
                        <tr>
                            <th>nombre</th>
                            <th>descripcion</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historicoCategorias && historicoCategorias.map((categoria) => (
                            <tr key={categoria._id}>
                                <td>{categoria.name}</td>
                                <td>{categoria.description}</td>
                                <td>
                                    {categoria.name !== "Sin Categoría" && (
                                        <div className="text-center">
                                            <button type='button' className="btn bg-gradient-dark mb-0" onClick={() => EliminarCategoria(categoria._id)}>
                                                <i className="fas fa-minus"></i><span>&nbsp;&nbsp;</span>
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ul className="pagination">
                    <li><span className={`button small ${page === 1 ? 'disabled' : ''}`} onClick={() => setPage(page - 1)}>Anterior</span></li>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index}>
                            <a href="#" className={`page ${page === index + 1 ? 'active' : ''}`} onClick={() => setPage(index + 1)}> {index + 1} </a>
                        </li>
                    ))}
                    <li>
                        <span className={`button small ${page === totalPages ? 'disabled' : ''}`} onClick={nextPage}>Siguiente</span>
                    </li>
                </ul>
            </div>

        </>


    )
}
