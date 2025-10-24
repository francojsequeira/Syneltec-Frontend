// src/config/api.js
// Configuración de la API con endpoints unificados

// Uso la URL de mi Back-end desplegado en Vercel
export const API_CONFIG = {
    // La URL base se lee automáticamente desde .env 
    BASE_URL: import.meta.env.VITE_REACT_APP_API_URL, 
    
    // Configuración de Endpoints de Usuarios (CRUD Completo para Admin)
    USER: {
        GET_ALL: '/users',      
        CREATE: '/users',       
        UPDATE: '/users',       
        DELETE: '/users',       
    },
    
    // Configuración de Endpoints de Productos
    PRODUCT: {
        GET_ALL: '/products',   
        CREATE: '/products',    
        UPDATE: '/products',    
        DELETE: '/products',    
    },
    
    // Configuración de Endpoints de Categorías
    CATEGORY: {
        GET_ALL: '/categories', 
    }
};

/**
 * Función helper para construir URLs, agregando el ID para operaciones específicas.
 */
export const buildApiUrl = (endpoint, id = '') => {
    // Construyo la URL completa con el ID si está presente
    return `${API_CONFIG.BASE_URL}${endpoint}${id ? '/' + id : ''}`;
};