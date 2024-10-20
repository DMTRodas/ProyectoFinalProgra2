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

import com.example.Proyecto_Final.modelo.Empresa;
import com.example.Proyecto_Final.servicio.EmpresaServicio;

@RestController
@RequestMapping("/api/empresas")
public class EmpresaControlador {

    @Autowired
    private EmpresaServicio empresaServicio;

    // Crear una nueva empresa
    @PostMapping
    public Empresa crearEmpresa(@RequestBody Empresa empresa) {
        return empresaServicio.crearEmpresa(empresa);
    }

    // Obtener todas las empresas
    @GetMapping
    public List<Empresa> obtenerEmpresas() {
        return empresaServicio.obtenerEmpresas();
    }

    // Obtener una empresa por ID
    @GetMapping("/{id}")
    public ResponseEntity<Empresa> obtenerEmpresaPorId(@PathVariable String id) {
        Optional<Empresa> empresaOpt = empresaServicio.obtenerEmpresaPorId(id);
        return empresaOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Actualizar una empresa
    @PutMapping("/{id}")
    public ResponseEntity<Empresa> actualizarEmpresa(@PathVariable String id, @RequestBody Empresa empresa) {
        Optional<Empresa> empresaOpt = empresaServicio.obtenerEmpresaPorId(id);
        if (empresaOpt.isPresent()) {
            Empresa empresaExistente = empresaOpt.get();
            empresaExistente.setNombre(empresa.getNombre());
            empresaExistente.setDireccion(empresa.getDireccion());
            empresaExistente.setTelefono(empresa.getTelefono());
            empresaExistente.setCorreoElectronico(empresa.getCorreoElectronico());
            Empresa empresaActualizada = empresaServicio.actualizarEmpresa(empresaExistente);
            return ResponseEntity.ok(empresaActualizada);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar una empresa por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEmpresa(@PathVariable String id) {
        empresaServicio.eliminarEmpresa(id);
        return ResponseEntity.noContent().build();
    }
}
