package com.example.Proyecto_Final.repositorio;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.Proyecto_Final.modelo.Articulo;

@Repository
public interface ArticuloRepositorio extends MongoRepository<Articulo, String> {
   
}
