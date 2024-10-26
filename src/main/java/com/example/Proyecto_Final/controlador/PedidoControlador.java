package com.example.Proyecto_Final.controlador;

import com.example.Proyecto_Final.modelo.Pedido;
import com.example.Proyecto_Final.servicio.CarritoServicio;
import com.example.Proyecto_Final.servicio.PedidoServicio;
import com.example.Proyecto_Final.servicio.ArticuloServicio; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.UUID;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "http://localhost:3000")
public class PedidoControlador {

    @Autowired
    private CarritoServicio carritoServicio;

    @Autowired
    private ArticuloServicio articuloServicio;

    @Autowired
    private PedidoServicio pedidoServicio;

    @GetMapping
    public ResponseEntity<List<Pedido>> obtenerTodosLosPedidos() {
        List<Pedido> pedidos = pedidoServicio.obtenerTodosLosPedidos();
        return ResponseEntity.ok(pedidos);
    }

    @PostMapping("/confirmar")
    public ResponseEntity<Map<String, Object>> confirmarPedido(@RequestBody Pedido nuevoPedido) {
        if (nuevoPedido.getCarrito() == null || nuevoPedido.getCarrito().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        String idPedidoCorto = UUID.randomUUID().toString().substring(0, 8);
        nuevoPedido.setIdPedido(idPedidoCorto);

        nuevoPedido.getCarrito().forEach(articulo -> {
            articuloServicio.actualizarStock(articulo.getId(), articulo.getCantidad(),"salida");
        });

        carritoServicio.vaciarCarrito(nuevoPedido.getIdCliente());

        pedidoServicio.guardarPedido(nuevoPedido);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Pedido creado con éxito");
        response.put("idPedido", nuevoPedido.getIdPedido());
        return ResponseEntity.ok(response);
        
    }
    
}
