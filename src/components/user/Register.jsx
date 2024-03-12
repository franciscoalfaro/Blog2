import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { Global } from '../../helpers/Global'

export const Register = () => {

  const { form, changed } = useForm({})
  const [saved, setSaved] = useState('not_sended')

  const saveUser = async (e) => {
    //prevenir actualizacion de pagina o pantalla al realizar envio del form
    e.preventDefault()

    //variable para almacenar datos del formulario
    let newUser = form


    //guardar datos en backend

    const request = await fetch(Global.url + "user/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await request.json()


    if (data.status == "success") {
      setSaved("saved")
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario Registrado Correctamente',
        showConfirmButton: false,
        timer: 1100

      });
      setTimeout(() => { window.location.href = "/login" }, 1200);

    } if (data.status == "warning") {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'usuario ya existe intenta con otro'
      })
    } if (data.status == "error") {
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: data.message
      })
    }

  }
  return (
    <>
      <div><br></br></div>
      <div className="col-lg-5 text-center mx-auto">
        <h1 className="text-white mb-2 mt-5">Bienvenido!</h1>
        <p className="text-lead text-white">Registrate Gratis</p>
      </div>
      <form onSubmit={saveUser}>
        <div className="row gtr-uniform">
          <div className="col-6 col-12-xsmall">
            <input type="text" name="name" id="name" placeholder="Nombre" required onChange={changed}></input>
          </div>
          <div className="col-6 col-12-xsmall">
            <input type="text" name="surname" id="surname" placeholder="Apellido" required onChange={changed}></input>
          </div>

          <div className="col-6 col-12-xsmall">
            <input type="email" name="email" id="email" placeholder="email" required onChange={changed}></input>
          </div>
          <div className="col-6 col-12-xsmall">
            <input type="password" name="password" id="password" placeholder="password" required onChange={changed}></input>
          </div>
          <div className="col-6 col-12-xsmall">
            <input type="text" name="nick" id="nick" placeholder="nick" required onChange={changed}></input>
          </div>

          <div className="col-12">
            <ul className="actions">
              <li><input type="submit" value="Registrarme" className="primary" /></li>
            </ul>
          </div>
          <p className="text-sm mt-3 mb-0">Ya tienes cuenta? <NavLink to="/login" className="text-dark font-weight-bolder">Ingresar</NavLink></p>
        </div>
      </form>
    </>
  )
}
