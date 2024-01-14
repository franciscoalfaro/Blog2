import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import useAuth from '../../hooks/useAuth'
import { Global } from '../../helpers/Global'

export const Login = () => {

  const { form, changed } = useForm({})
  const [saved, setSaved] = useState('no_enviado')

  const { setAuth } = useAuth()

  const loginUser = async (e) => {
    e.preventDefault()

    let userLogin = form

    const request = await fetch(Global.url + "user/login", {
      method: "POST",
      body: JSON.stringify(userLogin),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await request.json()
    if (data.status == "success") {
      // Persistir datos en el navegador - guardar datos de inicio de sesión
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setSaved("login");
      // Establecer datos en el auth
      setAuth(data.user);
      // Redirección

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login correcto',
        showConfirmButton: false,
        timer: 1150

      });
      setTimeout(() => { window.location.reload() }, 1200);


    } else if (data.status == "error_404") {
      setSaved("error_404");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Falta usuario o clave!',

      })
    } else if (data.status == "Not Found") {
      setSaved("warning");
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Usuario no registrado!',

      })


    } else {
      setSaved("error");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'usuario o clave incorrecto!',

      })
    }


  }



  return (
    <>
      <div><br></br></div>
      <form onSubmit={loginUser}>
        <div className="row gtr-uniform">
          <div className="col-6 col-12-xsmall">
            <input type="text" name="email" id="email" placeholder="email" onChange={changed}></input>
            <br></br>
            <input type="password" name="password" id="password" placeholder="password" onChange={changed}></input>
            <p className="mb-4 text-sm"> No tienes cuenta?<NavLink className="nav-link" to="/registro"><span> Regístrate aqui</span></NavLink></p>
          </div>
          <div className="col-12">
            <div className="text-center">
              <button type="submit" className="primary">Ingresar</button>
            </div>
            
          </div>
          <NavLink className="nav-link" to="/recuperar"><span>¿Olvidaste tu contraseña?</span></NavLink>
        </div>
      </form>
    </>
  )
}
