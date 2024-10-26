package com.example.Proyecto_Final.repositorio;

import com.example.Proyecto_Final.modelo.Carrito;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface CarritoRepositorio extends MongoRepository<Carrito, String> {
    Optional<Carrito> findFirstByIdCliente(String idCliente);
}