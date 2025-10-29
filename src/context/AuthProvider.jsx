// src/context/AuthProvider.jsx

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext'; // Importo el Contexto desde su propio archivo

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const AuthProvider = ({ children }) => {
    // Estado centralizado para el usuario y control de carga inicial
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Intento validar el token al iniciar la app (para mantener la sesión)
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`${API_URL}/auth/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                setUser(response.data); // Cargo los datos del usuario (incluyendo el rol)
            })
            .catch(() => {
                localStorage.removeItem('token'); // Token inválido, lo elimino
            })
            .finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    // Función que llama al backend para iniciar sesión
    const login = useCallback(async (email, password) => {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        const { token, user: userData } = response.data;
        
        // Guardo el token y seteo el estado global
        localStorage.setItem('token', token);
        setUser(userData);
        return userData;
    }, []);

    // Función para cerrar sesión
    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setUser(null);
    }, []);

    const isAuthenticated = !!user;
    // Aceptar variantes de mayúsculas/minúsculas en el rol devuelto por el backend
    const isAdmin = !!user && String(user.role || '').toLowerCase() === 'admin';

    const contextValue = useMemo(() => ({ user, isAuthenticated, isAdmin, login, logout, loading }), [user, isAuthenticated, isAdmin, login, logout, loading]);

    return (
        // Proveo el estado y las funciones a toda la app
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};