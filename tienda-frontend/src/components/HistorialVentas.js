import React, { useState, useEffect } from 'react';
import AxiosConfig from '../services/AxiosConfig';
import { useNavigate } from 'react-router-dom';

const HistorialVentas = () => {
  const [ventas, setVentas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarVentas();
  }, []);

  const volverAlHistorialTransacciones = () => {
    navigate('/admin/historial-transacciones');
  };

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
    <button onClick={volverAlHistorialTransacciones}>Atrás</button>
    <h2>Historial de Ventas</h2>
    {ventas.length > 0 ? (
    <table>
    <thead>
    <tr>
      <th>ID Pedido</th>
      <th>Nombre Cliente</th>
      <th>Tipo de Pago</th>
      <th>Total</th>
      <th>Fecha</th></tr>
      </thead>
   <tbody>
      {ventas.map((venta, index) => (
      <tr key={index}>
      <td>{venta.idPedido}</td>
      <td>{venta.nombre}</td>
      <td>{venta.metodoPago}</td>
      <td>Q{venta.total}</td>
      <td>{new Date(venta.fecha).toLocaleDateString()}</td></tr>))}
      </tbody>
        </table>) : (<p>No hay ventas registradas.</p>)}
    </div>);
};

export default HistorialVentas;
