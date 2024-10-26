package com.example.Proyecto_Final.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Proyecto_Final.modelo.Usuario;
import com.example.Proyecto_Final.repositorio.ClienteRepositorio;
import java.util.List;

@Service
public class ClienteServicio {

    @Autowired
    private ClienteRepositorio clienteRepositorio;
    
    public List<Usuario> obtenerClientes() {
        return clienteRepositorio.findByPerfil("CLIENTE");
    }
    public void eliminarCliente(String id) {
        clienteRepositorio.deleteById(id);
    }
    
}
