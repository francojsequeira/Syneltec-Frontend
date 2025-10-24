// src/components/Admin/ProductList.jsx

import React, { useState, useEffect } from 'react';
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
    // Obtengo mis hooks
    const { isAdmin, loading: authLoading } = useAuth();
    const { fetchAll, create, update, remove, error: crudError, loading: crudLoading } = useCrud(API_CONFIG.PRODUCT);
    const { fetchCategories, error: catError, loading: catLoading } = useFetchCategories();

    // Mis estados de la vista
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const isSaving = crudLoading;

    // Función para cargar todos los datos que necesito
    const loadData = async () => {
        // Me aseguro de cargar ambos datos
        const [productsData, categoriesData] = await Promise.all([
            fetchAll(),
            fetchCategories()
        ]);
        if (productsData) setProducts(productsData);
        if (categoriesData) setCategories(categoriesData);
    };

    // Cargo los datos al montar
    useEffect(() => {
        if (!authLoading && isAdmin) {
            loadData();
        }
    }, [authLoading, isAdmin]);

    // --- Handlers CRUD ---

    const handleSave = async (id, formData) => {
        let result;
        // Verifico si tengo ID (editar) o es nulo (crear)
        if (id) {
            result = await update(id, formData);
        } else {
            result = await create(formData);
        }

        if (result) {
            // Si funciona, cierro el formulario y recargo la lista
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

    if (authLoading || crudLoading || catLoading) return <div className="container mt-5">Cargando datos...</div>;

    if (!isAdmin) {
        return <div className="container mt-5 alert alert-danger">Acceso Denegado. Solo administradores pueden gestionar productos.</div>;
    }
    
    const currentError = crudError || catError;

    return (
        <div className="container my-5">
            <h2 className="text-dark mb-4" style={{ fontFamily: 'Poppins' }}>
                Gestión de Productos
            </h2>
            
            {currentError && <div className="alert alert-danger">{currentError}</div>}

            <div className="d-flex justify-content-between mb-3">
                <p>Total de productos: {products.length}</p>
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
            </div>

            {showForm && (
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
                                <th>Acciones</th>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            
            {!showForm && products.length === 0 && !currentError && (
                 <div className="alert alert-info text-center mt-4">No hay productos registrados.</div>
            )}
        </div>
    );
};

export default ProductList;