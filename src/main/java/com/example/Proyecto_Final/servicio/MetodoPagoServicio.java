package com.example.Proyecto_Final.servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Proyecto_Final.modelo.MetodoPago;
import com.example.Proyecto_Final.repositorio.MetodoPagoRepositorio;

@Service
public class MetodoPagoServicio {

    @Autowired
    private MetodoPagoRepositorio metodoPagoRepositorio;

    // Crear un nuevo método de pago
    public MetodoPago crearMetodoPago(MetodoPago metodoPago) {
        return metodoPagoRepositorio.save(metodoPago);
    }

    // Obtener todos los métodos de pago
    public List<MetodoPago> obtenerMetodosPago() {
        return metodoPagoRepositorio.findAll();
    }

    // Buscar método de pago por ID
    public Optional<MetodoPago> obtenerMetodoPagoPorId(String id) {
        return metodoPagoRepositorio.findById(id);
    }

    // Actualizar método de pago
    public MetodoPago actualizarMetodoPago(MetodoPago metodoPago) {
        return metodoPagoRepositorio.save(metodoPago);
    }

    // Eliminar método de pago por ID
    public void eliminarMetodoPago(String id) {
        metodoPagoRepositorio.deleteById(id);
    }
}
