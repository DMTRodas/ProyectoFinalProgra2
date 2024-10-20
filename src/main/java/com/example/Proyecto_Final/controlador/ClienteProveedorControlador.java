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

import com.example.Proyecto_Final.modelo.ClienteProveedor;
import com.example.Proyecto_Final.servicio.ClienteProveedorServicio;

@RestController
@RequestMapping("/api/clientes_proveedores")
public class ClienteProveedorControlador {

    @Autowired
    private ClienteProveedorServicio clienteProveedorServicio;

    // Crear un nuevo cliente o proveedor
    @PostMapping
    public ClienteProveedor crearClienteProveedor(@RequestBody ClienteProveedor clienteProveedor) {
        return clienteProveedorServicio.crearClienteProveedor(clienteProveedor);
    }

    // Obtener todos los clientes y proveedores
    @GetMapping
    public List<ClienteProveedor> obtenerClientesProveedores() {
        return clienteProveedorServicio.obtenerClientesProveedores();
    }

    // Obtener un cliente o proveedor por ID
    @GetMapping("/{id}")
    public ResponseEntity<ClienteProveedor> obtenerClienteProveedorPorId(@PathVariable String id) {
        Optional<ClienteProveedor> clienteProveedorOpt = clienteProveedorServicio.obtenerClienteProveedorPorId(id);
        return clienteProveedorOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Actualizar un cliente o proveedor
    @PutMapping("/{id}")
    public ResponseEntity<ClienteProveedor> actualizarClienteProveedor(@PathVariable String id, @RequestBody ClienteProveedor clienteProveedor) {
        Optional<ClienteProveedor> clienteProveedorOpt = clienteProveedorServicio.obtenerClienteProveedorPorId(id);
        if (clienteProveedorOpt.isPresent()) {
            ClienteProveedor clienteProveedorExistente = clienteProveedorOpt.get();
            clienteProveedorExistente.setTipo(clienteProveedor.getTipo());
            clienteProveedorExistente.setNombre(clienteProveedor.getNombre());
            clienteProveedorExistente.setDireccion(clienteProveedor.getDireccion());
            clienteProveedorExistente.setTelefono(clienteProveedor.getTelefono());
            clienteProveedorExistente.setCorreoElectronico(clienteProveedor.getCorreoElectronico());
            ClienteProveedor clienteProveedorActualizado = clienteProveedorServicio.actualizarClienteProveedor(clienteProveedorExistente);
            return ResponseEntity.ok(clienteProveedorActualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar un cliente o proveedor por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarClienteProveedor(@PathVariable String id) {
        clienteProveedorServicio.eliminarClienteProveedor(id);
        return ResponseEntity.noContent().build();
    }
}

