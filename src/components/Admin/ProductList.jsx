// src/components/Admin/ProductList.jsx

import React, { useState, useEffect, useCallback } from 'react';
import ProductForm from './ProductForm';
import { useAuth } from '../../context/useAuth';
import useCrud from '../../hooks/useCrud';
import useFetchCategories from '../../hooks/useFetchCategories'; 
import { API_CONFIG } from '../../config/api';

// Mapeo simple de estados para una mejor visualización en la tabla
const STATUS_MAP = {
    'AVAILABLE': 'Disponible',
    'NOT AVAILABLE': 'No Disponible',
    'DISCONTINUED': 'Descontinuado'
};

const ProductList = () => {
    // Solo extraigo lo que realmente uso
    const { isAdmin, loading: authLoading } = useAuth();
    const { fetchAll, create, update, remove, error: crudError, loading: crudLoading } = useCrud(API_CONFIG.PRODUCT);
    const { fetchCategories, error: catError, loading: catLoading } = useFetchCategories();

    // Mis estados de la vista
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const isSaving = crudLoading;

    // Función de carga (memoizada para usar en useEffect sin warnings)
    const loadData = useCallback(async () => {
        // 1. CARGA PÚBLICA (Productos) - Siempre se ejecuta
        const productsData = await fetchAll();
        if (productsData) setProducts(productsData);
        
        // 2. CARGA CONDICIONAL (Categorías) - Solo si es Admin, para el formulario
        if (isAdmin) {
             const categoriesData = await fetchCategories();
             if (categoriesData) setCategories(categoriesData);
        }
    }, [fetchAll, fetchCategories, isAdmin]);

    // EJECUCIÓN: Se dispara solo cuando authLoading se resuelve y cuando isAdmin cambia.
    useEffect(() => {
        // Debo asegurarme de que la autenticación haya terminado antes de intentar cargar datos.
        if (!authLoading) {
            loadData();
        }
    }, [authLoading, loadData]); 

    // --- Handlers CRUD (Solo usados por Admin) ---

    const handleSave = async (id, formData) => {
        let result;
        if (id) {
            result = await update(id, formData);
        } else {
            result = await create(formData);
        }

        if (result) {
            setShowForm(false);
            setEditingProduct(null);
            loadData(); 
        }
    };

    const handleDelete = async (productId) => {
        if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;
        const result = await remove(productId);
        if (result.success) {
            loadData(); 
        }
    };

    const startEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    if (authLoading || crudLoading || catLoading) return <div className="container mt-5">Cargando catálogo...</div>;
    
    const currentError = crudError || catError;

    return (
        <div className="container my-5">
            <h2 className="text-dark mb-4" style={{ fontFamily: 'Poppins' }}>
                Catálogo de Productos {isAdmin && "(Modo Edición)"}
            </h2>
            
            {currentError && <div className="alert alert-danger">{currentError}</div>}

            <div className="d-flex justify-content-between mb-3">
                <p>Total de productos: {products.length}</p>
                
                {/* Botón de Nuevo Producto: Solo visible para Admin */}
                {isAdmin && (
                    <button 
                        className={`btn ${showForm ? 'btn-secondary' : 'btn-primary'}`} 
                        onClick={() => { 
                            setShowForm(!showForm); 
                            setEditingProduct(null); 
                        }}
                    >
                        <i className={`fas fa-${showForm ? 'times' : 'plus'} me-2`}></i> 
                        {showForm ? 'Cerrar Formulario' : 'Nuevo Producto'}
                    </button>
                )}
            </div>

            {/* Formulario de creación/edición: Solo visible si es Admin */}
            {showForm && isAdmin && (
                <ProductForm 
                    initialData={editingProduct} 
                    onSave={handleSave}
                    onCancel={() => { 
                        setShowForm(false); 
                        setEditingProduct(null); 
                    }} 
                    categories={categories}
                    isSaving={isSaving}
                />
            )}

            {/* Tabla de Productos: Visible para todos */}
            {!showForm && products.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-striped table-hover shadow-sm">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Título</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Categoría</th>
                                <th>Estado</th>
                                {/* Columna de Acciones: Solo visible si es Admin */}
                                {isAdmin && <th>Acciones</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.title}</td>
                                    <td>${product.price}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.category?.name || 'N/A'}</td>
                                    <td>
                                        <span className={`badge bg-${product.status === 'AVAILABLE' ? 'success' : product.status === 'DISCONTINUED' ? 'danger' : 'warning'}`}>
                                            {STATUS_MAP[product.status] || product.status}
                                        </span>
                                    </td>
                                    {/* Botones de acción: Solo visibles si es Admin */}
                                    {isAdmin && (
                                        <td>
                                            <button 
                                                className="btn btn-sm btn-warning me-2"
                                                onClick={() => startEdit(product)}
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(product._id)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            
            {!showForm && products.length === 0 && !currentError && (
                 <div className="alert alert-info text-center mt-4">No hay productos disponibles en el catálogo.</div>
            )}
            
            {/* Mensaje para que el usuario público sepa qué puede hacer */}
            {products.length > 0 && !isAdmin && (
                <div className="alert alert-info mt-4">
                    Inicia sesión como administrador para gestionar el inventario (editar, crear o eliminar productos).
                </div>
            )}
        </div>
    );
};

export default ProductList;