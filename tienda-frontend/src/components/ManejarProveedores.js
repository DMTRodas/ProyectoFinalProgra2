import React, { useState, useEffect } from 'react';
import { buscarProveedoresPorCategoria, obtenerArticulosPorProveedor, crearProveedor } from '../services/ProveedorService'; 
import { useNavigate } from 'react-router-dom';  
import '../estilos/ManejarProveedores.css';

const ManejarProveedores = () => {

  const [proveedores, setProveedores] = useState([]);
  const navigate = useNavigate();  
  const [articulos, setArticulos] = useState({});
  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombre: '',
    direccion: '',
    contactoTelefono: '',  
    contactoEmail: '',     
    productosSuministrados: '',
    categoria: ''
  });
  const [categoriaFiltro, setCategoriaFiltro] = useState('');

  const volverAlDashboard = () => {
    navigate('/admin/dashboard');};

  const buscarProveedores = async () => {
    try {
      const proveedoresFiltrados = await buscarProveedoresPorCategoria(categoriaFiltro);
      setProveedores(proveedoresFiltrados);

      const articulosPorProveedor = {};
      for (const proveedor of proveedoresFiltrados) {
        const articulosProveedor = await obtenerArticulosPorProveedor(proveedor.id);
        articulosPorProveedor[proveedor.id] = articulosProveedor; }
      setArticulos(articulosPorProveedor);
    } catch (error) {
      console.error('Error al buscar proveedores por categoría', error);
    }};

  const agregarProveedor = async (e) => {
    e.preventDefault();
    try {
      await crearProveedor(nuevoProveedor);
      limpiarFormulario();
      alert('Proveedor agregado con éxito');
    } catch (error) {
      console.error('Error al agregar el proveedor:', error);}
  };

  const limpiarFormulario = () => {
    setNuevoProveedor({
      nombre: '',
      direccion: '',
      contactoTelefono: '',  
      contactoEmail: '',     
      productosSuministrados: '',
      categoria: ''});
  };

  const handleInputChange = (e) => {
    setNuevoProveedor({
      ...nuevoProveedor,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="manejar-proveedores-container">
      <button onClick={volverAlDashboard}>Atrás</button>
      <h2>Manejar Proveedores</h2>

      <input
        type="text"
        placeholder="Buscar por categoría"
        value={categoriaFiltro}
        onChange={(e) => setCategoriaFiltro(e.target.value)}
      />
      <button onClick={buscarProveedores}>Buscar</button>

      <form onSubmit={agregarProveedor}>
        <h3>Agregar Proveedor</h3>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={nuevoProveedor.nombre}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={nuevoProveedor.direccion}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="contactoTelefono"
          placeholder="Teléfono"
          value={nuevoProveedor.contactoTelefono}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="contactoEmail"
          placeholder="Correo"
          value={nuevoProveedor.contactoEmail}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="productosSuministrados"
          placeholder="Productos"
          value={nuevoProveedor.productosSuministrados}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={nuevoProveedor.categoria}
          onChange={handleInputChange}
        />
        <button type="submit">Agregar Proveedor</button>
      </form>

      <div className="lista-proveedores">
        {proveedores.length > 0 ? (
          proveedores.map((proveedor) => (
            <div key={proveedor.id} className="proveedor-contenedor">
            <div className="proveedor-card">
            <div className="proveedor-info">
            <h3>{proveedor.nombre}</h3>
            <p><strong>Dirección:</strong> {proveedor.direccion}</p>
            <p><strong>Teléfono:</strong> {proveedor.contactoTelefono}</p>
            <p><strong>Email:</strong> {proveedor.contactoEmail}</p>
            <p><strong>Productos:</strong> {proveedor.productosSuministrados}</p>
            <p><strong>Categoría:</strong> {proveedor.categoria}</p></div>

                <h4>Artículos asociados:</h4>
                <div className="articulos-proveedor">
                {articulos[proveedor.id] && articulos[proveedor.id].length > 0 ? (
                articulos[proveedor.id].map((articulo) => (
                <div key={articulo.id} className="articulo-card">
                <img src={articulo.imagenUrl} alt={articulo.nombre} className="articulo-imagen" />
                <div className="articulo-info">
                <h5>{articulo.nombre}</h5>
                <p>{articulo.descripcion}</p>
                <p><strong>Precio:</strong> {articulo.precio}</p>
                </div>
              </div>))) : ( <p>No hay artículos asociados a este proveedor.</p>)}
              </div>
              </div>
            </div>))) : (<p>No hay proveedores registrados o no se encontraron resultados para esta categoría.</p>)}
      </div>
    </div>);
};

export default ManejarProveedores;
