import React from 'react';
import { Link } from 'react-router-dom';

const DashboardAdmin = () => {
  return (
    <div>
      <h2>Bienvenido, Administrador</h2>
      <ul>
      <li><Link to="/admin/productos">Manejar Productos</Link></li>
      <li><Link to="/admin/inventario">Inventario</Link></li>
      <li><Link to="/admin/proveedores">Manejar Proveedores</Link></li>
      <li><Link to="/admin/clientes">Listado de Clientes</Link></li>     
      <li><Link to="/admin/proveedores-pedido">Proveedores y Pedidos</Link></li>
      <li><Link to="/admin/historial-transacciones">Historial de Transacciones</Link></li>
      <li><Link to="/admin/reporte">Generar Reporte de Inventario</Link></li></ul>
    </div>);
};

export default DashboardAdmin;
