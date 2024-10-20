package com.example.Proyecto_Final.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Proyecto_Final.modelo.Empresa;
import com.example.Proyecto_Final.repositorio.EmpresaRepositorio;

@Service
public class EmpresaServicio {

    @Autowired
    private EmpresaRepositorio empresaRepositorio;

    // Crear una nueva empresa
    public Empresa crearEmpresa(Empresa empresa) {
        return empresaRepositorio.save(empresa);
    }

    // Obtener todas las empresas
    public List<Empresa> obtenerEmpresas() {
        return empresaRepositorio.findAll();
    }

    // Buscar empresa por ID
    public Optional<Empresa> obtenerEmpresaPorId(String id) {
        return empresaRepositorio.findById(id);
    }

    // Actualizar empresa
    public Empresa actualizarEmpresa(Empresa empresa) {
        return empresaRepositorio.save(empresa);
    }

    // Eliminar empresa por ID
    public void eliminarEmpresa(String id) {
        empresaRepositorio.deleteById(id);
    }
}
