import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { Global } from '../../helpers/Global'

import { Proyects } from './Proyects'
import avatar from '../../../src/assets/img/logo1.png'

import { StackList } from './StackList'

export const Profile = () => {
  const { auth } = useAuth({})
  const params = useParams()
  const [usuario, setUsuario] = useState([])


  useEffect(() => {
    profileSelect()

  }, [params])




  const profileSelect = async () => {

    try {

      const userId = params.id

      const request = await fetch(Global.url + 'user/profileselect/' + userId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',

        }
      })
      const data = await request.json()

      if (data.status === 'success') {
        setUsuario(data.user)      

      } else {
        console.log(data.message)
      }

    } catch (error) {

    }
  }





  return (
    <>



      <section id="banner">
        <div className="content">
          <header>
            <h1>{usuario.name}<br />
            </h1>
            <p>{usuario.bio}</p>
          </header>
          <p>{usuario.biodos}</p>
          <ul className="actions">
            {auth && auth._id ? (
              <li><Link to={`/auth/acerca/${usuario._id}`} className="button">Leer mas</Link></li>
            ) : (
              <li><Link to={`/acerca/${usuario._id}`} className="button">Leer mas</Link></li>
            )}

          </ul>
        </div>
        <span className="image perfillist">
        {usuario.image === 'default.png' && <img src={avatar} className="" alt=""></img>}
        {usuario.image !== 'default.png' && <img src={Global.url + "user/avatar/" + usuario.image} className="" alt=""></img>}
        </span>
      </section>

      {/** stack */}
      
      <StackList></StackList>

      {/** stack */}

      {/** proyecto */}

      <Proyects></Proyects>

    </>
  )
}
