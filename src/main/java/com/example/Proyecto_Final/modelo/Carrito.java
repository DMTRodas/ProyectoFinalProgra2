package com.example.Proyecto_Final.modelo;

import java.util.ArrayList;
import java.util.List;

public class Carrito {

    private String idCliente; // Agregamos el campo idCliente
    private List<ArticuloCantidad> articulos = new ArrayList<>();

    // Getters y Setters para idCliente
    public String getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(String idCliente) {
        this.idCliente = idCliente;
    }

    // Getters y Setters para articulos
    public List<ArticuloCantidad> getArticulos() {
        return articulos;
    }

    public void setArticulos(List<ArticuloCantidad> articulos) {
        this.articulos = articulos;
    }
}
