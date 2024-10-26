package com.example.Proyecto_Final.modelo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.util.ArrayList;

@Document(collection = "carritos")
public class Carrito {

    @Id
    private String id; 
    private String idCliente;
    private List<Articulo> articulos;

    public Carrito() {
        this.articulos = new ArrayList<>();
    }

    public Carrito(String idCliente) {
        this.idCliente = idCliente;
        this.articulos = new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(String idCliente) {
        this.idCliente = idCliente;
    }

    public List<Articulo> getArticulos() {
        return articulos;
    }

    public void agregarArticulo(Articulo articulo) {
        this.articulos.add(articulo);
    }

    public void eliminarArticulo(String articuloId) {
        this.articulos.removeIf(articulo -> articulo.getId().equals(articuloId));
    }

    public void vaciarCarrito() {
        this.articulos.clear();
    }

    public double calcularTotal() {
        return articulos.stream().mapToDouble(articulo -> articulo.getPrecio() * articulo.getCantidad()).sum();
    }
}