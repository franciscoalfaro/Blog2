import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { Global } from '../../helpers/Global'
import { useForm } from '../../hooks/useForm'
import { EliminarCategoriasModal } from './EliminarCategoriasModal'



export const CrearPublicacion = () => {
  const { auth, setAuth } = useAuth({})
  const { form, changed } = useForm({})
  const [publicacion, setPublicacion] = useState([])
  const [categorias, setCategorias] = useState([])


  const [selectedOption, setSelectedOption] = useState('')


  const crearArticulo = async (e) => {
    e.preventDefault()

    let newPublicacion = form
    console.log('crear publicacion', form)

    if (!newPublicacion.categoria) {
      Swal.fire({
        title: "Falta la categoria",
        text: "Debes de seleccionar una categoria",
        icon: "question"
      });
    } else {

      const request = await fetch(Global.url + 'articulo/create', {
        method: "POST",
        body: JSON.stringify(newPublicacion),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')

        }
      })
      const data = await request.json()

      if (data.status === "success") {
        setPublicacion()
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Publicacion realizada con exito',
          showConfirmButton: true
        });

        const myForm = document.querySelector("#articulo-form")
        myForm.reset()

      } else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: data.message,
          showConfirmButton: true
        });

      }
    }

  }




  useEffect(() => {
    listCategorias()

  }, [])



  const listCategorias = async () => {
    try {
      const request = await fetch(Global.url + 'categoria/listcategoria', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      })

      const data = await request.json()

      if (data.status === "success") {
        setCategorias(data.categorias)
        console.log(data)

      }
    } catch (error) {
      console.error('Error al obtener los datos:', error);

    }

  }


  //elementos para el option select
  const opcioneDelselect = (event) => {
    setSelectedOption(event.target.value);

  };

  //llamar eventos distintos con onchange
  const eventosDistintos = (event) => {
    opcioneDelselect(event);
    changed(event);
  };





  return (
    <>
      <div className="col-lg-5 text-center mx-auto">
        <h1 className="text-white mb-2 mt-5">Hola que publicaras hoy!</h1>

      </div>
      <form id='articulo-form' onSubmit={crearArticulo}>
        <div className="row gtr-uniform">
          <div className="col-6 col-12-xsmall">
            <input type="text" name="titulo" placeholder="Titulo" onChange={changed} required></input>
          </div>

          <div className="col-6 col-12-xsmall">
            <input type="text" name="descripcion" placeholder="Descripcion" onChange={changed} required></input>
          </div>

          <div className="upload-container">
            <input type="file" name='file0' id='file0' onChange={changed}></input>
          </div>

          <div className="col-12">
            <select name="categoria" value={selectedOption} onChange={eventosDistintos} className='select' required>
              <option value="">Selecciona una categoria</option>
              {categorias.map((item) => (
                <option key={item._id} value={item.name} >
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12">
            <textarea name="contenido" placeholder="Tu articulo" rows="6" onChange={changed} required></textarea>
          </div>
          <div className="col-12">
            <ul className="actions">
              <li><input type="submit" value="Publicar" className="primary" /></li>
              <li><input type="reset" value="Limpiar" /></li>
            </ul>
          </div>
        </div>
      </form>

    </>

  )
}
