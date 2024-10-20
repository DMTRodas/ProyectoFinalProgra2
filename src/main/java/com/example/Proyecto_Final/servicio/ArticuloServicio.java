package com.example.Proyecto_Final.servicio;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Proyecto_Final.modelo.Articulo;
import com.example.Proyecto_Final.repositorio.ArticuloRepositorio;

@Service
public class ArticuloServicio {

    @Autowired
    private ArticuloRepositorio articuloRepositorio;

    // Método para crear un nuevo artículo
    public Articulo crearArticulo(Articulo articulo) {
        return articuloRepositorio.save(articulo);
    }

    // Obtener todos los artículos
    public List<Articulo> obtenerArticulos() {
        return articuloRepositorio.findAll();
    }

    // Obtener artículo por ID
    public Articulo obtenerArticuloPorId(String id) {
        return articuloRepositorio.findById(id).orElse(null);
    }

    // Actualizar artículo
    public Articulo actualizarArticulo(Articulo articulo) {
        return articuloRepositorio.save(articulo);
    }

    // Eliminar artículo por ID
    public void eliminarArticulo(String id) {
        articuloRepositorio.deleteById(id);
    }
}
