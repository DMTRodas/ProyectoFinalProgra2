package com.example.Proyecto_Final.repositorio;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.Proyecto_Final.modelo.Usuario;

@Repository
public interface UsuarioRepositorio extends MongoRepository<Usuario, String> {
    Usuario findByCorreoElectronico(String correoElectronico); 
}