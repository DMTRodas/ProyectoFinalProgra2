package com.example.Proyecto_Final.repositorio;

import com.example.Proyecto_Final.modelo.MetodoPago;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MetodoPagoRepositorio extends MongoRepository<MetodoPago, String> {
    
}