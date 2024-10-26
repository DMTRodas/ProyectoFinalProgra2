package com.example.Proyecto_Final.controlador;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;

import com.example.Proyecto_Final.modelo.Articulo;
import com.example.Proyecto_Final.servicio.ArticuloServicio;

@RestController
@RequestMapping("/api/articulos")
@CrossOrigin(origins = "http://localhost:3000")
public class ArticuloControlador {

    @Autowired
    private ArticuloServicio articuloServicio;

    @Value("${app.upload-dir}")  
    private String uploadDir;

    @PostMapping
    public Articulo crearArticulo(@RequestBody Articulo articulo) {
        return articuloServicio.crearArticulo(articulo);
    }

    @GetMapping
    public List<Articulo> obtenerArticulos() {
        return articuloServicio.obtenerArticulos();
    }

    @GetMapping("/genero/{genero}")
    public ResponseEntity<List<Articulo>> obtenerArticuloPorGenero(@PathVariable String genero) {
    List<Articulo> articulos = articuloServicio.obtenerProductosPorGenero(genero);
    return ResponseEntity.ok(articulos);
}
    @PutMapping("/{id}")
    public ResponseEntity<Articulo> actualizarArticulo(@PathVariable String id, @RequestBody Articulo articulo) {
        Articulo articuloActualizado = articuloServicio.actualizarArticulo(articulo);
        return ResponseEntity.ok(articuloActualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarArticulo(@PathVariable String id) {
        articuloServicio.eliminarArticulo(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile file) {
        try {
            String rutaDirectorio = "C:/Users/Dulce/Desktop/Imagenes_TiendaOnline/";
            Path path = Paths.get(rutaDirectorio + file.getOriginalFilename());
    
            if (!Files.exists(path.getParent())) {
                Files.createDirectories(path.getParent());
            }
    
            Files.write(path, file.getBytes());
    
            String urlImagen = "/imagenes/" + file.getOriginalFilename();
            return ResponseEntity.ok(urlImagen);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir la imagen");
        }
    }
    

    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<Articulo>> obtenerArticulosPorCategoria(@PathVariable String categoria) {
        List<Articulo> articulos = articuloServicio.obtenerArticulosPorCategoria(categoria);
        return ResponseEntity.ok(articulos);
    }

    @GetMapping("/proveedor/{proveedorId}")
    public ResponseEntity<List<Articulo>> obtenerArticulosPorProveedor(@PathVariable String proveedorId) {
        List<Articulo> articulos = articuloServicio.obtenerArticulosPorProveedor(proveedorId);
        return ResponseEntity.ok(articulos);
    }

}
