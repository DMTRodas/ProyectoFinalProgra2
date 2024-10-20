package com.example.Proyecto_Final.controlador;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Proyecto_Final.modelo.Articulo;
import com.example.Proyecto_Final.servicio.ArticuloServicio;

@RestController
@RequestMapping("/api/articulos")
public class ArticuloControlador {

    @Autowired
    private ArticuloServicio articuloServicio;

    // Crear un nuevo artículo
    @PostMapping
    public Articulo crearArticulo(@RequestBody Articulo articulo) {
        return articuloServicio.crearArticulo(articulo);
    }

    // Obtener todos los artículos
    @GetMapping
    public List<Articulo> obtenerArticulos() {
        return articuloServicio.obtenerArticulos();
    }

    // Obtener un artículo por ID
    @GetMapping("/{id}")
    public ResponseEntity<Articulo> obtenerArticuloPorId(@PathVariable String id) {
        Articulo articulo = articuloServicio.obtenerArticuloPorId(id);
        return articulo != null ? ResponseEntity.ok(articulo) : ResponseEntity.notFound().build();
    }

    // Actualizar un artículo
    @PutMapping("/{id}")
    public ResponseEntity<Articulo> actualizarArticulo(@PathVariable String id, @RequestBody Articulo articulo) {
        Articulo articuloActualizado = articuloServicio.actualizarArticulo(articulo);
        return ResponseEntity.ok(articuloActualizado);
    }

    // Eliminar un artículo por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarArticulo(@PathVariable String id) {
        articuloServicio.eliminarArticulo(id);
        return ResponseEntity.noContent().build();
    }
}
