// src/components/Auth/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Importo el hook desde su propio archivo
import { useAuth } from '../../context/useAuth'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    // Valores por defecto para agilizar mis pruebas
    const [email, setEmail] = useState('franco@test.com'); 
    const [password, setPassword] = useState('123456'); 
    const [error, setError] = useState(null);
    const { login } = useAuth(); // Obtengo la función login del contexto
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await login(email, password);
            // Si el login es exitoso, me voy al panel de gestión
            navigate('/gestion/productos'); 
        } catch (err) {
            console.error("Login fallido:", err);
            // Uso el error de Axios para dar feedback al usuario
            const errorMessage = err.response ? err.response.data.msg : "Error de conexión o credenciales inválidas.";
            setError(errorMessage);
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit} className="p-4 rounded shadow bg-light">
                        <h2 className="text-center mb-4">Iniciar Sesión</h2>
                        
                        {error && <div className="alert alert-danger">{error}</div>}

                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;