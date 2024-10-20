package com.example.Proyecto_Final.controlador;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Proyecto_Final.modelo.Usuario;
import com.example.Proyecto_Final.servicio.UsuarioServicio;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioControlador {

    @Autowired
    private UsuarioServicio usuarioServicio;

    // Crear un nuevo usuario
    @PostMapping
    public Usuario crearUsuario(@RequestBody Usuario usuario) {
        return usuarioServicio.crearUsuario(usuario);
    }

    // Obtener todos los usuarios
    @GetMapping
    public List<Usuario> obtenerUsuarios() {
        return usuarioServicio.obtenerUsuarios();
    }

    // Obtener un usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerUsuarioPorId(@PathVariable String id) {
        Optional<Usuario> usuarioOpt = usuarioServicio.obtenerUsuarioPorId(id);
        return usuarioOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Actualizar un usuario
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable String id, @RequestBody Usuario usuario) {
        Optional<Usuario> usuarioOpt = usuarioServicio.obtenerUsuarioPorId(id);
        if (usuarioOpt.isPresent()) {
            Usuario usuarioExistente = usuarioOpt.get();
            usuarioExistente.setNombre(usuario.getNombre());
            usuarioExistente.setCorreoElectronico(usuario.getCorreoElectronico());
            usuarioExistente.setContraseña(usuario.getContraseña());
            usuarioExistente.setPerfil(usuario.getPerfil());
            Usuario usuarioActualizado = usuarioServicio.actualizarUsuario(usuarioExistente);
            return ResponseEntity.ok(usuarioActualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar un usuario por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable String id) {
        usuarioServicio.eliminarUsuario(id);
        return ResponseEntity.noContent().build();
    }
}
