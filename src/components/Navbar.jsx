import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <HashLink className="navbar-brand" to="/#home">SYNELTEC</HashLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <HashLink className="nav-link" to="/#home">Inicio</HashLink>
            </li>
            <li className="nav-item">
              <HashLink className="nav-link" to="/#services">Servicios</HashLink>
            </li>
            <li className="nav-item">
              <HashLink className="nav-link" to="/#gallery">Galería</HashLink>
            </li>
            <li className="nav-item">
              <HashLink className="nav-link" to="/#contact">Contacto</HashLink>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/SobreNosotros">Sobre Nosotros</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
