import React, { useEffect, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import { Global } from '../../../helpers/Global'

export const Nav = () => {
  const { auth } = useAuth({})
  const params = useParams()
  const [dataRed, setDataRed] = useState([])



  useEffect(() => {
    listRedes()
  }, [params])

  const listRedes = async () => {
    try {
      const usuarioId = params.id;
  
      let request;
      if (usuarioId === undefined) {
        request = await fetch(Global.url + 'redes/listuser', {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
      } else {
        request = await fetch(Global.url + 'redes/listuser/' + usuarioId, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
      }
  
      const data = await request.json();
  
      if (data.status === 'success') {
        setDataRed(data.redes);
        
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  


  return (
    <header id="header">
      <NavLink to="inicio" className="logo"><strong>Blog</strong></NavLink>
      <ul className="icons">
        {dataRed.map((redes) => (
          <li key={redes._id}>
            {redes.name === 'github' ? (<Link to={redes.valor} className='icon brands fa-github'><span className="label">{redes.name}</span></Link>) : ''}
            {redes.name === 'linkedin' ? (<Link to={redes.valor} className='icon brands fa-linkedin'><span className="label">{redes.name}</span></Link>) : ''}
            {redes.name === 'instagram' ? (<Link to={redes.valor} className='icon brands fa-instagram'><span className="label">{redes.name}</span></Link>) : ''}

          </li>
        ))}
      </ul>
    </header>
  )
}
