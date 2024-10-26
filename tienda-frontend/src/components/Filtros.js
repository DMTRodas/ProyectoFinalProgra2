import React from 'react';
import './Filtros';

const Filtros = () => {
  return (
  <div className="filtros">
    <h3>Filtrar por:</h3>
    <div>
    <label>Categoría</label>
    <select>
    <option value="todos">Todos</option>
    <option value="ropa">Ropa</option>
    <option value="accesorios">Accesorios</option>
    </select></div>
    <div>
    <label>Precio</label>
    <input type="range" min="0" max="500" /></div>
    </div>);
};

export default Filtros;
