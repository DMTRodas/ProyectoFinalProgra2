import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; 
import AxiosConfig from '../services/AxiosConfig';
import '../estilos/Carrito.css';

const Carrito = () => {
    const [carrito, setCarrito] = useState([]); 
    const [total, setTotal] = useState(0);
    const clienteId = localStorage.getItem('clienteId'); 
    const navigate = useNavigate(); 

    const cargarCarrito = useCallback(async () => {
        if (!clienteId) {
            console.error("Cliente no identificado");
            alert("Cliente no identificado");
            return;
        }
        try {
            const response = await AxiosConfig.get(`/carrito/${clienteId}`);
            const articulos = response.data.articulos.map((articulo) => {
            return {
            ...articulo,
            cantidad: articulo.cantidad || 1 };});
            setCarrito(articulos);
            calcularTotal(articulos); 
        } catch (error) {
            console.error("Error al cargar el carrito", error);}}, [clienteId]);

    useEffect(() => {
        cargarCarrito();}, [cargarCarrito]);

    const calcularTotal = (items) => {
        const totalCalculado = items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        setTotal(totalCalculado);
    };

    const actualizarCantidad = async (idProducto, cantidad) => {
        if (!clienteId) {
            console.error("Cliente no identificado");
            return;
        }
        try {
        const response = await AxiosConfig.put(`/carrito/actualizar-cantidad/${clienteId}/${idProducto}`, { cantidad });
        console.log("Cantidad actualizada correctamente", response);

        const carritoActualizado = carrito.map(item => {
        if (item.id === idProducto) {
        return { ...item, cantidad: parseInt(cantidad, 10) };}
        return item;});
        setCarrito(carritoActualizado); 
        calcularTotal(carritoActualizado);  
        } catch (error) {console.error("Error al actualizar la cantidad", error);}
    };

    const eliminarDelCarrito = async (idProducto) => {
        try {
            await AxiosConfig.delete(`/carrito/eliminar/${clienteId}/${idProducto}`);
            cargarCarrito();
        } catch (error) { console.error("Error al eliminar producto del carrito", error);}
    };

    const irACheckout = () => {
        localStorage.setItem('carrito', JSON.stringify(carrito)); 
        navigate('/checkout'); 
    };

    const calcularSubtotal = (items) => {
        return items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    };
    
    const calcularEnvio = () => {
        return total > 0 ? 50 : 0; 
    };

    return (
        <div className="carrito-pedido-container">
            <div className="carrito-container">
            <h2>Carrito de Compras</h2>
            <div className="productos-container">
            {carrito && carrito.length > 0 ? (
                carrito.map((item, index) => (
                <div key={item.id + index} className="producto-carrito">
                <img src={item.imagenUrl} alt={item.nombreProducto} className="imagen-producto" />
                <div className="info-producto">
                <h3>{item.nombreProducto}</h3>
                <p>Cantidad: 
                <select 
                value={item.cantidad} 
                onChange={(e) => actualizarCantidad(item.id, parseInt(e.target.value, 10))}>
                {[...Array(10).keys()].map(num => (
                <option key={num+1} value={num+1}>{num+1}</option>))}
                </select>
                </p>
                <p>Precio unitario: Q{item.precio}</p>
                <p>Precio total: Q{item.precio * item.cantidad}</p>  
                <button onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
                </div></div>))) : 
                (<p>El carrito está vacío</p>)}
                </div>
            </div>

            <div className="resumen-pedido">
                <h2>Resumen de Pedido</h2>
                <p>Subtotal: Q{calcularSubtotal(carrito)}</p>
                <p>Envío estimado: Q{calcularEnvio()}</p>
                <h3>Total: Q{calcularSubtotal(carrito) + calcularEnvio()}</h3>
                <button className="btn-realizar-compra" onClick={irACheckout} disabled={carrito.length === 0}>
                 Realizar Compra
                </button>
                <div className="informacion-extra">
                <h3>Devoluciones</h3>
                <p>Dispones de un plazo de 30 días a partir de la fecha en la que recibes el pedido para solicitar una devolución.</p>
                <h3>Envío</h3>
                <p>Entrega de 1 a 3 días hábiles en área metropolitana. Para el resto del país, entrega de 1 a 8 días hábiles.</p>
                <h3>Métodos de Pago</h3>
                <p>Depósitos, tarjetas de crédito/débito y PayPal.</p>
                </div>
            </div>
         </div>
    );
};

export default Carrito;

