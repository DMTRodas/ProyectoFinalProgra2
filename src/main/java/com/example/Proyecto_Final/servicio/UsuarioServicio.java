package com.example.Proyecto_Final.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import com.example.Proyecto_Final.modelo.Usuario;
import com.example.Proyecto_Final.repositorio.UsuarioRepositorio;

@Service
public class UsuarioServicio {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public Usuario crearUsuario(Usuario usuario) {
        return usuarioRepositorio.save(usuario);
    }

    public List<Usuario> obtenerUsuarios() {
        return usuarioRepositorio.findAll();
    }

    public Optional<Usuario> obtenerUsuarioPorId(String id) {
        return usuarioRepositorio.findById(id);
    }

    public Usuario actualizarUsuario(Usuario usuario) {
        return usuarioRepositorio.save(usuario);
    }

    public void eliminarUsuario(String id) {
        usuarioRepositorio.deleteById(id);
    }

    public Usuario findByCorreoElectronico(String correoElectronico) {
        return usuarioRepositorio.findByCorreoElectronico(correoElectronico);
    }
    
    public Usuario login(String correo, String contraseña) {
        Usuario usuario = usuarioRepositorio.findByCorreoElectronico(correo);
        if (usuario != null && usuario.getContraseña().equals(contraseña)) {  
            return usuario;
        } else {
            throw new RuntimeException("Credenciales incorrectas");
        }
    }

    public List<Usuario> obtenerTodosUsuarios() {
        return usuarioRepositorio.findAll();
    }
}
