// src/components/Admin/ProductList.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// CRÍTICO: Usamos la sintaxis VITE_ para que Vite lea la variable de entorno
const API_URL = import.meta.env.VITE_REACT_APP_API_URL; 

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Hacemos la llamada al backend de Vercel. Si la URL es correcta, funcionará.
                const response = await axios.get(`${API_URL}/products`);
                setProducts(response.data);
            } catch (error) { // Usamos 'error' y lo utilizamos en el bloque
                console.error("Error al cargar productos:", error);
                
                // Intento extraer un mensaje útil del backend o dar un error genérico
                let errorMessage;
                if (error.response) {
                    errorMessage = `Error ${error.response.status}: ${error.response.data.msg}`;
                } else if (error.code === "ERR_NETWORK") {
                    errorMessage = "Error de red: No se pudo conectar con el servidor (Verifique la URL del backend).";
                } else {
                    errorMessage = "Error desconocido al cargar productos.";
                }
                
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <div className="container mt-5">Cargando productos...</div>;
    // Ahora el mensaje de error será más informativo
    if (error) return <div className="container mt-5" style={{ color: 'red' }}>{error}</div>;

    return (
        <div className="container mt-5">
            <h2>Catálogo de Productos ({products.length} encontrados)</h2>
            <p>Verificando que la categoría se muestre (populate) desde Vercel.</p>

            <div className="d-flex flex-wrap justify-content-start">
                {products.map(product => (
                    <div key={product._id} className="card m-2" style={{ width: '18rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">{product.title}</h5>
                            <p className="card-text">Precio: ${product.price}</p>
                            
                            {/* Verificamos que el populate funcione correctamente */}
                            <p className="card-text text-success">
                                Categoría: <strong>{product.category?.name || 'Categoría no definida'}</strong> 
                            </p>
                            <p className="card-text">Stock: {product.stock}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;