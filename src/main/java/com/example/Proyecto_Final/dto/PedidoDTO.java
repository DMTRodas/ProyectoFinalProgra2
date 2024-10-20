package com.example.Proyecto_Final.dto;

import java.util.List;

import com.example.Proyecto_Final.modelo.ArticuloCantidad;

public class PedidoDTO {

    private List<ArticuloCantidad> articulos;
    private double total;
    private String metodoPago;

    // Getters y Setters
    public List<ArticuloCantidad> getArticulos() {
        return articulos;
    }

    public void setArticulos(List<ArticuloCantidad> articulos) {
        this.articulos = articulos;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public String getMetodoPago() {
        return metodoPago;
    }

    public void setMetodoPago(String metodoPago) {
        this.metodoPago = metodoPago;
    }
}
