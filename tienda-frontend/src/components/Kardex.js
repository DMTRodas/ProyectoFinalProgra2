import React, { useState, useEffect } from 'react';
import AxiosConfig from '../services/AxiosConfig';
import { useNavigate } from 'react-router-dom';
import '../estilos/Kardex.css';

const Kardex = () => {
    const [movimientos, setMovimientos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        cargarMovimientos();
    }, []);

    const volverAlHistorialTransacciones = () => {
        navigate('/admin/historial-transacciones');
      };
    
    const cargarMovimientos = async () => {
        try {
            const response = await AxiosConfig.get('/kardex');
            setMovimientos(response.data);
        } catch (error) {
            console.error('Error al cargar los movimientos del Kardex', error);
        }
    };

    return (
        <div>
            <button onClick={volverAlHistorialTransacciones}>Atrás</button>
            <h2>Kardex de Movimientos</h2>
            {movimientos.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Artículo</th>
                            <th>Cantidad</th>
                            <th>Tipo de Movimiento</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                    {movimientos.map((movimiento, index) => (
                        <tr key={index}>
                        <td>{movimiento.idProducto || "Artículo no disponible"}</td>
                        <td>{movimiento.cantidad}</td>
                        <td>{movimiento.tipoMovimiento}</td>
                        <td>{new Date(movimiento.fechaMovimiento).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            ) : (
                <p>No hay movimientos registrados en el kardex.</p>
            )}
        </div>
    );
};

export default Kardex;
