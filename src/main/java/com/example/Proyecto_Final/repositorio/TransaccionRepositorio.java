package com.example.Proyecto_Final.repositorio;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Proyecto_Final.modelo.Transaccion;

public interface TransaccionRepositorio extends MongoRepository<Transaccion, String> {
    List<Transaccion> findByClienteId(String clienteId); 
}
