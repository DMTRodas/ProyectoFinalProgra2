import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/Registro.css';

const Registro = () => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    correoElectronico: '',
    contraseña: '',
    username: ''
  });

  const navigate = useNavigate();

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const manejarSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/api/usuarios/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formulario),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.text(); 
      })
      .then(data => {
        alert('Registro exitoso');
        setFormulario({ nombre: '', correoElectronico: '', contraseña: '', username: '' });
        navigate('/'); 
      })
      .catch((error) => {
        console.error('Error en la petición:', error);
        alert('Error en el registro: ' + error.message);
      });
  };

  return (
    <div className="registro-container">
      <form className="registro-form" onSubmit={manejarSubmit}>
        <h2>Registrarse</h2>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formulario.nombre}
          onChange={manejarCambio}
          required
        />
        <input
          type="email"
          name="correoElectronico"
          placeholder="Correo electrónico"
          value={formulario.correoElectronico}
          onChange={manejarCambio}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={formulario.username}
          onChange={manejarCambio}
          required
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={formulario.contraseña}
          onChange={manejarCambio}
          required
        />
        <input type="submit" value="Registrarse" />
      </form>
    </div>
  );
};

export default Registro;
