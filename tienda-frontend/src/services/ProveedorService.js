import axios from './AxiosConfig';

export const obtenerProveedores = async () => {
  try {
    const response = await axios.get('/proveedores');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los proveedores:', error);
    return [];
  }
};

export const crearProveedor = async (proveedor) => {
  try {
    const response = await axios.post('/proveedores', proveedor);
    return response.data;
  } catch (error) {
    console.error('Error al crear proveedor:', error);
    return null;
  }
};

export const actualizarProveedor = async (id, proveedor) => {
  try {
    const response = await axios.put(`/proveedores/${id}`, proveedor);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar proveedor:', error);
    return null;
  }
};

export const eliminarProveedor = async (id) => {
  try {
    const response = await axios.delete(`/proveedores/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar proveedor:', error);
    return null;
  }
};

export const buscarProveedoresPorCategoria = async (categoria) => {
  try {
    const response = await axios.get(`/proveedores/categoria/${categoria}`);
    return response.data;
  } catch (error) {
    console.error('Error al buscar proveedores por categoría:', error);
    return [];
  }
};

export const obtenerArticulosPorProveedor = async (proveedorId) => {
  try {
    const response = await axios.get(`/proveedores/${proveedorId}/articulos`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los artículos por proveedor:', error);
    return [];
  }
};
