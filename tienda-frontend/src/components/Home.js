import React from 'react';
import { Link } from 'react-router-dom'; 
import '../estilos/Home.css';

const Home = () => {
  return (  
    <div>
    <div className="section">
    <Link to="/mujer">
    <img 
    src="/images/2.png" 
    alt="Sección Mujer" 
    className="section-image"/></Link>
    </div>

    <div className="section">
    <Link to="/hombre">
    <img 
    src="/images/1.png" 
    alt="Sección Hombre" 
    className="section-image"/></Link>
    </div>

    <div className="section">
    <Link to="/accesorios">
    <img 
    src="/images/3.png" 
    alt="Sección Accesorios" 
    className="section-image"/></Link>
    </div>
  </div>);
};

export default Home;