package com.example.Proyecto_Final.repositorio;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.Proyecto_Final.modelo.Empresa;

@Repository
public interface EmpresaRepositorio extends MongoRepository<Empresa, String> {
    
}
