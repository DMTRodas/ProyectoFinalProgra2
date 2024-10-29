import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerProveedores, obtenerArticulosPorProveedor } from '../services/ProveedorService';
import '../estilos/ProveedorPedidos.css';

const ProveedorPedidos = () => {
  const [proveedores, setProveedores] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const [mostrarProveedores, setMostrarProveedores] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState('');
  const [pedido, setPedido] = useState([]);
  const [cantidades, setCantidades] = useState({});
  const navigate = useNavigate();

  const volverAlDashboard = () => {
    navigate('/admin/dashboard');};

  const cargarProveedores = async () => {
    const data = await obtenerProveedores();
    setProveedores(data);
  };
  const cargarArticulos = async (proveedorId) => {
    const data = await obtenerArticulosPorProveedor(proveedorId);
    setArticulos(data);
  };
  useEffect(() => {
    cargarProveedores();
  }, []);
  const handleVerProveedores = () => {
    setMostrarProveedores(true);
  };
  const handleRealizarPedido = () => {
    setMostrarProveedores(false);
  };
  const manejarCategoria = (e) => {
    setCategoriaSeleccionada(e.target.value);
  };
  const manejarProveedor = (e) => {
    setProveedorSeleccionado(e.target.value);
    cargarArticulos(e.target.value);
    const proveedorSeleccionado = proveedores.find(p => p.id === e.target.value);
    localStorage.setItem('proveedor', JSON.stringify(proveedorSeleccionado));
  };
  const continuarPedido = () => {
    localStorage.setItem('pedido', JSON.stringify(pedido));
    navigate('/resumen-pedido');
  };
  const manejarCambioCantidad = (articuloId, cantidad) => {
    setCantidades({ ...cantidades, [articuloId]: cantidad });
  };
  const agregarAlPedido = (articulo) => {
    const cantidad = cantidades[articulo.id] || 1;
    setPedido([...pedido, { articulo, cantidad }]);
  };
  return (
    <div className="proveedor-pedidos-container">
      <button onClick={volverAlDashboard}>Atrás</button>
      <h2>Proveedores y Pedidos</h2>
      <div className="menu-pedidos">
      <button onClick={handleVerProveedores}>Ver listado de proveedores</button>
      <button onClick={handleRealizarPedido}>Realizar pedido</button>
      </div>
      {mostrarProveedores ? (
        <div className="proveedor-list">
          {proveedores.length > 0 ? (
            proveedores.map((proveedor) => (
              <div key={proveedor.id} className="proveedor-card">
                <h3>{proveedor.nombre}</h3>
                <p><strong>Correo Electrónico:</strong> {proveedor.contactoEmail}</p>
                <p><strong>Teléfono:</strong> {proveedor.contactoTelefono}</p>
                <p><strong>Dirección:</strong> {proveedor.direccion}</p>
                <p><strong>Categoría:</strong> {proveedor.categoria}</p>
              </div>))) : (<p>No hay proveedores disponibles.</p>)}</div>): (
        <div className="realizar-pedido">
          <h3>Generar Pedido</h3>
          <form>
          <label>
          Selecciona la categoría:
            <select value={categoriaSeleccionada} onChange={manejarCategoria}>
              <option value="">Selecciona una categoría</option>
              <option value="bolsas">Bolsas</option>
              <option value="vestidos">Vestidos</option>
              <option value="chaquetas">Chaquetas</option>
              <option value="playera">Playeras</option>
              <option value="bolsas">Bolsas</option>
              <option value="camisa">Camisas</option>
              </select>
              
            </label>
            <label>
              Selecciona el proveedor:
              <select value={proveedorSeleccionado} onChange={manejarProveedor}>
                <option value="">Selecciona un proveedor</option>
                {proveedores
                .filter((p) => p.categoria === categoriaSeleccionada)
                .map((proveedor) => (
                <option key={proveedor.id} value={proveedor.id}>
                {proveedor.nombre}</option>))}</select> </label></form>

          <div className="articulos-list">
            {articulos.map((articulo) => (
            <div key={articulo.id} className="articulo-card">
            <img src={articulo.imagenUrl} alt={articulo.nombre} />
            <div className="articulo-info">
            <p>{articulo.nombre}</p>
            <div className="articulo-precio-cantidad">
            <p>Precio: Q{articulo.precio}</p>
            <input
              type="number"
              placeholder="Cantidad"
              min="1"
              value={cantidades[articulo.id] || 1}
              onChange={(e) => manejarCambioCantidad(articulo.id, e.target.value)}/>
                <button onClick={() => agregarAlPedido(articulo)}>Agregar a la orden</button>
                <button onClick={continuarPedido}>Continuar pedido</button></div>
            </div>
          </div>))}
          </div>
          {pedido.length > 0 && (
          <div className="resumen-pedido">
          <h4>Resumen del Pedido</h4>
          {pedido.map((item, index) => (
          <div key={index}>
          <p>{item.articulo.nombre} - Cantidad: {item.cantidad}</p></div>))}
            </div>)}
        </div>)}
    </div>);
};

export default ProveedorPedidos;
