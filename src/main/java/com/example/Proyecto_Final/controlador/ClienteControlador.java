package com.example.Proyecto_Final.controlador;

import com.example.Proyecto_Final.modelo.Usuario;
import com.example.Proyecto_Final.servicio.ClienteServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "http://localhost:3000")
public class ClienteControlador {

    @Autowired
    private ClienteServicio clienteServicio;

    @GetMapping
    public List<Usuario> obtenerClientes() {
        return clienteServicio.obtenerClientes();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCliente(@PathVariable String id) {
    clienteServicio.eliminarCliente(id);
    return ResponseEntity.noContent().build();
}

}


