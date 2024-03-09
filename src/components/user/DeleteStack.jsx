import React, { useState } from 'react'

export const DeleteStack = () => {
  const initialData = [
    { id: 1, name: 'Producto 1', category: 'Categoría A' },
    { id: 2, name: 'Producto 2', category: 'Categoría B' },
    { id: 3, name: 'Producto 3', category: 'Categoría A' },
    { id: 4, name: 'Producto 4', category: 'Categoría C' },
    { id: 5, name: 'Producto 5', category: 'Categoría B' },
    { id: 6, name: 'Producto 6', category: 'Categoría A' },
    { id: 7, name: 'Producto 7', category: 'Categoría C' },
    { id: 8, name: 'Producto 8', category: 'Categoría A' },
    { id: 9, name: 'Producto 9', category: 'Categoría B' },
    { id: 10, name: 'Producto 10', category: 'Categoría A' },
    { id: 11, name: 'Producto 11', category: 'Categoría C' },
    { id: 12, name: 'Producto 12', category: 'Categoría B' },
    { id: 13, name: 'Producto 13', category: 'Categoría A' },
    { id: 14, name: 'Producto 14', category: 'Categoría C' },
  ];

  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredData = data.filter(item => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const pageCount = Math.ceil(filteredData.length / pageSize);
  const visibleData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <select value={pageSize} onChange={(e) => setPageSize(parseInt(e.target.value))}>
        {[5, 10, 15, 20].map((value, index) => (
          <option key={index} value={value}>{value}</option>
        ))}
      </select>

      <div className="row">
        {visibleData.map(item => (
          <div key={item.id} className="col-sm-6 col-md-4">
            <div className="card" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{item.category}</h6>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        {Array.from({ length: pageCount }, (_, index) => (
          <button key={index} onClick={() => changePage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};