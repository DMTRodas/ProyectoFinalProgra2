package com.example.Proyecto_Final.servicio;

import com.example.Proyecto_Final.modelo.Proveedor;
import com.example.Proyecto_Final.repositorio.ProveedorRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProveedorServicio {

    @Autowired
    private ProveedorRepositorio proveedorRepositorio;

    public Proveedor crearProveedor(Proveedor proveedor) {
        return proveedorRepositorio.save(proveedor);
    }

    public List<Proveedor> obtenerTodosLosProveedores() {
        return proveedorRepositorio.findAll();
    }

    public Proveedor obtenerProveedorPorId(String id) {
        return proveedorRepositorio.findById(id).orElse(null);
    }

    public Proveedor actualizarProveedor(String id, Proveedor proveedorActualizado) {
        proveedorActualizado.setId(id);
        return proveedorRepositorio.save(proveedorActualizado);
    }

    public void eliminarProveedor(String id) {
        proveedorRepositorio.deleteById(id);
    }

    public List<Proveedor> buscarPorCategoria(String categoria) {
        return proveedorRepositorio.findByCategoria(categoria); 
    }
}
