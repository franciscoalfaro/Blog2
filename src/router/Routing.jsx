import React from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../context/AuthProvider'
import { PublicLayout } from '../components/layout/public/PublicLayout'
import { PrivateLayout } from '../components/layout/private/PrivateLayout'
import { Feed } from '../components/publication/Feed'
import { Login } from '../components/user/Login'
import { Register } from '../components/user/Register'
import { Recovery } from '../components/user/Recovery'
import { Config } from '../components/user/Config'
import { Profile } from '../components/user/Profile'
import { CrearPublicacion } from '../components/publication/CrearPublicacion'
import { Publicacion } from '../components/publication/Publicacion'
import { Inicio } from '../components/publication/Inicio'
import { Logout } from '../components/user/Logout'
import { Search } from '../components/user/Search'
import { Error } from '../components/user/Error'
import { Perfiles } from '../components/user/Perfiles'
import { About } from '../components/user/About'
import { MisPublicaciones } from '../components/publication/MisPublicaciones'
import { UserProfile } from '../components/user/UserProfile'
import {AddStack} from '../components/user/AddStack'



export const Routing = () => {
  return (

    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<PublicLayout></PublicLayout>}>
            <Route index element={<Navigate to="inicio"></Navigate>}></Route>
            <Route path='inicio' element={<Inicio></Inicio>}></Route>
            <Route path='publicaciones' element={<Feed></Feed>}></Route>
            <Route path='publicacion/:id' element={<Publicacion></Publicacion>}></Route>
            <Route path='perfiles/' element={<Perfiles></Perfiles>}></Route>
            <Route path='perfil/:id/' element={<Profile></Profile>}></Route>
            <Route path='acerca/:id/' element={<About></About>}></Route>
            <Route path='search/:articulo' element={<Search></Search>}></Route>
            <Route path='login' element={<Login></Login>}></Route>
            <Route path='registro' element={<Register></Register>}></Route>
            <Route path='recuperar' element={<Recovery></Recovery>}></Route>
          </Route>

          <Route path='/auth' element={<PrivateLayout></PrivateLayout>}>
            <Route index element={<Navigate to="inicio"></Navigate>}></Route>
            <Route path='inicio' element={<UserProfile></UserProfile>}></Route>
            <Route path='publicaciones' element={<Feed></Feed>}></Route>
            <Route path='mis-publicaciones' element={<MisPublicaciones></MisPublicaciones>}></Route>
            <Route path='publicar' element={<CrearPublicacion></CrearPublicacion>}></Route>
            <Route path='publicacion/:id' element={<Publicacion></Publicacion>}></Route>
            
            <Route path='search/:articulo' element={<Search></Search>}></Route>
            <Route path='agregarstack' element={<AddStack></AddStack>}></Route>

            <Route path='perfiles/' element={<Perfiles></Perfiles>}></Route>
            <Route path='perfil/:id' element={<Profile></Profile>}></Route>
            <Route path='miperfil' element={<Config></Config>}></Route>
            <Route path='acerca/:id' element={<About></About>}></Route>

            <Route path='logout'element={<Logout></Logout>}></Route>
          </Route>


          <Route path='*' element={<Error></Error>}></Route>

        </Routes>

      </AuthProvider>
    </BrowserRouter>

  ) 
}
