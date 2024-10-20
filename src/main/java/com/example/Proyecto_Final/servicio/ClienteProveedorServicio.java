package com.example.Proyecto_Final.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Proyecto_Final.modelo.ClienteProveedor;
import com.example.Proyecto_Final.repositorio.ClienteProveedorRepositorio;

@Service
public class ClienteProveedorServicio {

    @Autowired
    private ClienteProveedorRepositorio clienteProveedorRepositorio;

    // Crear un nuevo cliente o proveedor
    public ClienteProveedor crearClienteProveedor(ClienteProveedor clienteProveedor) {
        return clienteProveedorRepositorio.save(clienteProveedor);
    }

    // Obtener todos los clientes y proveedores
    public List<ClienteProveedor> obtenerClientesProveedores() {
        return clienteProveedorRepositorio.findAll();
    }

    // Buscar cliente o proveedor por ID
    public Optional<ClienteProveedor> obtenerClienteProveedorPorId(String id) {
        return clienteProveedorRepositorio.findById(id);
    }

    // Actualizar cliente o proveedor
    public ClienteProveedor actualizarClienteProveedor(ClienteProveedor clienteProveedor) {
        return clienteProveedorRepositorio.save(clienteProveedor);
    }

    // Eliminar cliente o proveedor por ID
    public void eliminarClienteProveedor(String id) {
        clienteProveedorRepositorio.deleteById(id);
    }
}