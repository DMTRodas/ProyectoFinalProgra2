package com.example.Proyecto_Final.modelo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Transaccion {
    @Id
    private String id;
    private String clienteId; 
    private double monto;
    // otros campos, getters y setters
}
