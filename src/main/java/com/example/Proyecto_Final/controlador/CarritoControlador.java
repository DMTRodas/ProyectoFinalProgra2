package com.example.Proyecto_Final.controlador;

import com.example.Proyecto_Final.modelo.Articulo;
import com.example.Proyecto_Final.modelo.Carrito;
import com.example.Proyecto_Final.modelo.Pedido;
import com.example.Proyecto_Final.servicio.CarritoServicio;
import com.example.Proyecto_Final.servicio.PedidoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;


@RestController
@RequestMapping("/api/carrito")
@CrossOrigin(origins = "http://localhost:3000")
public class CarritoControlador {

    @Autowired
    private CarritoServicio carritoServicio;

    @Autowired
    private PedidoServicio pedidoServicio;

    @PostMapping("/agregar")
    public ResponseEntity<String> agregarAlCarrito(@RequestBody Articulo articulo, @RequestParam String clienteId) {
        System.out.println("Articulo recibido: " + articulo);
        System.out.println("Cliente ID recibido: " + clienteId);
        Carrito carrito = carritoServicio.obtenerCarritoPorCliente(clienteId);
    if (carrito == null) {
        carrito = new Carrito();
        carrito.setIdCliente(clienteId);
    }
    carrito.agregarArticulo(articulo);
    carritoServicio.guardarCarrito(carrito);  
    return ResponseEntity.ok("Producto agregado al carrito");
}
    @GetMapping("/{idCliente}")
    public ResponseEntity<Carrito> obtenerCarritoPorCliente(@PathVariable String idCliente) {
        Carrito carrito = carritoServicio.obtenerCarritoPorCliente(idCliente);
        return ResponseEntity.ok(carrito);
    }

    @DeleteMapping("/eliminar/{idCliente}/{idProducto}")
    public ResponseEntity<Void> eliminarProductoDelCarrito(@PathVariable String idCliente, @PathVariable String idProducto) {
    carritoServicio.eliminarArticuloDelCarrito(idCliente, idProducto);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
}

    @PutMapping("/actualizar-cantidad/{idCliente}/{idProducto}")
    public ResponseEntity<String> actualizarCantidad(@PathVariable String idCliente, @PathVariable String idProducto, @RequestBody Map<String, Integer> datos) {
    Carrito carrito = carritoServicio.obtenerCarritoPorCliente(idCliente);
    if (carrito != null) {
        carrito.getArticulos().forEach(articulo -> {
            if (articulo.getId().equals(idProducto)) {
                articulo.setCantidad(datos.get("cantidad"));  
            }
        });
        carritoServicio.guardarCarrito(carrito);  
        return ResponseEntity.ok("Cantidad actualizada correctamente");
    }
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al actualizar la cantidad");
}

    @PostMapping("/checkout")
    public ResponseEntity<String> realizarCompra(@RequestBody Carrito carrito) {
        Pedido nuevoPedido = new Pedido();
        nuevoPedido.setIdCliente(carrito.getIdCliente());
        nuevoPedido.setArticulos(carrito.getArticulos());
        nuevoPedido.setTotal(carrito.calcularTotal());

        pedidoServicio.crearPedido(nuevoPedido);
        carritoServicio.vaciarCarrito(carrito.getIdCliente()); 

        return ResponseEntity.ok("Compra realizada con éxito");
    }


    @DeleteMapping("/vaciar/{idCliente}")
    public ResponseEntity<String> vaciarCarrito(@PathVariable String idCliente) {
        carritoServicio.vaciarCarrito(idCliente);
        return ResponseEntity.ok("Carrito vaciado con éxito");
    }
}
