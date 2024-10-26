import React, { useEffect, useState } from 'react';
import AxiosConfig from '../services/AxiosConfig';

const HistorialTransacciones = () => {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        cargarPedidos();
    }, []);

    const cargarPedidos = async () => {
        try {
            const response = await AxiosConfig.get(`/api/pedidos/cliente/${localStorage.getItem('clienteId')}`);
            setPedidos(response.data);} 
            catch (error) {
            console.error("Error al cargar el historial de pedidos", error); }
    };
    return (
        <div>
        <h2>Historial de Compras</h2>
        <ul>
        {pedidos.map((pedido, index) => (
         <li key={pedido.idPedido}>
         Compra realizada el {new Date(pedido.fechaCompra).toLocaleDateString()} - Total: Q{pedido.total}
         <ul>
        {pedido.articulos.map((articulo, idx) => (
         <li key={articulo.id}>{articulo.nombre} - Cantidad: {articulo.cantidad} - Precio: Q{articulo.precio}</li>))}</ul></li>))}
        </ul>
        </div>);
};

export default HistorialTransacciones;
