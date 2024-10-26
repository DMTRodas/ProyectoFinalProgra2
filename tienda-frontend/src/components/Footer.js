import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
  <footer className="footer">
    <div className="footer-section">
    <h4>Enlaces rápidos</h4>
    <ul>
    <li><a href="/sobre-nosotros">Sobre Nosotros</a></li>
    <li><a href="/contacto">Contacto</a></li>
    <li><a href="/politica-privacidad">Política de Privacidad</a></li>
    <li><a href="/terminos-condiciones">Términos y Condiciones</a></li></ul></div>
    <div className="footer-section">
      <h4>Contacto</h4>
      <p>Email: info@tutienda.com</p>
      <p>Teléfono: +123 456 789</p>
      </div>
    </footer>);
};

export default Footer;
