import React, { useEffect, useState } from 'react';
import ArticuloService from '../services/ArticuloService';
import { agregarArticulo } from '../services/CarritoService';

const Mujer = () => {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    ArticuloService.obtenerArticulosPorGenero('mujer')
      .then(response => setArticulos(response.data))
      .catch(error => console.error('Error al cargar los artículos', error));}, []);
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
    <div>
      <h1>Ropa de Mujer</h1>
      <div className="productos-container">
      {articulos.map((articulo) => (
      <div key={articulo.id} className="producto-card">
      <img src={articulo.imagenUrl} alt={articulo.nombre} />
      <h3>{articulo.nombre}</h3>
      <p>{articulo.descripcion}</p>
      <p>Precio: Q{articulo.precio}</p>
      <button onClick={() => agregarAlCarrito(articulo)}>Agregar al Carrito</button>
   </div>))}
  </div>
</div>);
};

export default Mujer;
