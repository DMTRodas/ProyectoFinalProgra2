import AxiosConfig from './AxiosConfig';

const confirmarPedido = (pedido) => {
    return AxiosConfig.post('/api/pedidos/confirmar', pedido);
};

const obtenerPedidosPorCliente = (idCliente) => {
    return AxiosConfig.get(`/api/pedidos/cliente/${idCliente}`);
};

export default { confirmarPedido, obtenerPedidosPorCliente };
