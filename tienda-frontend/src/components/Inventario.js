import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import ArticuloService from '../services/ArticuloService';

const Inventario = () => {

  const navigate = useNavigate(); 
  const volverAlDashboard = () => {
    navigate('/admin/dashboard');
  };
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    cargarInventario();}, []);

  const cargarInventario = async () => {
  try {
     const response = await ArticuloService.obtenerArticulos(); 
      setProductos(response.data);} 
      catch (error) {
      console.error('Error al cargar el inventario:', error);}
  };

  return (
    <div>
      <button onClick={volverAlDashboard}>Atrás</button>
    <h2>Inventario</h2>
    <table>
    <thead>
    <tr>
      <th>ID</th>
      <th>Imagen</th>
      <th>Nombre</th>
      <th>Descripción</th>
      <th>Categoría</th>
      <th>Subcategoría</th>
      <th>Stock</th></tr></thead>
    <tbody>
      {productos.map((producto) => (
      <tr key={producto.id}>
      <td>{producto.id}</td>
      <img src={producto.imagenUrl} alt={producto.nombre} className="producto-imagen" />
      <td>{producto.nombre}</td>
      <td>{producto.descripcion}</td>
      <td>{producto.categoria}</td>
      <td>{producto.subcategoria}</td>
      <td>{producto.stock}</td></tr>))}
    </tbody>
    </table>
    </div>
  );
};

export default Inventario;
