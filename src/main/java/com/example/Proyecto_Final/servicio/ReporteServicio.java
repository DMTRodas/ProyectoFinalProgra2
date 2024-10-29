package com.example.Proyecto_Final.servicio;

import com.example.Proyecto_Final.modelo.Articulo;
import com.example.Proyecto_Final.modelo.Pedido;
import com.example.Proyecto_Final.repositorio.ArticuloRepositorio;
import com.example.Proyecto_Final.repositorio.PedidoRepositorio;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class ReporteServicio {

    @Autowired
    private ArticuloRepositorio articuloRepositorio;

    @Autowired
    private PedidoRepositorio pedidoRepositorio;

    private Font tituloFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD, BaseColor.BLACK);
    private Font subtituloFont = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD, BaseColor.DARK_GRAY);
    private Font textoFont = new Font(Font.FontFamily.HELVETICA, 12, Font.NORMAL, BaseColor.BLACK);

    // Método para agregar el logo
    private void agregarLogo(Document document) {
        try {
            Image logo = Image.getInstance("tienda-frontend/public/images/t.png");
            logo.scaleToFit(100, 100); 
            logo.setAlignment(Element.ALIGN_CENTER);
            document.add(logo);
            document.add(new Paragraph(" ")); 
        } catch (Exception e) {
            System.out.println("Error al cargar el logo: " + e.getMessage());
        }
    }

    public ByteArrayInputStream generarReporteArticuloPorId(String idArticulo) throws DocumentException {
        Articulo articulo = articuloRepositorio.findById(idArticulo).orElse(null);
        
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        PdfWriter.getInstance(document, out);
        document.open();

        agregarLogo(document);

        // Reporte de articulos
        Paragraph titulo = new Paragraph("Reporte de Existencia de Artículo", tituloFont);
        titulo.setAlignment(Element.ALIGN_CENTER);
        document.add(titulo);
        document.add(new Paragraph(" ", textoFont)); 
        
        if (articulo != null) {
            document.add(new Paragraph("Nombre: " + articulo.getNombre(), textoFont));
            document.add(new Paragraph("Descripción: " + articulo.getDescripcion(), textoFont));
            document.add(new Paragraph("Categoría: " + articulo.getCategoria(), textoFont));
            document.add(new Paragraph("Stock: " + articulo.getStock(), textoFont));
            document.add(new Paragraph("Proveedor: " + articulo.getProveedorId(), textoFont));
        } else {
            document.add(new Paragraph("Artículo no encontrado.", subtituloFont));
        }

        document.close();
        return new ByteArrayInputStream(out.toByteArray());
    }

    public ByteArrayInputStream generarReportePedidoPorId(String idPedido) throws DocumentException {
        Pedido pedido = pedidoRepositorio.findById(idPedido).orElse(null);

        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        
        PdfWriter.getInstance(document, out);
        document.open();

        agregarLogo(document);

        // Reporte de pedidos
        Paragraph titulo = new Paragraph("Reporte de Pedido", tituloFont);
        titulo.setAlignment(Element.ALIGN_CENTER);
        document.add(titulo);
        document.add(new Paragraph(" ", textoFont)); 

        if (pedido != null) {
            document.add(new Paragraph("Cliente: " + pedido.getNombre(), textoFont));
            document.add(new Paragraph("Fecha: " + pedido.getFecha(), textoFont));
            document.add(new Paragraph("Total: Q" + pedido.getTotal(), textoFont));

            PdfPTable table = new PdfPTable(3);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10f);

            table.addCell(new PdfPCell(new Paragraph("Producto", subtituloFont)));
            table.addCell(new PdfPCell(new Paragraph("Cantidad", subtituloFont)));
            table.addCell(new PdfPCell(new Paragraph("Precio Unitario", subtituloFont)));

            pedido.getCarrito().forEach(articulo -> {
                table.addCell(new PdfPCell(new Paragraph(articulo.getNombre(), textoFont)));
                table.addCell(new PdfPCell(new Paragraph(String.valueOf(articulo.getCantidad()), textoFont)));
                table.addCell(new PdfPCell(new Paragraph("Q" + articulo.getPrecio(), textoFont)));
            });

            document.add(table);
        } else {
            document.add(new Paragraph("Pedido no encontrado.", subtituloFont));
        }

        document.close();
        return new ByteArrayInputStream(out.toByteArray());
    }

    public ByteArrayInputStream generarHistorialPorCliente(String nombreCliente) throws DocumentException {
        List<Pedido> pedidos = pedidoRepositorio.findByNombre(nombreCliente);

        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        
        PdfWriter.getInstance(document, out);
        document.open();

        agregarLogo(document);

        // Reporte Historial de transacciones
        Paragraph titulo = new Paragraph("Historial de Transacciones del Cliente: " + nombreCliente, tituloFont);
        titulo.setAlignment(Element.ALIGN_CENTER);
        document.add(titulo);
        document.add(new Paragraph(" ", textoFont)); 

        if (!pedidos.isEmpty()) {
            PdfPTable table = new PdfPTable(4);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10f);

            table.addCell(new PdfPCell(new Paragraph("ID Pedido", subtituloFont)));
            table.addCell(new PdfPCell(new Paragraph("Fecha", subtituloFont)));
            table.addCell(new PdfPCell(new Paragraph("Productos", subtituloFont)));
            table.addCell(new PdfPCell(new Paragraph("Total", subtituloFont)));

            for (Pedido pedido : pedidos) {
                table.addCell(new PdfPCell(new Paragraph(pedido.getIdPedido(), textoFont)));
                table.addCell(new PdfPCell(new Paragraph(pedido.getFecha().toString(), textoFont)));
                
                String productos = pedido.getCarrito().stream()
                        .map(articulo -> articulo.getNombre() + " (x" + articulo.getCantidad() + ")")
                        .reduce((a, b) -> a + ", " + b)
                        .orElse("No disponible");
                table.addCell(new PdfPCell(new Paragraph(productos, textoFont)));
                table.addCell(new PdfPCell(new Paragraph("Q" + pedido.getTotal(), textoFont)));
            }

            document.add(table);
        } else {
            document.add(new Paragraph("No se encontraron transacciones para este cliente.", subtituloFont));
        }

        document.close();
        return new ByteArrayInputStream(out.toByteArray());
    }
}



