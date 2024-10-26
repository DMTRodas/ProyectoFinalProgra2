package com.example.Proyecto_Final.controlador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.Proyecto_Final.servicio.KardexServicio;
import com.example.Proyecto_Final.servicio.ArticuloServicio;
import com.example.Proyecto_Final.modelo.Articulo;
import com.example.Proyecto_Final.modelo.Kardex;

import java.util.List;

@RestController
@RequestMapping("/api/kardex")
@CrossOrigin(origins = "http://localhost:3000")
public class KardexControlador {

    @Autowired
    private KardexServicio kardexServicio;

    @Autowired
    private ArticuloServicio articuloServicio;

    @GetMapping
    public ResponseEntity<List<Kardex>> obtenerTodosLosMovimientos() {
        List<Kardex> movimientos = kardexServicio.obtenerTodosLosMovimientos();
        return ResponseEntity.ok(movimientos);
    }

    @PostMapping("/entrada")
    public ResponseEntity<Kardex> registrarEntrada(@RequestParam String idArticulo, @RequestParam int cantidad) {
        Articulo articulo = articuloServicio.obtenerArticuloPorId(idArticulo); 
        Kardex nuevaEntrada = kardexServicio.registrarEntrada(articulo, cantidad);
        return ResponseEntity.ok(nuevaEntrada);
    }

    @PostMapping("/salida")
    public ResponseEntity<Kardex> registrarSalida(@RequestParam String idArticulo, @RequestParam int cantidad) {
        Articulo articulo = articuloServicio.obtenerArticuloPorId(idArticulo); 
        Kardex nuevaSalida = kardexServicio.registrarSalida(articulo, cantidad);
        return ResponseEntity.ok(nuevaSalida);
    }
}

