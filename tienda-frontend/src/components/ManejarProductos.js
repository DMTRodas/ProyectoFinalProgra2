import React, { useEffect, useState } from 'react';
import AxiosConfig from '../services/AxiosConfig';
import { useNavigate } from 'react-router-dom';
import ArticuloService from '../services/ArticuloService';
import { obtenerProveedores } from '../services/ProveedorService';
import '../estilos/ManejarProductos.css';

const ManejarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    subcategoria: '',
    stock: 0,
    precio: 0,
    genero: '',
    proveedorId: '',});
  const [imagen, setImagen] = useState(null);
  const [imagenUrl, setImagenUrl] = useState('');
  const [proveedores, setProveedores] = useState([]); 
  const navigate = useNavigate();
  useEffect(() => {
    cargarProductos();
    cargarProveedores();}, []);

  const cargarProductos = async () => {
    try {
    const response = await ArticuloService.obtenerArticulos();
    setProductos(response.data);} 
    catch (error) {
      console.error("Error al cargar los productos:", error);}
  };

  const cargarProveedores = async () => {
    try {
    const data = await obtenerProveedores(); 
    setProveedores(data); } 
    catch (error) {
      console.error('Error al cargar los proveedores', error);}
  };
  const manejarCambioNuevo = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };
  const manejarCambioEdicion = (e) => {
    const { name, value } = e.target;
    setProductoSeleccionado({ ...productoSeleccionado, [name]: value });
  };
  const manejarCambioImagen = (e) => {
    setImagen(e.target.files[0]);
  };
  const subirImagen = async () => {
    if (!imagen) return;
    const formData = new FormData();
    formData.append('image', imagen);
    try {
      const response = await AxiosConfig.post('/articulos/uploadImage', formData, {
      headers: {
      'Content-Type': 'multipart/form-data',},
      });
      setImagenUrl(response.data);
      alert('Imagen subida con éxito');
    } catch (error) {
      console.error('Error al subir la imagen', error);
      alert('Error al subir la imagen');}
    };

  const agregarProducto = async (e) => {
    e.preventDefault();
    try {
      await ArticuloService.crearArticulo({ ...nuevoProducto, imagenUrl });
      cargarProductos();
      alert('Producto agregado con éxito');
      setNuevoProducto({
        nombre: '',
        descripcion: '',
        categoria: '',
        subcategoria: '',
        stock: 0,
        precio: 0,
        genero: '',
        proveedorId: '', 
      });
      setImagen(null);
      setImagenUrl('');
    } catch (error) {
      console.error("Error al agregar el producto:", error);}
  };

  const editarProducto = async (e) => {
    e.preventDefault();
    try {
      let productoActualizado = { ...productoSeleccionado };
      if (imagen) {
        const formData = new FormData();
        formData.append('image', imagen);
        const response = await AxiosConfig.post('/articulos/uploadImage', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',},
    });
        productoActualizado = { ...productoSeleccionado, imagenUrl: response.data };
      }
      await ArticuloService.actualizarArticulo(productoSeleccionado.id, {
        ...productoActualizado,
        genero: productoSeleccionado.genero,});
      cargarProductos();
      alert('Producto actualizado con éxito');
      setProductoSeleccionado(null);
      setImagen(null);
      setImagenUrl('');
    } catch (error) {
      console.error("Error al editar el producto:", error);}
   };
  const eliminarProducto = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await ArticuloService.eliminarArticulo(id);
        cargarProductos();
        alert('Producto eliminado con éxito');} 
        catch (error) {
        console.error("Error al eliminar el producto:", error);}
    }
    };
  const seleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
    setImagenUrl(producto.imagenUrl);
  };
  const volverAlDashboard = () => {
    navigate('/admin/dashboard');
  };
  return (
    <div className="manejar-productos-container">
      <button onClick={volverAlDashboard}>Atrás</button>
      <h2>Manejar Productos</h2>
      <div className="productos-list">
        {productos.map((producto, index) => (
        <div key={producto.id} className="producto-card">
        <img src={producto.imagenUrl} alt={producto.nombre} className="producto-imagen" />
        <div className="producto-info">
        <h3>{producto.nombre}</h3>
        <p>{producto.descripcion}</p>
        <p>Categoría: {producto.categoria}</p>
        <p>Subcategoría: {producto.subcategoria}</p>
        <p>Género: {producto.genero}</p>
        <p>Proveedor: {producto.proveedorId}</p> 
        <p>Precio: Q{producto.precio}</p>
        <p>Stock disponible: {producto.stock}</p>
        <div className="producto-acciones">
          <button onClick={() => seleccionarProducto(producto)}>Editar</button>
          <button onClick={() => eliminarProducto(producto.id || producto.id)}>Eliminar</button></div>
        </div>
        </div>))}
      </div>
      <div className="agregar-producto">
        <h3>Agregar Producto</h3>
        <form onSubmit={agregarProducto}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={nuevoProducto.nombre}
            onChange={manejarCambioNuevo}
            required/>
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={nuevoProducto.descripcion}
            onChange={manejarCambioNuevo}
            required/>
          <input
            type="text"
            name="categoria"
            placeholder="Categoría"
            value={nuevoProducto.categoria}
            onChange={manejarCambioNuevo}
            required/>
          <input
            type="text"
            name="subcategoria"
            placeholder="Subcategoría"
            value={nuevoProducto.subcategoria}
            onChange={manejarCambioNuevo}
            required/>
          <select
            name="genero"
            value={nuevoProducto.genero}
            onChange={manejarCambioNuevo}
            required>
            <option value="">Seleccionar Género</option>
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
            <option value="accesorios">Accesorios</option></select>
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={nuevoProducto.stock}
            onChange={manejarCambioNuevo}
            required/>
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={nuevoProducto.precio}
            onChange={manejarCambioNuevo}
            required/>
          <select
            name="proveedorId"
            value={nuevoProducto.proveedorId}
            onChange={manejarCambioNuevo}
            required>
            <option value="">Seleccionar Proveedor</option>
            {proveedores.map((proveedor) => (
              <option key={proveedor.id} value={proveedor.id}>
              {proveedor.nombre}</option>))}
          </select>
          <input type="file" onChange={manejarCambioImagen} />
          <button type="button" onClick={subirImagen}>Subir Imagen</button>
          <button type="submit" className="agregar-btn">Agregar Producto</button></form>
      </div>
      {productoSeleccionado && (
        <div className="editar-producto">
          <h3>Editar Producto</h3>
          <form onSubmit={editarProducto}>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={productoSeleccionado.nombre}
              onChange={manejarCambioEdicion}
              required/>
            <input
              type="text"
              name="descripcion"
              placeholder="Descripción"
              value={productoSeleccionado.descripcion}
              onChange={manejarCambioEdicion}
              required/>
            <input
              type="text"
              name="categoria"
              placeholder="Categoría"
              value={productoSeleccionado.categoria}
              onChange={manejarCambioEdicion}
              required/>
            <input
              type="text"
              name="subcategoria"
              placeholder="Subcategoría"
              value={productoSeleccionado.subcategoria}
              onChange={manejarCambioEdicion}
              required/>
            <select
              name="genero"
              value={productoSeleccionado.genero}
              onChange={manejarCambioEdicion}
              required>
              <option value="">Seleccionar Género</option>
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
              <option value="accesorios">Accesorios</option></select>
            <select
              name="proveedorId"
              value={productoSeleccionado.proveedorId}
              onChange={manejarCambioEdicion}
              required>
              <option value="">Seleccionar Proveedor</option>
              {proveedores.map((proveedor) => (
                <option key={proveedor.id} value={proveedor.id}>
                {proveedor.nombre}</option>))}</select>
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={productoSeleccionado.stock}
              onChange={manejarCambioEdicion}
              required/>
            <input
              type="number"
              name="precio"
              placeholder="Precio"
              value={productoSeleccionado.precio}
              onChange={manejarCambioEdicion}
              required/>
            <input type="file" onChange={manejarCambioImagen} />
            <button type="submit" className="guardar-btn">Guardar Cambios</button></form>
        </div>)}
    </div>
  );
};

export default ManejarProductos;
