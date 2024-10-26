package com.example.Proyecto_Final.repositorio;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.Proyecto_Final.modelo.Articulo;

@Repository
public interface ArticuloRepositorio extends MongoRepository<Articulo, String> {
    List<Articulo> findByGenero(String genero);
    List<Articulo> findByCategoria(String categoria);
    List<Articulo> findByProveedorId(String proveedorId);
}
