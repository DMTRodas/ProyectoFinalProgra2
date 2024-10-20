package com.example.Proyecto_Final.modelo;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "pedidos")
public class Pedido {

    @Id
    private String id;
    private List<ArticuloCantidad> articulos;
    private double total;
    private String metodoPago;

    // Constructor por defecto
    public Pedido() {}

    // Constructor con parámetros
    public Pedido(List<ArticuloCantidad> articulos, double total, String metodoPago) {
        this.articulos = articulos;
        this.total = total;
        this.metodoPago = metodoPago;
    }

    // Getters y Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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
