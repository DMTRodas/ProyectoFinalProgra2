package com.example.Proyecto_Final.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Proyecto_Final.modelo.Transaccion;
import com.example.Proyecto_Final.repositorio.TransaccionRepositorio;

@Service
public class TransaccionServicio {

    @Autowired
    private TransaccionRepositorio transaccionRepositorio;

    //Se buscan transacciones con el id cliente

    public List<Transaccion> buscarTransaccionesPorIdCliente(String clienteId) {
        return transaccionRepositorio.findByClienteId(clienteId);
    }
}