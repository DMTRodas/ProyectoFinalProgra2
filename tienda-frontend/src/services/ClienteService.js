import axios from './AxiosConfig';

export const obtenerClientes = async () => {
  try {
    const response = await axios.get('/clientes');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    return [];
  }
};

export const eliminarCliente = async (id) => {
  try {
    await axios.delete(`/clientes/${id}`);
  } catch (error) {
    console.error('Error al eliminar el cliente:', error);
  }
};
