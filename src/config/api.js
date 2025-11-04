// src/config/api.js
// Endpoints y helper para la API

// La URL base se lee desde .env (Vite)
export const API_CONFIG = {
	BASE_URL: import.meta.env.VITE_REACT_APP_API_URL,

	// Endpoints de usuarios
	USER: {
		GET_ALL: '/users',
		CREATE: '/users',
		UPDATE: '/users',
		DELETE: '/users',
	},

	// Endpoints de productos
	PRODUCT: {
		GET_ALL: '/products',
		CREATE: '/products',
		UPDATE: '/products',
		DELETE: '/products',
	},

	// Endpoints de categorías
	CATEGORY: {
		GET_ALL: '/categories',
		CREATE: '/categories',
		UPDATE: '/categories',
		DELETE: '/categories',
	},
};

// Helper: construye URL completa y opcionalmente añade el id
export const buildApiUrl = (endpoint, id = '') => `${API_CONFIG.BASE_URL}${endpoint}${id ? '/' + id : ''}`;