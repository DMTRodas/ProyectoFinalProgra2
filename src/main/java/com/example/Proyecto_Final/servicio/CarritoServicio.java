package com.example.Proyecto_Final.servicio;

import com.example.Proyecto_Final.modelo.Carrito;
import com.example.Proyecto_Final.repositorio.CarritoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class CarritoServicio {

    @Autowired
    private CarritoRepositorio carritoRepositorio;

    public Carrito obtenerCarritoPorCliente(String idCliente) {
        Optional<Carrito> carritoOpt = carritoRepositorio.findFirstByIdCliente(idCliente);
        return carritoOpt.orElseGet(() -> new Carrito(idCliente));
    }

    public void guardarCarrito(Carrito carrito) {
        carritoRepositorio.save(carrito);
    }

    public void eliminarArticuloDelCarrito(String idCliente, String idProducto) {
        Carrito carrito = obtenerCarritoPorCliente(idCliente);
        if (carrito != null) {
            carrito.eliminarArticulo(idProducto); 
            guardarCarrito(carrito);
        }
    }

    public void vaciarCarrito(String idCliente) {
        Carrito carrito = obtenerCarritoPorCliente(idCliente);
        if (carrito != null) {
            carrito.getArticulos().clear();
            guardarCarrito(carrito);  
        }
    }
}
    
