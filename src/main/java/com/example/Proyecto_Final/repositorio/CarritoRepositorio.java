package com.example.Proyecto_Final.repositorio;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.Proyecto_Final.modelo.Carrito;

@Repository
public interface CarritoRepositorio extends MongoRepository<Carrito, String> {
    Optional<Carrito> findByIdCliente(String idCliente);
}
