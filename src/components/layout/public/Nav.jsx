import React, { useEffect, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import { Global } from '../../../helpers/Global'

export const Nav = () => {
  const params = useParams()
  const [dataRed, setDataRed] = useState([])


  useEffect(() => {
    listRedesuser()
  }, [params])

  const listRedesuser = async () => {
    const userParams = params.id;
    const userIdentity = '65a2bd122bfbd8c09b1325bd';
    let usuarioId
  

    
    if (userParams) {
      usuarioId = userParams;
    } else {
      usuarioId = userIdentity;
    }

    try {
      const request = await fetch(Global.url + 'redes/listuser/' + usuarioId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }

      })
      const data = await request.json()

      if (data.status === 'success') {
        setDataRed(data.redes)
        console.log(data)

      } else {
        console.log(data.message)
      }

    } catch (error) {
      console.log(data.message)
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
