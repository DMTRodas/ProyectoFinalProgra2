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

    public Contacto crearContacto(Contacto contacto) {
        return contactoRepositorio.save(contacto);
    }

    public List<Contacto> obtenerContactos() {
        return contactoRepositorio.findAll();
    }

    public Optional<Contacto> obtenerContactoPorId(String id) {
        return contactoRepositorio.findById(id);
    }

    public Contacto actualizarContacto(Contacto contacto) {
        return contactoRepositorio.save(contacto);
    }

    public void eliminarContacto(String id) {
        contactoRepositorio.deleteById(id);
    }
}
