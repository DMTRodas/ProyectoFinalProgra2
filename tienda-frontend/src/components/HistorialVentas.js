import React, { useState, useEffect } from 'react';
import AxiosConfig from '../services/AxiosConfig';

const HistorialVentas = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    cargarVentas();
  }, []);

  const cargarVentas = async () => {
    try {
      const response = await AxiosConfig.get('/pedidos');
      setVentas(response.data);
    } catch (error) {
      console.error('Error al cargar las ventas', error);
    }
  };

  return (
    <div>
    <h2>Historial de Ventas</h2>
    {ventas.length > 0 ? (
    <table>
    <thead>
    <tr>
      <th>ID Pedido</th>
      <th>Cliente</th>
      <th>Total</th>
      <th>Fecha</th></tr>
      </thead>
   <tbody>
      {ventas.map((venta, index) => (
      <tr key={index}>
      <td>{venta.idPedido}</td>
      <td>{venta.idCliente}</td>
      <td>Q{venta.total}</td>
      <td>{new Date(venta.fecha).toLocaleDateString()}</td></tr>))}
      </tbody>
        </table>) : (<p>No hay ventas registradas.</p>)}
    </div>);
};

export default HistorialVentas;
