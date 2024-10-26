package com.example.Proyecto_Final.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.example.Proyecto_Final.modelo.Articulo;
import com.example.Proyecto_Final.repositorio.ArticuloRepositorio;

@Service
public class ArticuloServicio {

    @Autowired
    private ArticuloRepositorio articuloRepositorio;

    public Articulo crearArticulo(Articulo articulo) {
        return articuloRepositorio.save(articulo);
    }

    public List<Articulo> obtenerArticulos() {
        return articuloRepositorio.findAll();
    }

    public List<Articulo> obtenerProductosPorGenero(String genero) {
        return articuloRepositorio.findByGenero(genero);
    }

    public Articulo obtenerArticuloPorId(String id) {
        Optional<Articulo> articuloOpt = articuloRepositorio.findById(id);
        return articuloOpt.orElse(null); 
    }

    public Articulo actualizarArticulo(Articulo articulo) {
        return articuloRepositorio.save(articulo);
    }

    public void eliminarArticulo(String id) {
        articuloRepositorio.deleteById(id);
    }

    public void actualizarStock(String idArticulo, int cantidad, String tipoMovimiento) {
        Optional<Articulo> articuloOpt = articuloRepositorio.findById(idArticulo);
        if (articuloOpt.isPresent()) {
            Articulo articulo = articuloOpt.get();
            int nuevoStock = tipoMovimiento.equals("entrada") 
                ? articulo.getStock() + cantidad  
                : articulo.getStock() - cantidad; 

            if (nuevoStock >= 0) {
                articulo.setStock(nuevoStock);
                articuloRepositorio.save(articulo); 
            }
        }
    }

    public List<Articulo> obtenerArticulosPorCategoria(String categoria) {
        return articuloRepositorio.findByCategoria(categoria);
    }

    public List<Articulo> obtenerArticulosPorProveedor(String proveedorId) {
        return articuloRepositorio.findByProveedorId(proveedorId);
    }
}
