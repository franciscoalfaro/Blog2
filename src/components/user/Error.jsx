import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export const Error = () => {
  const auth= useAuth(null)
  return (
    <div>
        <h5>
            <p>Error 404 La pagina que buscas no se encuentra disponible o fue eliminada</p>
            <Link to="/">Volver Al inicio</Link>
        </h5>
    </div>
  )
}
