import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import userImage from '../../assets/img/default.png'
import { Global } from '../../helpers/Global';
import { Spiner } from '../../hooks/Spiner';

export const Recovery = () => {

  const { form, changed } = useForm({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const recoverUser = async (e) => {
    e.preventDefault();
    setLoading(true); // Iniciamos el indicador de carga

    try {
      let userRecovery = form;

      const request = await fetch(Global.url + "recovery/newpass", {
        method: "POST",
        body: JSON.stringify(userRecovery),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await request.json();

      if (data.status === "success") {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'En caso de existir cuenta se enviará correo con clave provisional',
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirigir a la página de login
            navigate('/login');
          }
        });

      } else {
        // Mostramos un mensaje de error si la solicitud no fue exitosa
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.message,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      // Manejo de errores
    } finally {
      setLoading(false); // Desactivamos el indicador de carga después de la solicitud
    }
  };

  return (
    <>
      <section className="min-vh-100 mb-8">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 text-center mx-auto">
              <h1 className="text-white mb-2 mt-5">Bienvenido!</h1>
              <p className="text-lead text-white">Recupera tu cuenta</p>
            </div>
          </div>

          <form onSubmit={recoverUser}>
            <div className="row gtr-uniform">
              <div className="col-6 col-12-xsmall">
                <input type="email" className="form-control" name="email" placeholder="Email" aria-label="Email" aria-describedby="email-addon" onChange={changed}></input>
              </div>
              <div className="col-12">
                {loading ? (<Spiner></Spiner>
                ) : (
                  <ul className="actions">
                    <li><input type="submit" value="Recuperar cuenta" className="primary" /></li>
                  </ul>
                )}
              </div>
              <p className="text-sm mt-3 mb-0">Ya tienes cuenta? <NavLink to="/public/login" className="text-dark font-weight-bolder">Ingresar</NavLink></p>
            </div>
          </form>
        </div>
      </section>

    </>
  )
}
