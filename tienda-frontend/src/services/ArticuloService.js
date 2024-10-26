import AxiosConfig from './AxiosConfig'; 

const ArticuloService = {
    obtenerArticulosPorGenero: (genero) => {
        return AxiosConfig.get(`/articulos/genero/${genero}`);
    },
    obtenerArticulos: () => {
        return AxiosConfig.get('/articulos');
    },
    crearArticulo: (articulo) => {
        return AxiosConfig.post('/articulos', articulo);
    },
    actualizarArticulo: (id, articulo) => {
        return AxiosConfig.put(`/articulos/${id}`, articulo);
    },
    eliminarArticulo: (id) => {
        return AxiosConfig.delete(`/articulos/${id}`);
    },
};

export default ArticuloService;
