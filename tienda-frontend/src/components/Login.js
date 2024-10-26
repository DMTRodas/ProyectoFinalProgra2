import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosConfig from '../services/AxiosConfig';
import { useCliente } from '../components/ClienteContext'; 
import '../estilos/Login.css';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const { setCliente } = useCliente(); 
  const navigate = useNavigate();
  const manejarCambioCorreo = (e) => {
    setCorreo(e.target.value);
  };
  const manejarCambioPassword = (e) => {
    setPassword(e.target.value);
  };
  const manejarSubmitPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await AxiosConfig.post('/usuarios/login', { correoElectronico: correo, contraseña: password });
      if (response.data === 'Inicio de sesión exitoso como administrador') {
        navigate('/admin/dashboard');
      } else if (response.data.perfil === 'CLIENTE') {
        setCliente(response.data);  
        navigate('/', { state: { cliente: response.data.nombre } });
      } else {
        alert('Credenciales incorrectas o no autorizado');
      }
    } catch (error) {
      console.error("Error durante la autenticación", error);
      alert('Hubo un problema durante la autenticación');}
  };

  return (
    <div className="login-container">
    <div className="login-box">
     <h2>Iniciar sesión</h2> 
       <form onSubmit={manejarSubmitPassword}>
       <input
        type="email"
        placeholder="Correo electrónico"
        value={correo}
        onChange={manejarCambioCorreo}
        required/>
        <input
        type="password"
        placeholder="Contraseña"
         value={password}
         onChange={manejarCambioPassword}
         required/>
          <button type="submit">Iniciar Sesión</button>
        </form> </div>
    </div>);
};

export default Login;
