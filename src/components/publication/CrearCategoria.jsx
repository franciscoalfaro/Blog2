import React from 'react'
import { Global } from '../../helpers/Global';

export const CrearCategoria = () => {

    const [newCategorias, setNewCategorias] = useState([])

    const crearCategoria = async (e) => {

        e.preventDefault();
        let newCategoria = form
    
    
        const request = await fetch(Global.url + 'categoria/crearcategoria', {
          method: "POST",
          body: JSON.stringify(newCategoria),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
    
          }
        })
        const data = await request.json()
    
        if (data.status === "success") {
          setNewCategorias(data)
    
        }
    
        const myForm = document.querySelector("#categoria-form")
        myForm.reset()
    
      }
    return (
        <>

            <form id='categoria-form' onSubmit={crearCategoria}>
                <h6 className="mb-0">Crear Nueva Categoria</h6>
                <button className="btn bg-gradient-dark" type="submit"><i className="fas fa-plus"></i><span>&nbsp;&nbsp;Agregar Categoria</span></button>
                <input type="text" name="name" className="form-control" placeholder="Nombre" aria-label="name" aria-describedby="email-addon" required onChange={changed} />
            </form>

            <EliminarCategoriasModal forceUpdate={() => setForceUpdate(!forceUpdate)}></EliminarCategoriasModal>
        </>
    )
}
