package com.example.Proyecto_Final.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Proyecto_Final.modelo.Carrito;
import com.example.Proyecto_Final.servicio.CarritoServicio;

@RestController
@RequestMapping("/carrito")
public class CarritoControlador {

    @Autowired
    private CarritoServicio carritoServicio;

    @GetMapping
    public ResponseEntity<Carrito> obtenerCarrito() {
        Carrito carrito = carritoServicio.obtenerCarrito();
        return ResponseEntity.ok(carrito);
    }

    @DeleteMapping("/articulo/{id}")
    public ResponseEntity<Void> eliminarArticulo(@PathVariable String id) {
        carritoServicio.eliminarArticulo(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/vaciar")
    public ResponseEntity<Void> vaciarCarrito() {
        carritoServicio.vaciarCarrito();
        return ResponseEntity.noContent().build();
    }
}
