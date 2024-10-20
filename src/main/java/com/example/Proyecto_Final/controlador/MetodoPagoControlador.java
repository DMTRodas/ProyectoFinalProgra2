package com.example.Proyecto_Final.controlador;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.Proyecto_Final.servicio.MetodoPagoServicio;
import com.example.Proyecto_Final.modelo.MetodoPago;


@RestController
@RequestMapping("/api/metodos_pago")
public class MetodoPagoControlador {

    @Autowired
    private MetodoPagoServicio metodoPagoServicio;

    // Crear un nuevo método de pago
    @PostMapping
    public MetodoPago crearMetodoPago(@RequestBody MetodoPago metodoPago) {
        return metodoPagoServicio.crearMetodoPago(metodoPago);
    }

    // Obtener todos los métodos de pago
    @GetMapping
    public List<MetodoPago> obtenerMetodosPago() {
        return metodoPagoServicio.obtenerMetodosPago();
    }

    // Obtener un método de pago por ID
    @GetMapping("/{id}")
    public ResponseEntity<MetodoPago> obtenerMetodoPagoPorId(@PathVariable String id) {
        Optional<MetodoPago> metodoPagoOpt = metodoPagoServicio.obtenerMetodoPagoPorId(id);
        return metodoPagoOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Actualizar un método de pago
    @PutMapping("/{id}")
    public ResponseEntity<MetodoPago> actualizarMetodoPago(@PathVariable String id, @RequestBody MetodoPago metodoPago) {
        Optional<MetodoPago> metodoPagoOpt = metodoPagoServicio.obtenerMetodoPagoPorId(id);
        if (metodoPagoOpt.isPresent()) {
            MetodoPago metodoPagoExistente = metodoPagoOpt.get();
            metodoPagoExistente.setTipo(metodoPago.getTipo());
            metodoPagoExistente.setProveedor(metodoPago.getProveedor());
            metodoPagoExistente.setNumeroCuenta(metodoPago.getNumeroCuenta());
            metodoPagoExistente.setTitular(metodoPago.getTitular());
            MetodoPago metodoPagoActualizado = metodoPagoServicio.actualizarMetodoPago(metodoPagoExistente);
            return ResponseEntity.ok(metodoPagoActualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar un método de pago por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarMetodoPago(@PathVariable String id) {
        metodoPagoServicio.eliminarMetodoPago(id);
        return ResponseEntity.noContent().build();
    }
}
