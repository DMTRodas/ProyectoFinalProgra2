import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Mujer from './components/Mujer';
import Hombre from './components/Hombre';
import Accesorios from './components/Accesorios';
import ArticuloList from './components/ArticuloList';
import Carrito from './components/Carrito';
import Login from './components/Login';
import Pedido from './components/Pedido';
import Registro from './components/Registro';
import Dashboard from './components/Dashboard';
import ManejarProductos from './components/ManejarProductos';
import Inventario from './components/Inventario';
import MenuLateral from './components/MenuLateral';
import Header from './components/Header';
import Buscar from './components/Buscar';
import Nosotros from './components/Nosotros';
import Contacto from './components/Contacto';
import { ClienteProvider } from './components/ClienteContext';
import Checkout from './components/Checkout';
import CompraExitosa from './components/CompraExitosa';
import ManejarProveedores from './components/ManejarProveedores';
import ManejarClientes from './components/ManejarClientes';
import ProveedorPedidos from './components/ProveedorPedidos';
import ResumenPedido from './components/ResumenPedido';
import Kardex from './components/Kardex';
import HistorialTransacciones from './components/HistorialTransacciones';
import HistorialVentas from './components/HistorialVentas';
import ReportesAdmin from './components/ReportesAdmin';
import GestionarAdministradores from './components/GestionarAdministradores';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <ClienteProvider>
      <Router>
        <AppContent isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </Router>
    </ClienteProvider>
  );
}

function AppContent({ isMenuOpen, toggleMenu }) {
  const location = useLocation();

  const isAdminRoute = location.pathname.includes('/admin') || location.pathname === '/kardex';

  return (
    <div className="app">
      {!isAdminRoute && (
        <header>
          <Header toggleMenu={toggleMenu} />
          <>
      <button className="menu-btn" onClick={toggleMenu}>
      &#9776;
      </button>
      <MenuLateral isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </>
        </header>
      )}
      <Routes>
        <Route path="/api/usuarios/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/mujer" element={<Mujer />} />
        <Route path="/hombre" element={<Hombre />} />
        <Route path="/accesorios" element={<Accesorios />} />
        <Route path="/articulos" element={<ArticuloList />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/pedido" element={<Pedido />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/buscar" element={<Buscar toggleMenu={toggleMenu} />} />
        <Route path="/nosotros" element={<Nosotros toggleMenu={toggleMenu} />} />
        <Route path="/contacto" element={<Contacto toggleMenu={toggleMenu} />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/compra-exitosa" element={<CompraExitosa />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/productos" element={<ManejarProductos />} />
        <Route path="/admin/inventario" element={<Inventario />} />
        <Route path="/admin/proveedores" element={<ManejarProveedores />} />
        <Route path="/admin/clientes" element={<ManejarClientes />} />
        <Route path="/admin/proveedores-pedido" element={<ProveedorPedidos />} />
        <Route path="/resumen-pedido" element={<ResumenPedido />} />
        <Route path="/kardex" element={<Kardex />} />
        <Route path="/admin/historial-transacciones" element={<HistorialTransacciones />} />
        <Route path="/admin/historial-ventas" element={<HistorialVentas />} />
        <Route path="/admin/reportes" element={<ReportesAdmin />} />
        <Route path="/admin/gestionar-administradores" element={<GestionarAdministradores />} />
      </Routes>
    </div>
  );
}

export default App;
