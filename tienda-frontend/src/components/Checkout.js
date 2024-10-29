import React, { useState, useEffect } from 'react';
import AxiosConfig from '../services/AxiosConfig';
import { useNavigate } from 'react-router-dom';
import '../estilos/Checkout.css';

const Checkout = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tarjeta, setTarjeta] = useState({
    numero: '',
    fechaExpiracion: '',
    cvc: '',
    titular: '',
  });
  const [depositoImagen, setDepositoImagen] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const clienteId = localStorage.getItem('clienteId');
  const navigate = useNavigate();

  useEffect(() => {
    const carritoLocal = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoLocal);
    calcularTotal(carritoLocal);
  }, []);

  const calcularTotal = (items) => {
    const totalCalculado = items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    setTotal(totalCalculado);
  };

  const realizarPedido = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const pedido = {
      clienteId,
      nombre,
      apellido,
      direccion,
      ciudad,
      telefono,
      metodoPago,
      observaciones,
      carrito,
      total,  
    };

    try {
      const response = await AxiosConfig.post('/pedidos/confirmar', pedido);
      const idPedido = response.data.idPedido;
      
      await AxiosConfig.delete(`/carrito/vaciar/${clienteId}`);
      localStorage.removeItem('carrito');
      navigate('/compra-exitosa', { state: { idPedido } });} 
      catch (error) {console.error('Error al realizar el pedido', error);} 
      finally {setIsSubmitting(false);}
  };

  const handleDepositoImagenChange = (e) => {
    setDepositoImagen(e.target.files[0]);
  };
  return (
    <div className="checkout-container">
      <h2>Confirmación de Pedido</h2>
      <div className="form-container">
      <div className="form-group">
        <label>Nombre</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="form-group">
        <label>Apellidos</label>
        <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
        </div>
        <div className="form-group">
        <label>Dirección</label>
        <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
        </div>
        <div className="form-group">
        <label>Ciudad</label>
        <input type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
        </div>
        <div className="form-group">
        <label>Teléfono</label>
        <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        </div>
        <div className="metodos-pago">
          <label>
          <img src="/images/telefono.png" alt="Depósitos" />
          <input
          type="radio"
          name="metodoPago"
          value="deposito"
          onChange={(e) => setMetodoPago(e.target.value)}
            />
            Depósitos
          </label>
          <label>
          <img src="/images/pago-en-linea.png" alt="Tarjeta de crédito/débito" />
          <input
          type="radio"
          name="metodoPago"
          value="tarjeta"
          onChange={(e) => setMetodoPago(e.target.value)}
            />
            Tarjeta de crédito/débito
          </label>
          <label>
          <img src="/images/paypal.png" alt="PayPal" />
          <input
          type="radio"
          name="metodoPago"
          value="paypal"
          onChange={(e) => setMetodoPago(e.target.value)}
            />
            PayPal
          </label>
        </div>

        {metodoPago === 'deposito' && (
          <div className="informacion-deposito">
          <h3>Depósito bancario</h3>
          <p>Banco Industrial</p>
          <p>Cuenta Monetaria: 844000327-0</p>
          <p>A nombre de: Dulce Monterroso</p>
          <div className="form-group">
          <label>Adjuntar imagen del comprobante de depósito</label>
          <input type="file" onChange={handleDepositoImagenChange} />
          </div>
          </div>)}

        {metodoPago === 'tarjeta' && (
          <div className="informacion-tarjeta">
          <h3>Pago con tarjeta</h3>
          <div className="form-group">
          <label>Número de la tarjeta</label>
          <input
            type="text"
            value={tarjeta.numero}
            onChange={(e) => setTarjeta({ ...tarjeta, numero: e.target.value })}/>
            </div>
            <div className="form-group">
            <label>Fecha de Expiración</label>
            <input
              type="text"
              placeholder="MM/YY"
              value={tarjeta.fechaExpiracion}
              onChange={(e) => setTarjeta({ ...tarjeta, fechaExpiracion: e.target.value })}/>
            </div>
            <div className="form-group">
              <label>CVC</label>
              <input
              type="text"
              value={tarjeta.cvc}
              onChange={(e) => setTarjeta({ ...tarjeta, cvc: e.target.value })}/>
            </div>
            <div className="form-group">
            <label>Nombre del titular</label>
            <input
              type="text"
              value={tarjeta.titular}
              onChange={(e) => setTarjeta({ ...tarjeta, titular: e.target.value })}/>
            </div>
          </div>)}

        {metodoPago === 'paypal' && (
          <div className="informacion-paypal">
          <h3>Pagar con PayPal</h3>
          <p>Serás redirigido a la página de PayPal para completar el pago.</p>
          </div>)}
        <div className="form-group">
          <label>Observaciones</label>
          <textarea value={observaciones} onChange={(e) => setObservaciones(e.target.value)} />
        </div>
        <button className="btn-realizar-pedido" onClick={realizarPedido} disabled={isSubmitting}>
          Confirmar Pedido
        </button>
        </div>
     </div>);};
export default Checkout;