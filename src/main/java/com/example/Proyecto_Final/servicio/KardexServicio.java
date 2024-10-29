package com.example.Proyecto_Final.servicio;

import com.example.Proyecto_Final.modelo.Kardex;
import com.example.Proyecto_Final.modelo.Articulo;
import com.example.Proyecto_Final.repositorio.KardexRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class KardexServicio {

    @Autowired
    private KardexRepositorio kardexRepositorio;

    @Autowired
    private ArticuloServicio articuloServicio;

    public Kardex registrarEntrada(Articulo articulo, int cantidad) {
        Kardex entrada = new Kardex();
        entrada.setIdProducto(articulo.getId());
        entrada.setTipoMovimiento("Entrada");
        entrada.setCantidad(cantidad);
        entrada.setFechaMovimiento(LocalDateTime.now());
        entrada.setPrecioUnitario(articulo.getPrecio());
        entrada.setTotal(cantidad * articulo.getPrecio());

        articuloServicio.actualizarStock(articulo.getId(), cantidad, "entrada");
        return kardexRepositorio.save(entrada);
    }

    public Kardex registrarSalida(Articulo articulo, int cantidad) {
        Kardex salida = new Kardex();
        salida.setIdProducto(articulo.getId());
        salida.setTipoMovimiento("Salida");
        salida.setCantidad(cantidad);
        salida.setFechaMovimiento(LocalDateTime.now());
        salida.setPrecioUnitario(articulo.getPrecio());
        salida.setTotal(cantidad * articulo.getPrecio());

        articuloServicio.actualizarStock(articulo.getId(), cantidad, "salida");
        return kardexRepositorio.save(salida);
    }

    public List<Kardex> obtenerTodosLosMovimientos() {
        return kardexRepositorio.findAll();
    }

}

