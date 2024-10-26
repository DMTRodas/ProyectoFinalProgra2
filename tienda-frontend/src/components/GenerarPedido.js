import React, { useState, useEffect } from 'react';
import { obtenerProveedores } from '../services/ProveedorService';

const GenerarPedido = () => {
  const [proveedores, setProveedores] = useState([]);
  const [selectedProveedor, setSelectedProveedor] = useState('');
  const [productos, setProductos] = useState([]);
  const [pedido, setPedido] = useState([]);

  useEffect(() => {
    const cargarProveedores = async () => {
      const data = await obtenerProveedores();
      setProveedores(data);
    };
    cargarProveedores();
  }, []);

  const handleProveedorChange = async (e) => {
    const proveedorId = e.target.value;
    setSelectedProveedor(proveedorId);

    const productosProveedor = await obtenerArticulosPorProveedor(proveedorId);
    setProductos(productosProveedor);};

  const agregarAlPedido = (producto) => {
    setPedido([...pedido, producto]);};

  const generarPedidoHandler = () => {
    console.log('Generando pedido...', pedido);};

  return (
    <div>
    <h3>Generar Pedido</h3>
    <select onChange={handleProveedorChange}>
    <option value="">Seleccionar proveedor</option>
    {proveedores.map((proveedor) => (
    <option key={proveedor.id} value={proveedor.id}>
    {proveedor.nombre}</option>))}
    </select>
      <h4>Productos del proveedor seleccionado:</h4>
      <ul>
      {productos.map((producto) => (
      <li key={producto.id}>
      {producto.nombre} - {producto.precio} 
      <button onClick={() => agregarAlPedido(producto)}>Agregar al pedido</button></li>))}
      </ul>
      <h4>Pedido actual:</h4>
      <ul>
      {pedido.map((item, index) => (
      <li key={index}>{item.nombre} - {item.precio}</li>))}
      </ul>
      <button onClick={generarPedidoHandler}>Generar Pedido</button>
    </div>);
};

export default GenerarPedido;
