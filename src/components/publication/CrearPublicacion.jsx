import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { Global } from '../../helpers/Global'
import { useForm } from '../../hooks/useForm'
import { EliminarCategoriasModal } from './EliminarCategoriasModal'
import { CrearCategoria } from './CrearCategoria'



export const CrearPublicacion = () => {
  const { auth, setAuth } = useAuth({})
  const { form, changed } = useForm({})
  const [publicacion, setPublicacion] = useState([])
  const [categorias, setCategorias] = useState([])

  const [newCategorias, setNewCategorias] = useState([])

  const [selectedOption, setSelectedOption] = useState('')

  const [forceUpdate, setForceUpdate] = useState(false);

  const [categoriaOculta, setCategoriaOculta] = useState(true);

  const [stored, setStored] = useState([])


  const crearArticulo = async (e) => {
    e.preventDefault()

    let newPublicacion = form
    
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


      } else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: data.message,
          showConfirmButton: true
        });

      }
      //subir imag
      const fileInput = document.querySelector("#file");
      if (data.status == "success" && fileInput.files[0]) {
        // Recoger imagen a subir
        const compressedFile = await compressImage(fileInput.files[0], 800, 600, 0.7);

        // Crear FormData con la imagen comprimida
        const formData = new FormData();
        formData.append('file0', compressedFile);

        // Peticion para enviar el fichero
        const uploadRequest = await fetch(Global.url + "articulo/upload/" + data.newArticulo._id, {
          method: "POST",
          body: formData,
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        })
        const uploadData = await uploadRequest.json()
        if (uploadData.status == "success") {

          setStored("stored")
        } else {
          setStored("error")
        }
      }

      // Función para comprimir la imagen
      async function compressImage(file, maxWidth, maxHeight, quality) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
              // Crear un lienzo (canvas) para dibujar la imagen comprimida
              const canvas = document.createElement('canvas');
              let width = img.width;
              let height = img.height;
              if (width > maxWidth) {
                // Redimensionar la imagen si supera el ancho máximo
                height *= maxWidth / width;
                width = maxWidth;
              }
              if (height > maxHeight) {
                // Redimensionar la imagen si supera la altura máxima
                width *= maxHeight / height;
                height = maxHeight;
              }
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext('2d');
              // Dibujar la imagen en el lienzo con el tamaño redimensionado
              ctx.drawImage(img, 0, 0, width, height);
              // Convertir el lienzo a un archivo comprimido (blob)
              canvas.toBlob((blob) => {
                // Crear un nuevo archivo con el blob comprimido
                const compressedFile = new File([blob], file.name, { type: file.type });
                resolve(compressedFile);
              }, file.type, quality);
            };
          };
          reader.onerror = (error) => reject(error);
        });
      }

      if (data == null) {
        console.log("form vacio")
      }


    }
    const myForm = document.querySelector("#articulo-form")
    myForm.reset()  



  }


  useEffect(() => {
    listCategorias()
  }, [newCategorias])



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
      

      }
    } catch (error) {
      console.error('Error al obtener los datos:', error);

    }

  }


  //crear categoria swal
  const crearcategorialSwal = () => {
    Swal.fire({
      title: "Crear Categoria",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
        name: "name", // Asignar el nombre del campo de entrada
      },
      showCancelButton: true,
      confirmButtonText: "Crear",
      showLoaderOnConfirm: true,
      preConfirm: async (inputValue) => {
        try {
          const request = await fetch(Global.url + 'categoria/crearcategoria', {
            method: "POST",
            body: JSON.stringify({ name: inputValue }), // Enviar el valor del campo de entrada
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('token'),
            }
          });

          const data = await request.json();

          if (data.status === "success") {
            setCategorias(prevCategorias => [...prevCategorias, data.categoria]);

          }

          return data; // Devolver la respuesta completa
        } catch (error) {
          throw new Error(`Request failed: ${error}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Categoria creada correctamente',
        });
      }
    });
  };



  const toggleCategoria = () => {
    setCategoriaOculta(!categoriaOculta);
  };

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
            <input type="file" name='file0' id='file' onChange={changed}></input>
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

          <div className="col-3 col-12-xsmall">
            <label>Quieres crear una nueva categoria?</label>
            <button type='button' className='button primary small' onClick={crearcategorialSwal}>
              Crear Nueva Categoría
            </button>
          </div>

          <div className="col-3 col-12-xsmall">
            <label>Quieres eliminar una categoria?</label>
            <button type='button' className='button primary small' onClick={toggleCategoria}>
              {categoriaOculta ? 'Eliminar Categoria' : 'Ocultar'}
            </button>

            <div className="ocultado" id='ocultado' hidden={categoriaOculta}>
              <EliminarCategoriasModal forceUpdate={() => setForceUpdate(!forceUpdate)}></EliminarCategoriasModal>
            </div>
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
