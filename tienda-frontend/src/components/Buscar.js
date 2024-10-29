import React, { useState } from 'react';
import AxiosConfig from '../services/AxiosConfig';
import { useNavigate } from 'react-router-dom';
import { agregarArticulo } from '../services/CarritoService';
import '../estilos/Buscar.css';

const Buscar = ({ toggleMenu }) => {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const navigate = useNavigate();
  const volverAHome = () => {
  navigate('/');};
  const sugerencias = ['chaquetas', 'playera', 'vestidos', 'bolsas'];

  const manejarCambio = async (e) => {
    const valor = e.target.value;
    setQuery(valor);

    if (valor.trim() === '') {
      setResultados([]);
      return;
    }

    try {
      const response = await AxiosConfig.get(`/articulos/buscar?query=${valor}`);
      setResultados(response.data);
    } catch (error) {
      console.error('Error al buscar productos:', error);
    }
  };

  const manejarSugerenciaClick = async (sugerencia) => {
    setQuery(sugerencia);
    
    try {
      const response = await AxiosConfig.get(`/articulos/buscar?query=${sugerencia}`);
      setResultados(response.data);
    } catch (error) {
      console.error('Error al buscar productos:', error);
    }
  };

  const agregarAlCarrito = async (articulo) => {
    const clienteId = localStorage.getItem('clienteId'); 
    if (!clienteId) {
      alert("Cliente no identificado");
      return;}
    try {
      await agregarArticulo(articulo, clienteId);
      alert("Producto agregado al carrito");} 
      catch (error) {
      console.error("Error al agregar producto al carrito", error);
      alert("Error al agregar producto al carrito");}
  };  

  return (
    <div className="buscar-container">
      <button onClick={volverAHome} className="dashboard-button">Home</button>
      <button className="menu-btn" onClick={toggleMenu}>
        &#9776;
      </button>
      
      <h2>Buscar</h2>
      <input
        type="text"
        value={query}
        onChange={manejarCambio}
        placeholder="Buscar productos por categoría"
        className="buscar-input"
      />

      <div className="sugerencias">
        <h3>Sugerencias para ti</h3>
        {sugerencias.map((sugerencia) => (
          <button
            key={sugerencia}
            className="sugerencia-btn"
            onClick={() => manejarSugerenciaClick(sugerencia)}
          >
            {sugerencia}
          </button>
        ))}
      </div>

      <div className="resultados-busqueda">
        {resultados.length > 0 ? (
          resultados.map((articulo) => (
            <div key={articulo.id} className="producto-item">
              <img src={articulo.imagenUrl} alt={articulo.nombre} className="articulo-imagen" />
              <h3>{articulo.nombre}</h3>
              <p>{articulo.descripcion}</p>
              <span>{`Precio: Q${articulo.precio}`}</span>
              <p> <button onClick={() => agregarAlCarrito(articulo)}>Agregar al Carrito</button></p>
            </div>
          ))
        ) : (
          <p>No hay resultados</p>
        )}
      </div>
    </div>
  );
};

export default Buscar;

