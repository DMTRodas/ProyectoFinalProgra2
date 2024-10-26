import axios from './AxiosConfig';

export const obtenerCarrito = async () => {
  try {
    const response = await axios.get('/carrito');
    return response.data;
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    return null;
  }
};

export const agregarArticulo = async (articulo, clienteId) => {
  try {
    const response = await axios.post(`/carrito/agregar?clienteId=${clienteId}`, articulo);
    return response.data;
  } catch (error) {
    console.error('Error al agregar el artículo al carrito:', error);
    return null;
  }
};

export const eliminarArticulo = async (articuloId) => {
  try {
    const response = await axios.delete(`/carrito/eliminar/${articuloId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el artículo del carrito:', error);
    return null;
  }
};

export const vaciarCarrito = async () => {
  try {
    const response = await axios.delete('/carrito/vaciar');
    return response.data;
  } catch (error) {
    console.error('Error al vaciar el carrito:', error);
    return null;
  }
};