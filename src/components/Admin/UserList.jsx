// src/components/Admin/UserList.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL; 

const UserList = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            // Recuerdo: el token debe estar en localStorage
            const token = localStorage.getItem('token'); 
            if (!token) {
                setError("Acceso denegado. Necesitas iniciar sesión (Falta token).");
                setLoading(false);
                return;
            }

            try {
                // Hago la petición al endpoint protegido de Vercel
                const response = await axios.get(`${API_URL}/auth/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Envío el JWT
                    },
                });
                setUser(response.data);
            } catch (error) { // Uso 'error' para la corrección del linter
                console.error("Error al cargar el perfil:", error);
                
                let errorMessage;
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    // Si recibimos 401/403, es un problema de JWT (no válido o expirado)
                    errorMessage = "Acceso no autorizado. Tu sesión ha expirado o el token es inválido.";
                } else if (error.code === "ERR_NETWORK") {
                     errorMessage = "Error de red: No se pudo conectar con el servidor.";
                } else {
                    errorMessage = "Error al conectar o cargar datos del perfil.";
                }
                
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <div className="container mt-5">Cargando perfil...</div>;
    // Ahora el mensaje de error será más informativo
    if (error) return <div className="container mt-5" style={{ color: 'red' }}>{error}</div>;

    return (
        <div className="container mt-5">
            <h2>Perfil de Administrador (Conexión OK)</h2>
            <p>Verificación JWT exitosa. Conectado a {API_URL}.</p>
            <div className="card p-3">
                <h4>Datos del Usuario</h4>
                <p><strong>ID:</strong> {user._id}</p>
                <p><strong>Nombre:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Rol:</strong> {user.role}</p>
            </div>
        </div>
    );
};

export default UserList;