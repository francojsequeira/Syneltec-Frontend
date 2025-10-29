// src/hooks/useCrud.jsx

import { useState, useCallback } from "react";
import axios from 'axios';
import { buildApiUrl } from '../config/api';

/**
 * Hook genérico para manejar mi lógica CRUD.
 */
const useCrud = (endpointGroup) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Nota: leemos el token dentro de cada función para obtener siempre el valor actual

    // --- LECTURA (GET ALL) ---
    const fetchAll = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const url = buildApiUrl(endpointGroup.GET_ALL);

            let config = {};
            // Si es la ruta de Usuarios, SÍ necesita el token (Auth & Admin)
            if (endpointGroup.GET_ALL === '/users') {
                 const token = localStorage.getItem('token');
                 config = { headers: { Authorization: `Bearer ${token}` } };
            }

            const response = await axios.get(url, config);
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
    }, [endpointGroup]);

    // --- C/U/D (POST, PUT, DELETE) - Estas operaciones SIEMPRE requieren token de Admin ---
    const create = useCallback(async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const url = buildApiUrl(endpointGroup.CREATE);
            const token = localStorage.getItem('token');
            const authHeaders = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.post(url, formData, authHeaders);
            return response.data;
        } catch (err) {
            const errMsg = err.response?.data?.msg || `Error al crear: ${err.message}`;
            setError(errMsg);
            return null;
        } finally {
            setLoading(false);
        }
    }, [endpointGroup]);

    const update = useCallback(async (id, formData) => {
        setLoading(true);
        setError(null);
        try {
            const url = buildApiUrl(endpointGroup.UPDATE, id);
            const token = localStorage.getItem('token');
            const authHeaders = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.put(url, formData, authHeaders);
            return response.data;
        } catch (err) {
            const errMsg = err.response?.data?.msg || `Error al actualizar: ${err.message}`;
            setError(errMsg);
            return null;
        } finally {
            setLoading(false);
        }
    }, [endpointGroup]);

    const remove = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const url = buildApiUrl(endpointGroup.DELETE, id);
            const token = localStorage.getItem('token');
            const authHeaders = { headers: { Authorization: `Bearer ${token}` } };
            await axios.delete(url, authHeaders);
            return { success: true };
        } catch (err) {
            const errMsg = err.response?.data?.msg || `Error al eliminar: ${err.message}`;
            setError(errMsg);
            return { success: false };
        } finally {
            setLoading(false);
        }
    }, [endpointGroup]);

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