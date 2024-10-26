import React, { useEffect, useState } from 'react';
import UsuarioService from '../services/UsuarioService';
import './Perfil.css';

const Perfil = () => {
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    UsuarioService.getPerfil().then((res) => {
      setUsuario(res.data);});}, []);

  const handleUpdate = () => {
    UsuarioService.actualizarPerfil(usuario).then(() => {
      alert('Perfil actualizado');});
    };

  return (
    <div className="perfil">
      <h2>Mi Perfil</h2>
      <label>Nombre</label>
      <input
        type="text"
        value={usuario.nombre}
        onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
      />
      <label>Email</label>
      <input
        type="email"
        value={usuario.email}
        onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
      />
      <button onClick={handleUpdate}>Actualizar Perfil</button>
    </div>
  );
};

export default Perfil;