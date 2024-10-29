package com.example.Proyecto_Final.controlador;

import com.example.Proyecto_Final.servicio.ReporteServicio;
import com.itextpdf.text.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.ByteArrayInputStream;


@RestController
@RequestMapping("/api/reportes")
public class ReporteControlador {

    @Autowired
    private ReporteServicio reporteServicio;

    @GetMapping("/articulos/{id}")
    public ResponseEntity<InputStreamResource> generarReporteArticulo(@PathVariable String id) throws DocumentException {
        ByteArrayInputStream bis = reporteServicio.generarReporteArticuloPorId(id);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=ReporteArticulo.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }

    @GetMapping("/pedido/{id}")
    public ResponseEntity<InputStreamResource> generarReportePedido(@PathVariable String id) throws DocumentException {
        ByteArrayInputStream bis = reporteServicio.generarReportePedidoPorId(id);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=ReportePedido.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }

    @GetMapping("/cliente/{nombre}")
    public ResponseEntity<InputStreamResource> generarHistorialCliente(@PathVariable String nombre) throws DocumentException {
        ByteArrayInputStream bis = reporteServicio.generarHistorialPorCliente(nombre);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=HistorialCliente.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }
}
