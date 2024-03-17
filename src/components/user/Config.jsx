import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { Global } from '../../helpers/Global'
import { SerializeForm } from '../../helpers/SerializeForm'
import avatar from '../../../src/assets/img/default.png'

export const Config = () => {

  const { auth, setAuth } = useAuth()
  const [saved, setSaved] = useState("not_saved")

  const updateUser = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token')


    //recoger datos del formulario
    let newDataUser = SerializeForm(e.target)
    //eliminar datos innecesarios
    delete newDataUser.file0

    //actualizar usuario en la BD
    const request = await fetch(Global.url + "user/update", {
      method: "PUT",
      body: JSON.stringify(newDataUser),
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
    const data = await request.json()

    if (data.status == "success") {
      delete data.user.password
      setAuth({ ...auth, ...data.user })

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Datos actualizados',
        showConfirmButton: true,

      });

    } if (data.status == "warning") {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: data.message,
        showConfirmButton: true,

      });

    } if (data.status == "error") {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: data.message,
        showConfirmButton: true,

      });

    }


    // subida de imagen al servidor
    const fileInput = document.querySelector("#file0");

    if (data.status == "success" && fileInput.files[0]) {
      // Recoger imagen a subir
      const formData = new FormData();
      formData.append('file0', fileInput.files[0]);

      // Verificar la extensión del archivo
      const fileName = fileInput.files[0].name;
      const fileExtension = fileName.split('.').pop().toLowerCase();

      if (fileExtension === 'gif') {
        // Si la extensión es .gif, subir el archivo sin comprimir
        const uploadRequest = await fetch(Global.url + "user/upload", {
          method: "POST",
          body: formData,
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        });

        const uploadData = await uploadRequest.json();


        if (uploadData.status == "success" && uploadData.user) {
          delete uploadData.password;
          setAuth({ ...auth, ...uploadData.user });
          setTimeout(() => { window.location.reload() }, 0);
          setSaved("saved");
        } else {
          setSaved("error");
        }
      } else {
        // Si no es .gif, comprimir el archivo antes de subirlo
        const compressedFile = await compressImage(fileInput.files[0]);

        // Crear un nuevo FormData con el archivo comprimido
        const compressedFormData = new FormData();
        compressedFormData.append('file0', compressedFile);

        // Subir el archivo comprimido
        const uploadRequest = await fetch(Global.url + "user/upload", {
          method: "POST",
          body: compressedFormData,
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        });

        const uploadData = await uploadRequest.json();


        if (uploadData.status == "success" && uploadData.user) {
          delete uploadData.password;
          setAuth({ ...auth, ...uploadData.user });
          setTimeout(() => { window.location.reload() }, 0);
          setSaved("saved");
        } else {
          setSaved("error");
        }
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
  }





  return (
    <>
      <div><br></br></div>
      <div className="baner">
        <h1 className="text-white mb-2 mt-5">Mis Datos</h1>
        <span className="image perfil">
        {auth.image == 'default.png' && <img src={avatar} className="image perfil" alt="Foto de perfil"></img>}
        {auth.image != 'default.png' && <img src={Global.url + "user/avatar/" + auth.image} className="image perfil" alt="Foto de perfil"></img>}
        </span>
        
      </div>
      <div><br></br></div>
      <form onSubmit={updateUser}>
        <div className="row gtr-uniform">
          <div className="col-6 col-12-xsmall">
            <label htmlFor='name'>Nombre</label>
            <input type="text" name="name" id="demo-name" defaultValue={auth.name} />
          </div>
          <div className="col-6 col-12-xsmall">
            <label htmlFor='name'>Apellido</label>
            <input type="text" name="surname" id="demo-surname" defaultValue={auth.surname} />
          </div>

          <div className="col-6 col-12-xsmall">
            <label htmlFor='name'>nick</label>
            <input type="text" name="nick" id="demo-nick" defaultValue={auth.nick} />
          </div>

          <div className="col-6 col-12-xsmall">
            <label htmlFor='name'>email</label>
            <input type="email" name="email" id="demo-email" defaultValue={auth.email} />
          </div>

          <div className="col-6 col-12-xsmall">
            <label htmlFor='name'>password</label>
            <input type="password" name="password" id="demo-password" placeholder="password" />
          </div>

          <div className="col-6 col-12-xsmall">
          </div>

          <h3>La siguiente seccion se mostrara en tu perfil</h3>

          <div className="col-12">
            <label htmlFor='bio'>Acerca de ti</label>
            <textarea name="bio" id="demo-message" placeholder="Biografia" rows="6" defaultValue={auth.bio}></textarea>
          </div>

          <div className="col-12">
            <label htmlFor='biodos'>Mas sobre ti o lo que quieras</label>
            <textarea name="biodos" id="demo-messagedos" placeholder="Biografia" rows="6" defaultValue={auth.biodos}></textarea>
          </div>

          <div className="upload-container">
            <label htmlFor="file0"></label>
            <input type="file" name='file0' id='file0'></input>
          </div>

          <div className="col-12">
            <ul className="actions">
              <li><input type="submit" value="Actualizar" className="primary" /></li>

            </ul>
          </div>
        </div>
      </form>

    </>
  )
}
