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

    // Necesito el token de autenticación para mis peticiones protegidas
    const token = localStorage.getItem('token');
    const authHeaders = {
        headers: { Authorization: `Bearer ${token}` }
    };

    // --- LECTURA (GET ALL) ---
    const fetchAll = async () => {
        setLoading(true);
        setError(null);
        try {
            const url = buildApiUrl(endpointGroup.GET_ALL);
            // Uso authHeaders por si el endpoint es protegido
            const response = await axios.get(url, authHeaders); 
            return response.data;
        } catch (err) {
            const errMsg = err.response?.data?.msg || `Error al obtener la lista: ${err.message}`;
            setError(errMsg);
            return [];
        } finally {
            setLoading(false);
        }
    };

    // --- CREACIÓN (POST) ---
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

    // --- ACTUALIZACIÓN (PUT) ---
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

    // --- ELIMINACIÓN (DELETE) ---
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