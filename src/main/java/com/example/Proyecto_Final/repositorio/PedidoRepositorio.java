package com.example.Proyecto_Final.repositorio;

import com.example.Proyecto_Final.modelo.Pedido;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepositorio extends MongoRepository<Pedido, String> {
    List<Pedido> findByIdCliente(String idCliente); 
}

