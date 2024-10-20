package com.example.Proyecto_Final.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Proyecto_Final.dto.PedidoDTO;
import com.example.Proyecto_Final.servicio.PedidoServicio;

@RestController
@RequestMapping("/api/pedido")
public class PedidoControlador {

    @Autowired
    private PedidoServicio pedidoServicio;

    @PostMapping
    public ResponseEntity<?> crearPedido(@RequestBody PedidoDTO pedidoDTO) {
        return ResponseEntity.ok(pedidoServicio.crearPedido(pedidoDTO));
    }
}
