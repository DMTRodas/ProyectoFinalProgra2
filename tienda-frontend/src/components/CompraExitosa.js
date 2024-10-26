import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../estilos/CompraExitosa.css';  

const CompraExitosa = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { idPedido } = location.state || {};  
  const volverALaTienda = () => {
    navigate('/');  };
  return (
    <div className="compra-exitosa-container">
    <h2>¡Compra realizada con éxito!</h2>
    <p>Tu número de pedido es:<strong>{idPedido}</strong></p>
    <h3>{idPedido}</h3>
    <button onClick={volverALaTienda}>Volver a la tienda</button>
    </div>);
};

export default CompraExitosa;