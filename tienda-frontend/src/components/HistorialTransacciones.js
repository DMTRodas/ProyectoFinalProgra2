import { useNavigate } from 'react-router-dom';

const HistorialTransacciones = () => {
    const navigate = useNavigate();

    const volverAlDashboard = () => {
        navigate('/admin/dashboard');
      };
    
    return (
        <div>
            <button onClick={volverAlDashboard}>Atrás</button>
            <h2>Historial de Transacciones</h2>
            <button onClick={() => navigate('/kardex')}>Generar Kardex</button>
            <button onClick={() => navigate('/admin/historial-ventas')}>Generar Historial de Ventas</button>
        </div>
    );
};

export default HistorialTransacciones;
