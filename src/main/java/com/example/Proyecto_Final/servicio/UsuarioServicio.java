package com.example.Proyecto_Final.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Proyecto_Final.modelo.Usuario;
import com.example.Proyecto_Final.repositorio.UsuarioRepositorio;

@Service
public class UsuarioServicio {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    // Crear un nuevo usuario
    public Usuario crearUsuario(Usuario usuario) {
        return usuarioRepositorio.save(usuario);
    }

    // Obtener todos los usuarios
    public List<Usuario> obtenerUsuarios() {
        return usuarioRepositorio.findAll();
    }

    // Buscar usuario por ID
    public Optional<Usuario> obtenerUsuarioPorId(String id) {
        return usuarioRepositorio.findById(id);
    }

    // Actualizar usuario
    public Usuario actualizarUsuario(Usuario usuario) {
        return usuarioRepositorio.save(usuario);
    }

    // Eliminar usuario por ID
    public void eliminarUsuario(String id) {
        usuarioRepositorio.deleteById(id);
    }
}
