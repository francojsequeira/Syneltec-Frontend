// src/context/AuthContext.jsx

import { createContext } from 'react';

// Este archivo solo crea el objeto Contexto. 
// Lo separé del Provider y del Hook para evitar errores con Fast Refresh (ESLint).
export const AuthContext = createContext(); 