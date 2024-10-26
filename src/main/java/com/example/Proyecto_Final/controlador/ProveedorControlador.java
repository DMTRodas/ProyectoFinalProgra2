package com.example.Proyecto_Final.controlador;

import com.example.Proyecto_Final.modelo.Articulo;
import com.example.Proyecto_Final.modelo.Proveedor;
import com.example.Proyecto_Final.servicio.ProveedorServicio;
import com.example.Proyecto_Final.servicio.ArticuloServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proveedores")
@CrossOrigin(origins = "http://localhost:3000")
public class ProveedorControlador {

    @Autowired
    private ProveedorServicio proveedorServicio;
    
    @Autowired
    private ArticuloServicio articuloServicio;

    @PostMapping
    public ResponseEntity<Proveedor> crearProveedor(@RequestBody Proveedor proveedor) {
        Proveedor nuevoProveedor = proveedorServicio.crearProveedor(proveedor);
        return ResponseEntity.ok(nuevoProveedor);
    }

    @GetMapping
    public ResponseEntity<List<Proveedor>> obtenerTodosLosProveedores() {
        List<Proveedor> proveedores = proveedorServicio.obtenerTodosLosProveedores();
        return ResponseEntity.ok(proveedores);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Proveedor> obtenerProveedorPorId(@PathVariable String id) {
        Proveedor proveedor = proveedorServicio.obtenerProveedorPorId(id);
        return ResponseEntity.ok(proveedor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Proveedor> actualizarProveedor(@PathVariable String id, @RequestBody Proveedor proveedorActualizado) {
        Proveedor proveedor = proveedorServicio.actualizarProveedor(id, proveedorActualizado);
        return ResponseEntity.ok(proveedor);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProveedor(@PathVariable String id) {
        proveedorServicio.eliminarProveedor(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<Proveedor>> buscarPorCategoria(@PathVariable String categoria) {
    List<Proveedor> proveedores = proveedorServicio.buscarPorCategoria(categoria);
    return ResponseEntity.ok(proveedores);
    }

     @GetMapping("/{proveedorId}/articulos")
    public ResponseEntity<List<Articulo>> obtenerArticulosPorProveedor(@PathVariable String proveedorId) {
        List<Articulo> articulos = articuloServicio.obtenerArticulosPorProveedor(proveedorId);  
        return ResponseEntity.ok(articulos);
    }

}
