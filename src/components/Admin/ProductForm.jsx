// src/components/Admin/ProductForm.jsx

import React, { useState, useEffect } from 'react';

const ProductForm = ({ initialData, onSave, onCancel, categories = [], isSaving }) => {
    // Defino el estado inicial de mi formulario, usando los campos de mi Back-end
    const [formData, setFormData] = useState({
        title: '', 
        description: '',
        price: 0,
        stock: 0,
        category: '', 
        status: 'AVAILABLE',
    });

    const isEditing = !!initialData;

    // Uso useEffect para cargar los datos si estoy en modo edición
    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                description: initialData.description || '',
                price: initialData.price || 0,
                stock: initialData.stock || 0,
                category: initialData.category?._id || initialData.category || '',
                status: initialData.status || 'AVAILABLE',
            });
        } else {
            // Reseteo el formulario si es una nueva creación
            setFormData({
                title: '',
                description: '',
                price: 0,
                stock: 0,
                category: '',
                status: 'AVAILABLE',
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;

        setFormData(prev => ({ 
            ...prev, 
            [name]: val 
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Llamo a la función de guardado del componente padre, enviando el ID si es una edición
        onSave(isEditing ? initialData._id : null, formData);
    };

    return (
        <div className="card p-4 shadow-sm mb-4">
            <h4 className="mb-4 text-primary" style={{ fontFamily: 'Poppins' }}>
                {isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}
            </h4>
            <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Título</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        disabled={isSaving}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripción</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        required
                        disabled={isSaving}
                    ></textarea>
                </div>

                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="price" className="form-label">Precio ($)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            required
                            disabled={isSaving}
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="stock" className="form-label">Stock</label>
                        <input
                            type="number"
                            className="form-control"
                            id="stock"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            min="0"
                            required
                            disabled={isSaving}
                        />
                    </div>
                    
                    <div className="col-md-4 mb-3">
                        <label htmlFor="status" className="form-label">Estado</label>
                        <select
                            className="form-select"
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                            disabled={isSaving}
                        >
                            <option value="AVAILABLE">Disponible</option>
                            <option value="NOT AVAILABLE">No Disponible</option>
                            <option value="DISCONTINUED">Descontinuado</option>
                        </select>
                    </div>
                </div>


                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Categoría</label>
                    <select
                        className="form-select"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        disabled={isSaving}
                    >
                        <option value="">Seleccione una categoría</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="d-flex justify-content-end mt-4">
                    <button type="button" className="btn btn-secondary me-2" onClick={onCancel} disabled={isSaving}>
                        Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={isSaving}>
                        {isSaving ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Producto')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;