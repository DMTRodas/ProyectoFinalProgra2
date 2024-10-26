package com.example.Proyecto_Final.repositorio;

import com.example.Proyecto_Final.modelo.Proveedor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProveedorRepositorio extends MongoRepository<Proveedor, String> {
    List<Proveedor> findByCategoria(String categoria);   
}