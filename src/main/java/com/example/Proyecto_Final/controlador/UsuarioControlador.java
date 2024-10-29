package com.example.Proyecto_Final.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.Proyecto_Final.modelo.Usuario;
import com.example.Proyecto_Final.servicio.UsuarioServicio;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:3000") 
public class UsuarioControlador {

    @Autowired
    private UsuarioServicio usuarioServicio;

    @PostMapping("/admin/agregar")
    public ResponseEntity<Usuario> agregarAdministrador(@RequestBody Usuario usuario) {
    usuario.setPerfil("Administrador"); 
    Usuario nuevoAdmin = usuarioServicio.crearUsuario(usuario);
    return ResponseEntity.ok(nuevoAdmin);
}


    @PostMapping("/registro")
    public ResponseEntity<String> registrarUsuario(@RequestBody Usuario usuario) {
        try {
            usuario.setPerfil("CLIENTE");
            usuarioServicio.crearUsuario(usuario); 
            return ResponseEntity.ok("Registro exitoso");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al registrar el usuario");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        Usuario usuarioEncontrado = usuarioServicio.findByCorreoElectronico(usuario.getCorreoElectronico());
    
        if (usuarioEncontrado != null) {
            if (usuarioEncontrado.getContraseña().equals(usuario.getContraseña())) {
                if ("Administrador".equals(usuarioEncontrado.getPerfil())) {
                    return ResponseEntity.ok("Inicio de sesión exitoso como administrador");
                } else if ("CLIENTE".equals(usuarioEncontrado.getPerfil())) {
                    return ResponseEntity.ok(usuarioEncontrado);
                } else {
                    return ResponseEntity.status(403).body("Perfil no reconocido");
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }
    }
}    

