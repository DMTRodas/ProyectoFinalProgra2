package com.example.Proyecto_Final.repositorio;

import com.example.Proyecto_Final.modelo.Kardex;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KardexRepositorio extends MongoRepository<Kardex, String> {
}
