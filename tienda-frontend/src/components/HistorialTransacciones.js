import React from 'react';
import { useNavigate } from 'react-router-dom';

const HistorialTransacciones = () => {
  const navigate = useNavigate();
  const irAKardex = () => {
    navigate('/kardex');};

  const irAHistorialVentas = () => {
    navigate('/admin/historial-ventas');};

  return (
    <div>
    <h2>Historial de Transacciones</h2>
    <div>
    <button onClick={irAKardex}>Generar Kardex</button></div>
    <div>
    <button onClick={irAHistorialVentas}>Generar Historial de Ventas</button></div>
    </div>);
};

export default HistorialTransacciones;
