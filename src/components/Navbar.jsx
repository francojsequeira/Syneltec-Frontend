// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useAuth } from '../context/useAuth'; 

export default function Navbar() {
    // Obtengo los estados y funciones del hook useAuth
    const { isAuthenticated, isAdmin, user, logout } = useAuth(); 

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

            {/* SOLUCIÓN 1: Muestro Productos como un enlace principal (es público) */}
            <li className="nav-item"><Link className="nav-link" to="/gestion/productos">Productos</Link></li>


            {/* SOLUCIÓN 3: Menú de Administración (Solo si es Admin) */}
            {isAdmin && (
                <li className="nav-item dropdown">
                    {/* Muestro el nombre del usuario (o solo el rol) en mayúsculas */}
                    <a className="nav-link dropdown-toggle text-warning" href="#" id="navbarDropdownAdmin" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {user.name.toUpperCase()}
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdownAdmin">
                        <li><Link className="dropdown-item" to="/gestion/productos">Catálogo (Público)</Link></li>
                        <li><Link className="dropdown-item" to="/gestion/usuarios">Gestión Usuarios</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        {/* El botón de Logout está dentro del Dropdown */}
                        <li><a className="dropdown-item text-danger" onClick={logout} href="#">Cerrar Sesión</a></li>
                    </ul>
                </li>
            )}
            
            {/* Renderizado Condicional: Login/Logout (Botón Final) */}
            <li className="nav-item">
                {isAuthenticated ? (
                    // SOLUCIÓN 2: Uso el mismo formato de botón para Logout si no está en el dropdown
                    // Pero si es admin, el logout ya está dentro del dropdown (isAdmin)
                    !isAdmin && <button className="btn btn-sm btn-primary ms-2" onClick={logout}>Cerrar Sesión</button>
                ) : (
                    // Si no estoy autenticado, muestro el botón de Login
                    <Link className="btn btn-sm btn-primary ms-2" to="/login">Login</Link>
                )}
            </li>
</ul>
</div>
</div>
</nav>
);
}