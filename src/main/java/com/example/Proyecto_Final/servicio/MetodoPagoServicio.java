package com.example.Proyecto_Final.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Proyecto_Final.modelo.MetodoPago;
import com.example.Proyecto_Final.repositorio.MetodoPagoRepositorio;
import java.util.List;
import java.util.Optional;

@Service
public class MetodoPagoServicio {

    @Autowired
    private MetodoPagoRepositorio metodoPagoRepositorio;

    public MetodoPago crearMetodoPago(MetodoPago metodoPago) {
        return metodoPagoRepositorio.save(metodoPago);
    }

    public List<MetodoPago> obtenerMetodosPago() {
        return metodoPagoRepositorio.findAll();
    }

    public Optional<MetodoPago> obtenerMetodoPagoPorId(String id) {
        return metodoPagoRepositorio.findById(id);
    }

    public MetodoPago actualizarMetodoPago(MetodoPago metodoPago) {
        return metodoPagoRepositorio.save(metodoPago);
    }

    public void eliminarMetodoPago(String id) {
        metodoPagoRepositorio.deleteById(id);
    }
}
