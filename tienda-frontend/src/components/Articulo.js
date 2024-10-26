import React, { useEffect, useState } from 'react';
import api from '../service/AxiosConfig';

const Articulo = ({ articuloId }) => {
  const [articulo, setArticulo] = useState(null);

  const fetchArticulo = async () => {
    try {
      const response = await api.get(`/articulo/${articuloId}`);
      setArticulo(response.data);
    } catch (error) {
      console.error('Error al obtener el artículo:', error);
    }
  };
  useEffect(() => {
    fetchArticulo();
  }, [articuloId]);
  return (
    <div>
      {articulo ? (
        <div>
          <h2>{articulo.nombre}</h2>
          <p>{articulo.descripcion}</p>
          <p>Precio: Q{articulo.precio}</p>
        </div>
      ) : (
        <p>Cargando artículo...</p>
      )}
    </div>
  );
};

export default Articulo;