// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useAuth } from '../context/useAuth';

export default function Navbar() {
    // Obtengo los estados y funciones del hook useAuth
const { isAuthenticated, isAdmin, user, logout } = useAuth();

    // Handler de Logout para asegurar que no se navegue
    const handleLogout = (e) => {
        e.preventDefault(); // Evita la navegación predeterminada del <a>
        logout();
    };

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
                        {/* Enlaces de navegación principales */}
                        <li className="nav-item"><HashLink className="nav-link" to="/#home">Inicio</HashLink></li>
                        <li className="nav-item"><HashLink className="nav-link" to="/#services">Servicios</HashLink></li>
                        <li className="nav-item"><HashLink className="nav-link" to="/#gallery">Galería</HashLink></li>
                        <li className="nav-item"><HashLink className="nav-link" to="/#contact">Contacto</HashLink></li>
                        <li className="nav-item"><Link className="nav-link" to="/SobreNosotros">Sobre Nosotros</Link></li>

                        {/* PRODUCTOS (CATÁLOGO): Visible para todos */}
                        <li className="nav-item"><Link className="nav-link" to="/gestion/productos">Productos</Link></li>


                        {/* Menú de Administración (Solo si es Admin) */}
                        {isAuthenticated && isAdmin && user && ( 
                            <li className="nav-item dropdown">
                                {/* Muestro el nombre del usuario (o solo el rol) en mayúsculas */}
                                <a className="nav-link dropdown-toggle text-warning" href="#" id="navbarDropdownAdmin" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {user.name.toUpperCase()}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdownAdmin">
                                    {/* Enlace para la gestión de productos */}
                                    <li><Link className="dropdown-item" to="/gestion/productos">Gestión Productos</Link></li>
                                    
                                    {/* Enlace para la gestión de usuarios (SOLO ADMIN) */}
                                    <li><Link className="dropdown-item" to="/gestion/usuarios">Gestión Usuarios</Link></li>
                                    
                                    <li><hr className="dropdown-divider" /></li>
                                    
                                    {/* Opción de cerrar sesión en el dropdown */}
                                    <li><a className="dropdown-item text-danger" onClick={handleLogout} href="#">Cerrar Sesión</a></li>
                                </ul>
                            </li>
                        )}
                        
                        {/* Renderizado Condicional: Botón de Login/Logout */}
                        <li className="nav-item">
                            {isAuthenticated ? (
                                // Si estoy autenticado y NO soy admin, muestro el botón de Logout simple
                                // Uso la clase btn-outline-light para que sea armonioso con el fondo oscuro
                                !isAdmin && 
                                <button className="btn btn-sm btn-outline-light ms-2" onClick={logout}>
                                    Cerrar Sesión
                                </button>
                            ) : (
                                // Si no estoy autenticado, muestro el botón de Login (Armonioso)
                                <Link className="btn btn-sm btn-outline-light ms-2" to="/login">
                                    Login
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}