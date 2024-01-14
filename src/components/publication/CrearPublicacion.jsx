import React from 'react'

export const CrearPublicacion = () => {
  return (
    <>
      <div className="col-lg-5 text-center mx-auto">
        <h1 className="text-white mb-2 mt-5">Hola que publicaras hoy!</h1>

      </div>
      <form method="post" action="#">
        <div className="row gtr-uniform">
          <div className="col-6 col-12-xsmall">
            <input type="text" name="demo-name" id="demo-name" placeholder="Titulo" />
          </div>
          <div className="col-6 col-12-xsmall">
            <input type="email" name="demo-email" id="demo-email" placeholder="Descripcion" />
          </div>

          <div class="upload-container">
            <input type="file"></input>
          </div>

          <div className="col-12">
            <select name="demo-category" id="demo-category">
              <option value="">- Categoria -</option>
              <option value="1">Manufacturing</option>
              <option value="1">Shipping</option>
              <option value="1">Administration</option>
              <option value="1">Human Resources</option>
            </select>
          </div>



          <div className="col-12">
            <textarea name="demo-message" id="demo-message" placeholder="Tu articulo" rows="6"></textarea>
          </div>

          <div className="col-12">
            <ul className="actions">
              <li><input type="submit" value="Send Message" className="primary" /></li>
              <li><input type="reset" value="Reset" /></li>
            </ul>
          </div>
        </div>
      </form>
    </>

  )
}
