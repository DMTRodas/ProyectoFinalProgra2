package com.example.Proyecto_Final.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Proyecto_Final.dto.PedidoDTO;
import com.example.Proyecto_Final.modelo.Pedido;
import com.example.Proyecto_Final.repositorio.PedidoRepositorio;

@Service
public class PedidoServicio {

    @Autowired
    private PedidoRepositorio pedidoRepositorio;

    @Autowired
    private CarritoServicio carritoServicio;

    public Pedido crearPedido(PedidoDTO pedidoDTO) {
        Pedido pedido = new Pedido();
        pedido.setArticulos(pedidoDTO.getArticulos());
        pedido.setTotal(pedidoDTO.getTotal());
        pedido.setMetodoPago(pedidoDTO.getMetodoPago());
        
        // Limpiar el carrito después de confirmar el pedido
        carritoServicio.limpiarCarrito();
        
        return pedidoRepositorio.save(pedido);
    }
}
