// src/context/AuthProvider.jsx

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const AuthProvider = ({ children }) => {
	// Estado centralizado para el usuario y control de carga inicial
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Intento validar el token al iniciar la app (para mantener la sesión)
		const token = localStorage.getItem('token');
		if (token) {
			console.log('AuthProvider useEffect: Token encontrado. Intentando obtener perfil...');
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};

			axios
				.get(`${API_URL}/auth/profile`, config)
				.then(response => {
					console.log('AuthProvider useEffect: Perfil cargado:', response.data);
					setUser(response.data);
				})
				.catch(error => {
					console.error(
						'AuthProvider useEffect: Error al obtener perfil o token no válido:',
						error.response?.data?.msg || error.message
					);
					localStorage.removeItem('token');
					setUser(null);
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			console.log('AuthProvider useEffect: No hay token. Sesión iniciada como invitado.');
			setLoading(false);
		}
	}, []);

	// Función que llama al backend para iniciar sesión
	const login = useCallback(async (email, password) => {
		console.log('AuthProvider login: Iniciando petición de login...');
		const response = await axios.post(`${API_URL}/auth/login`, { email, password });
		const { token, user: userData } = response.data;

		console.log('AuthProvider login: Respuesta exitosa. Datos del usuario:', userData);

		// Guardo el token y seteo el estado global
		localStorage.setItem('token', token);
		setUser(userData);
		return userData;
	}, []);

	// Función para cerrar sesión
	const logout = useCallback(() => {
		console.log('AuthProvider logout: Cerrando sesión...');
		localStorage.removeItem('token');
		setUser(null);
	}, []);

	const isAuthenticated = !!user;
	// Aceptar variantes de mayúsculas/minúsculas en el rol devuelto por el backend
	const isAdmin = !!user && String(user.role || '').toLowerCase() === 'admin';

	console.log(`AuthProvider Render: isAuthenticated=${isAuthenticated}, userRole=${user?.role}, isAdmin=${isAdmin}`);

	const contextValue = useMemo(
		() => ({ user, isAuthenticated, isAdmin, login, logout, loading }),
		[user, isAuthenticated, isAdmin, login, logout, loading]
	);

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};