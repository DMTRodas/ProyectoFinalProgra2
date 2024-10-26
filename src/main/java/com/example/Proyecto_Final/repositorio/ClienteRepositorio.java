package com.example.Proyecto_Final.repositorio;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.Proyecto_Final.modelo.Usuario;
import java.util.List;

@Repository
public interface ClienteRepositorio extends MongoRepository<Usuario, String> {
    List<Usuario> findByPerfil(String perfil);
}
