// src/hooks/useFetchCategories.jsx

import { useState, useCallback } from "react";
import axios from 'axios';
import { buildApiUrl, API_CONFIG } from '../config/api';

const useFetchCategories = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const fetchCategories = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const url = buildApiUrl(API_CONFIG.CATEGORY.GET_ALL);
            const response = await axios.get(url);
            // Mi Back-end devuelve { count: N, data: [...] }
            return response.data.data || [];
        } catch (err) {
            const errMsg = err.response?.data?.msg || `Error al obtener categorías: ${err.message}`;
            setError(errMsg);
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        fetchCategories,
        error,
        loading
    };
};

export default useFetchCategories;