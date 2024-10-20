package com.example.Proyecto_Final.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Proyecto_Final.modelo.Contacto;
import com.example.Proyecto_Final.repositorio.ContactoRepositorio;

@Service
public class ContactoServicio {

    @Autowired
    private ContactoRepositorio contactoRepositorio;

    // Crear un nuevo contacto
    public Contacto crearContacto(Contacto contacto) {
        return contactoRepositorio.save(contacto);
    }

    // Obtener todos los contactos
    public List<Contacto> obtenerContactos() {
        return contactoRepositorio.findAll();
    }

    // Buscar contacto por ID
    public Optional<Contacto> obtenerContactoPorId(String id) {
        return contactoRepositorio.findById(id);
    }

    // Actualizar contacto
    public Contacto actualizarContacto(Contacto contacto) {
        return contactoRepositorio.save(contacto);
    }

    // Eliminar contacto por ID
    public void eliminarContacto(String id) {
        contactoRepositorio.deleteById(id);
    }
}
