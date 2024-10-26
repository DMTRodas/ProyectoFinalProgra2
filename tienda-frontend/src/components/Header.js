import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiUser } from 'react-icons/fi'; 
import { FiShoppingCart } from 'react-icons/fi';
import { useCliente } from '../components/ClienteContext';
import '../estilos/Header.css'; 

const Header = ({ toggleMenu }) => {
  const { cliente, cerrarSesion } = useCliente();

  const handleLogout = () => {
    cerrarSesion();};

  return (
    <header className="header">
    <div className="menu-icon">
    <button className="menu-btn" onClick={toggleMenu}>
    &#9776;
    </button></div>
      <div className="welcome-message">
      {cliente ? `Bienvenido, ${cliente.nombre}` : 'Bienvenido, visitante'}</div>
      <div className="header-icons">
        <Link to="/buscar">
        <FiSearch size={24} className="icon" />
        </Link>
        {cliente ? (<><Link to="/perfil">
        <FiUser size={24} className="icon" /></Link>
        <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button></>) : 
        (<Link to="/api/usuarios/login">
        <FiUser size={24} className="icon" />
        </Link>)}
      </div>
      <div className="header">
        <Link to="/carrito">
        <FiShoppingCart size={24} /></Link>
      </div>
    </header>);
};

export default Header;
