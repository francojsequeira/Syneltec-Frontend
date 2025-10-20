// src/context/useAuth.jsx (Solo Hook)

import { useContext } from 'react';
import { AuthContext } from './AuthContext'; // Importamos el contexto

// Hook personalizado para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext); 