import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { Global } from '../../helpers/Global'
import { useForm } from '../../hooks/useForm'
import { GetStack } from '../../helpers/GetStack'
import { DeleteStack } from './DeleteStack'



export const AddStack = () => {
    const { form, changed } = useForm({})
    const { auth } = useAuth({})
    const [agregarStack, setAgregarStack] = useState([])
   

    const addStck = async (e) => {

        e.preventDefault();
        let newStack = form
    
    
        const request = await fetch(Global.url + 'stack/crear', {
          method: "POST",
          body: JSON.stringify(newStack),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
    
          }
        })
        const data = await request.json()
    
        if (data.status === "success") {
            
            setAgregarStack(data)

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'stack agregado con exito',
                showConfirmButton: true
            });
            setTimeout(() => { window.location.reload() }, 1000);
           
           

    
        }else{
            console.log(data.message)

        }
    
        const myForm = document.querySelector("#stack-form")
        myForm.reset()
    
      }



    return (
        <>
        
            <h6 className="mb-0">Crear Nuevo Stack</h6>
            <form id='stack-form' onSubmit={addStck}>

                <div className='row gtr-uniform'>
                    <div className='col-3 col-12-xsmall '>
                        <input type="text" name="name" className="form-control" placeholder="stack" aria-label="name" aria-describedby="email-addon" required onChange={changed}></input>
                    </div>
                    <div className='col-3 col-12-xsmall '>
                        <input type="text" name="description" className="form-control" placeholder="descripcion" aria-label="description" aria-describedby="description" required onChange={changed}></input>
                    </div>
                    <div className='col-6 col-12-xsmall '>
                        <button className="btn btn-submit"><i className="fas fa-plus"></i><span>&nbsp;&nbsp;Agregar Stack</span></button>
                    </div>

                </div>


            </form>


        </>

    )
}

