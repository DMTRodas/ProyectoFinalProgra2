import React from 'react';
import { Link } from 'react-router-dom';
import '../estilos/MenuLateral.css'; 

const MenuLateral = ({ isOpen, toggleMenu }) => {
  return (
    <div className={`menu-lateral ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleMenu}>X</button>
      <nav>
        <ul>
          <li><Link to="/hombre" onClick={toggleMenu}>Hombre</Link></li>
          <li><Link to="/mujer" onClick={toggleMenu}>Mujer</Link></li>
          <li><Link to="/accesorios" onClick={toggleMenu}>Accesorios</Link></li>
          <li><Link to="/nosotros" onClick={toggleMenu}>Nosotros</Link></li> 
          <li><Link to="/" onClick={toggleMenu}>Volver al inicio</Link></li>
            <div className="section">
            <img 
            src="/images/t.png" 
            alt="logo" 
            className="section-image" 
            />
            </div>
        </ul>
      </nav>
      <div className="auth-buttons">
        <Link to="/api/usuarios/login" onClick={toggleMenu} className="btn">INICIAR SESION</Link>
        <Link to="/registro" onClick={toggleMenu} className="btn">REGISTRARSE</Link>
      </div>
    </div>
  );
};

export default MenuLateral;

