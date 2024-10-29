import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../estilos/Dashboard.css';

const DashboardAdmin = () => {
const navigate = useNavigate();
const volverAHome = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <button onClick={volverAHome} className="dashboard-button">Home</button>
      <h2 className="dashboard-header">Bienvenido, Administrador</h2>
      <ul className="dashboard-menu">
        <li><Link to="/admin/productos">Manejar Productos</Link></li>
        <li><Link to="/admin/inventario">Inventario</Link></li>
        <li><Link to="/admin/proveedores">Manejar Proveedores</Link></li>
        <li><Link to="/admin/clientes">Listado de Clientes</Link></li>     
        <li><Link to="/admin/proveedores-pedido">Proveedores y Pedidos</Link></li>
        <li><Link to="/admin/historial-transacciones">Historial de Transacciones</Link></li>
        <li><Link to="/admin/reportes">Generar Reportes</Link></li>
        <li><Link to="/admin/gestionar-administradores">Gestionar Administradores</Link></li>
      </ul>
    </div>
  );
};

export default DashboardAdmin;
