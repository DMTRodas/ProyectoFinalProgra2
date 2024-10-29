import React, { useState } from 'react';
import AxiosConfig from '../services/AxiosConfig';

const ReportesAdmin = () => {
  const [idArticulo, setIdArticulo] = useState('');
  const [idPedido, setIdPedido] = useState('');
  const [nombreCliente, setNombreCliente] = useState('');

  const generarReporte = (tipo) => {
    let url = '';
    if (tipo === 'articulo') {
      url = `/reportes/articulos/${idArticulo}`;
    } else if (tipo === 'pedido') {
      url = `/reportes/pedido/${idPedido}`;
    } else if (tipo === 'cliente') {
      url = `/reportes/cliente/${nombreCliente}`;
    }

    window.open(AxiosConfig.defaults.baseURL + url, '_blank');
  };

  return (
    <div>
      <h2>Generar Reportes</h2>
      <div>
        <h3>Reporte de Existencia de Artículo</h3>
        <input
          type="text"
          placeholder="ID del Artículo"
          value={idArticulo}
          onChange={(e) => setIdArticulo(e.target.value)}
        />
        <button onClick={() => generarReporte('articulo')}>Generar Reporte</button>
      </div>
      <div>
        <h3>Reporte de Pedido</h3>
        <input
          type="text"
          placeholder="ID del Pedido"
          value={idPedido}
          onChange={(e) => setIdPedido(e.target.value)}
        />
        <button onClick={() => generarReporte('pedido')}>Generar Reporte</button>
      </div>
      <div>
        <h3>Historial de Transacciones por Cliente</h3>
        <input
          type="text"
          placeholder="Nombre del Cliente"
          value={nombreCliente}
          onChange={(e) => setNombreCliente(e.target.value)}
        />
        <button onClick={() => generarReporte('cliente')}>Generar Historial</button>
      </div>
    </div>
  );
};

export default ReportesAdmin;
