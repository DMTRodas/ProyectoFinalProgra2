import React, { useState } from 'react';
import axios from 'axios';
import '../estilos/GestionarAdministradores.css';
import { useNavigate } from 'react-router-dom';

const GestionarAdministradores = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const volverAlDashboard = () => {
    navigate('/admin/dashboard');
  };

  const handleAgregarAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/usuarios/admin/agregar', {
        correoElectronico: email,
        username: username,
        contraseña: password,
        role: 'Administrador' 
      });
      setMensaje(`Administrador ${response.data.username} agregado con éxito.`);
      setEmail('');
      setUsername('');
      setPassword('');
    } catch (error) {
      setMensaje('Error al agregar administrador. Inténtalo de nuevo.');
      console.error(error);
    }
  };

  return (
    <div className="gestionar-admin-container">
        <button onClick={volverAlDashboard}>Atrás</button>
      <h2>Agregar Nuevo Administrador</h2>
      {mensaje && <p className="mensaje">{mensaje}</p>}
      <form onSubmit={handleAgregarAdmin} className="admin-form">
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agregar Administrador</button>
      </form>
    </div>
  );
};

export default GestionarAdministradores;
