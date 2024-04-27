import React, { useState, useRef, useEffect } from 'react';
import { GetStack } from '../../helpers/GetStack';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Global } from '../../helpers/Global';

export const DeleteStack = () => {
  const { auth } = useAuth({})
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [items, setItems] = useState([]);

  const myInputRef = useRef(null);

  const handleModalShow = () => {
    myInputRef.current.focus();

  };

  useEffect(() => {
    getStackUser(page)
  }, [page])

  const nextPage = () => {
    let next = page + 1;
    setPage(next);

  };


  const getStackUser = async (nextPage) => {
    const userId = auth._id
    let dataStack = await GetStack(userId, nextPage)
    setItems(dataStack.stack)
    setTotalPages(dataStack.totalPages)
  }



  const handleDeleteItem = async (stackId, index) => {
    try {
      const request = await fetch(Global.url + 'stack/delete/' + stackId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }

      })
      const data = await request.json()


      if (data.status === 'success') {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
        getStackUser()
      }

    } catch (error) {
      console.error('Error al obtener los datos:', error);

    }



  };

  useEffect(() => {
    console.log("DeleteStack renderizado");
}, []);







  return (
    <>
      <ol className="list-group list-group-numbered">
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
              {item.name}<span> - </span>
              <i className="fas fa-trash" onClick={() => handleDeleteItem(item._id)}></i><span>  </span>
              <i className="bi bi-pencil" data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => handleModalShow(index)}></i>
            </li>
          ))
        ) : (
          <div>
            Sin stack
          </div>
          
        )}
      </ol>


      {items && items.length > 0 && (
      <nav aria-label="...">

        <ul className="pagination">
          <li><span className={`button ${page === 1 ? 'disabled' : ''}`} onClick={() => setPage(page - 1)}>Anterior</span></li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <a href="#" className={`page ${page === index + 1 ? 'active' : ''}`} onClick={() => setPage(index + 1)}> {index + 1} </a>
            </li>
          ))}
          <li>
            <span className={`button ${page === totalPages ? 'disabled' : ''}`} onClick={nextPage}>Siguiente</span>
          </li>
        </ul>

      </nav>
      )}

      <div className="modal" id="myModal" tabIndex="-1" ref={myInputRef} hidden>
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-body">

              <div className='row gtr-uniform'>
                <div className='col-3 col-12-xsmall '>
                  <input type="text" name="name" className="form-control" aria-label="name" aria-describedby="email-addon" required></input>
                </div>
                <div className='col-3 col-12-xsmall '>
                  <input type="text" name="name" className="form-control" placeholder="descripcion" aria-label="name" aria-describedby="email-addon" required></input>
                </div>
                <div className='col-6 col-12-xsmall '>
                  <button className="btn btn-submit" data-bs-dismiss="modal"><span>Actualizar</span></button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
    
  );
};
