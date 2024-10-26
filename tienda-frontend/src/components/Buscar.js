import React, { useState } from 'react';
import '../estilos/Buscar.css';

const Buscar = ({ toggleMenu }) => {
  const [query, setQuery] = useState('');

  const sugerencias = ['Chaquetas', 'Playeras', 'Vestidos', 'Bolsas'];

  const manejarCambio = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div className="buscar-container">
      <button className="menu-btn" onClick={toggleMenu}>
        &#9776;
      </button>

      <h2>Buscar</h2>
      <input
        type="text"
        value={query}
        onChange={manejarCambio}
        placeholder="Buscar productos"
        className="buscar-input"
      />
      <div className="sugerencias">
        <h3>Sugerencias para ti</h3>
        {sugerencias.map((sugerencia, index) => (
          <button key={sugerencia} className="sugerencia-btn">
            {sugerencia}
          </button>))}
      </div>
    </div>
  );
};

export default Buscar;

