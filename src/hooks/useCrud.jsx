// src/hooks/useCrud.jsx

import { useState } from "react";
import axios from 'axios';
import { buildApiUrl } from '../config/api';

/**
 * Hook genérico para manejar mi lógica CRUD.
 */
const useCrud = (endpointGroup) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Obtengo el token para las rutas que sí lo necesitan (C/U/D y listado de Usuarios)
    const token = localStorage.getItem('token');
    
    // --- LECTURA (GET ALL) ---
    const fetchAll = async () => {
        setLoading(true);
        setError(null);
        try {
            const url = buildApiUrl(endpointGroup.GET_ALL);
            
            let headers = {};
            // CRÍTICO: Las peticiones GET a /users SIEMPRE requieren token de Admin.
            // Las peticiones GET a /products NO requieren token (son públicas).
            if (endpointGroup.GET_ALL === '/users') {
                 headers = { headers: { Authorization: `Bearer ${token}` } };
            }
            
            const response = await axios.get(url, headers); 
            return response.data;
        } catch (err) {
            // Manejo específico para el error 204 No Content
            if (err.response && err.response.status === 204) {
                 return [];
            }
            const errMsg = err.response?.data?.msg || `Error al obtener la lista: ${err.message}`;
            setError(errMsg);
            return [];
        } finally {
            setLoading(false);
        }
    };

    // --- C/U/D (POST, PUT, DELETE) - Estas operaciones SIEMPRE requieren token de Admin ---
    const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

    const create = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const url = buildApiUrl(endpointGroup.CREATE);
            const response = await axios.post(url, formData, authHeaders);
            return response.data;
        } catch (err) {
            const errMsg = err.response?.data?.msg || `Error al crear: ${err.message}`;
            setError(errMsg);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const update = async (id, formData) => {
        setLoading(true);
        setError(null);
        try {
            const url = buildApiUrl(endpointGroup.UPDATE, id);
            const response = await axios.put(url, formData, authHeaders);
            return response.data;
        } catch (err) {
            const errMsg = err.response?.data?.msg || `Error al actualizar: ${err.message}`;
            setError(errMsg);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const remove = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const url = buildApiUrl(endpointGroup.DELETE, id);
            await axios.delete(url, authHeaders);
            return { success: true };
        } catch (err) {
            const errMsg = err.response?.data?.msg || `Error al eliminar: ${err.message}`;
            setError(errMsg);
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return {
        fetchAll,
        create,
        update,
        remove,
        error,
        loading
    };
};

export default useCrud;