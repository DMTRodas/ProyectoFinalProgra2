import React, { useState, useEffect } from 'react';
import { obtenerClientes, eliminarCliente } from '../services/ClienteService'; 
import { useNavigate } from 'react-router-dom';  
import '../estilos/ManejarClientes.css';  

const ManejarClientes = () => {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();  

  const volverAlDashboard = () => {
    navigate('/admin/dashboard');
  };

  const cargarClientes = async () => {
    const data = await obtenerClientes();
    setClientes(data);
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const eliminarClienteHandler = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este cliente?");
    if (confirmacion) {
      await eliminarCliente(id);
      cargarClientes(); 
    }
  };

  return (
    <div>
      <button onClick={volverAlDashboard}>Atrás</button>

      <h2>Listado de Clientes</h2>
      <div>
        {clientes.length > 0 ? (
          clientes.map(cliente => (
            <div key={cliente.id} className="cliente-card">
              <h3>{cliente.nombre}</h3>
              <p><strong>Email:</strong> {cliente.correoElectronico}</p>
              <p><strong>Username:</strong> {cliente.username}</p>
              <p><strong>ID:</strong> {cliente.id}</p>
              <div className="cliente-btns">
                <button 
                  className="btn-editar" 
                  onClick={() => alert("Editar cliente en desarrollo...")}
                >
                  Editar
                </button>
                <button 
                  className="btn-eliminar" 
                  onClick={() => eliminarClienteHandler(cliente.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay clientes disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ManejarClientes;
