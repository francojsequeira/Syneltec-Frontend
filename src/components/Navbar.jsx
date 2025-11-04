// src/components/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useAuth } from '../context/useAuth';

export default function Navbar() {
	const { isAuthenticated, isAdmin, user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = e => {
		if (e && e.preventDefault) e.preventDefault();
		logout();
		navigate('/login');
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
			<div className="container">
				<HashLink className="navbar-brand" to="/#home">
					SYNELTEC
				</HashLink>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						{/* Enlaces de navegación principales */}
						<li className="nav-item">
							<HashLink className="nav-link" to="/#home">
								Inicio
							</HashLink>
						</li>
						<li className="nav-item">
							<HashLink className="nav-link" to="/#services">
								Servicios
							</HashLink>
						</li>
						<li className="nav-item">
							<HashLink className="nav-link" to="/#gallery">
								Galería
							</HashLink>
						</li>
						<li className="nav-item">
							<HashLink className="nav-link" to="/#contact">
								Contacto
							</HashLink>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/SobreNosotros">
								Sobre Nosotros
							</Link>
						</li>

						{/* PRODUCTOS (CATÁLOGO): Visible para todos */}
						<li className="nav-item">
							<Link className="nav-link" to="/gestion/productos">
								Productos
							</Link>
						</li>

						{/* Menú de Administración (Solo si es Admin) */}
						{isAuthenticated && isAdmin && user && (
							<li className="nav-item dropdown">
								<a
									className="nav-link dropdown-toggle text-warning"
									href="#"
									id="navbarDropdownAdmin"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									{user.name.toUpperCase()}
								</a>
								<ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdownAdmin">
									<li>
										<Link className="dropdown-item" to="/gestion/productos">
											Gestión Productos
										</Link>
									</li>
									<li>
										<Link className="dropdown-item" to="/gestion/usuarios">
											Gestión Usuarios
										</Link>
									</li>
									<li>
										<hr className="dropdown-divider" />
									</li>
									<li>
										<button type="button" className="dropdown-item text-danger" onClick={handleLogout}>
											Cerrar Sesión
										</button>
									</li>
								</ul>
							</li>
						)}

						{/* Renderizado Condicional: Botón de Login/Logout simple */}
						<li className="nav-item">
							{isAuthenticated ? (
								!isAdmin && (
									<button className="btn btn-sm btn-outline-light ms-2" onClick={handleLogout}>
										Cerrar Sesión
									</button>
								)
							) : (
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