import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import AxiosConfig from '../services/AxiosConfig'; 

const ResumenPedido = () => {
  const [pedido, setPedido] = useState([]);
  const [total, setTotal] = useState(0);
  const [proveedor, setProveedor] = useState(null);
  const navigate = useNavigate();  
  useEffect(() => {
    const pedidoGuardado = JSON.parse(localStorage.getItem('pedido')) || [];
    const proveedorGuardado = JSON.parse(localStorage.getItem('proveedor')) || null;
    setPedido(pedidoGuardado);
    setProveedor(proveedorGuardado);
    calcularTotal(pedidoGuardado);}, []);
  const calcularTotal = (items) => {
    const totalCalculado = items.reduce((sum, item) => {
      const cantidad = item.cantidad || 0;
      const precio = item.articulo.precio || 0;
      return sum + (precio * cantidad);}, 0);
    setTotal(totalCalculado);};

  const generarKardex = async () => {
    try {
      for (let articulo of pedido) {
        await AxiosConfig.post(`/kardex/entrada?idArticulo=${articulo.articulo.id}&cantidad=${articulo.cantidad}`);
      }
      alert('Kardex generado exitosamente');
      navigate('/admin/proveedores-pedido');  
    } catch (error) {
      console.error('Error al generar el Kardex', error);
      alert('Error al generar el Kardex');
    }
  };  

  return (
    <div>
      <h2>Resumen del Pedido</h2>
      {proveedor && (
        <div>
          <h3>Datos del Proveedor</h3>
          <p><strong>Nombre:</strong> {proveedor.nombre}</p>
          <p><strong>Email:</strong> {proveedor.contactoEmail}</p>
          <p><strong>Teléfono:</strong> {proveedor.contactoTelefono}</p>
          <p><strong>Dirección:</strong> {proveedor.direccion}</p></div>)}
      <ul>
      {pedido.map((item, index) => (
      <li key={index}>
      {item.articulo.nombre} - Cantidad: {item.cantidad} - Precio unitario: Q{item.articulo.precio || 0}</li>))}
      </ul>
      <h3>Total: Q{total}</h3>
      <button onClick={generarKardex}>Generar Kardex</button></div>);
};

export default ResumenPedido;
