package com.example.Proyecto_Final.servicio;

import com.example.Proyecto_Final.modelo.Pedido;
import com.example.Proyecto_Final.repositorio.PedidoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PedidoServicio {

    @Autowired
    private PedidoRepositorio pedidoRepositorio;

    public Pedido crearPedido(Pedido pedido) {
        return pedidoRepositorio.save(pedido);
    }

    public List<Pedido> obtenerPedidosPorCliente(String idCliente) {
        return pedidoRepositorio.findByIdCliente(idCliente);
    }

    public void eliminarPedido(String idPedido) {
        pedidoRepositorio.deleteById(idPedido);
    }

    public void guardarPedido(Pedido pedido) {
        pedidoRepositorio.save(pedido); 
    }
    public List<Pedido> obtenerTodosLosPedidos() {
        return pedidoRepositorio.findAll();
    }
}
