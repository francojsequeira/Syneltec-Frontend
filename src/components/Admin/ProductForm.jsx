// src/components/Admin/ProductForm.jsx

import React, { useState, useEffect } from 'react';
import CategoryForm from './CategoryForm';
import useCrud from '../../hooks/useCrud';
import { API_CONFIG } from '../../config/api';

// Formulario: crear / editar producto
// Recibo `loadCategories` desde el padre para recargar categorías cuando creo una nueva
const ProductForm = ({ initialData, onSave, onCancel, categories = [], isSaving, loadCategories }) => {
	const [showCategoryForm, setShowCategoryForm] = useState(false);
	const categoryCrud = useCrud(API_CONFIG.CATEGORY);

	// Estado del formulario con los campos que espera el backend
	const [formData, setFormData] = useState({ title: '', description: '', price: 0, stock: 0, category: '', status: 'AVAILABLE' });
	const isEditing = !!initialData;

	// Si hay datos iniciales (editar), los cargo en el formulario
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
			setFormData({ title: '', description: '', price: 0, stock: 0, category: '', status: 'AVAILABLE' });
		}
	}, [initialData]);

	// Actualizo estado local cuando cambian los inputs
	const handleChange = e => {
		const { name, value, type, checked } = e.target;
		const val = type === 'checkbox' ? checked : value;
		setFormData(prev => ({ ...prev, [name]: val }));
	};

	// Envío al componente padre (crear o editar)
	const handleSubmit = e => {
		e.preventDefault();
		onSave(isEditing ? initialData._id : null, formData);
	};

	// Crear categoría desde aquí y seleccionar la nueva categoría en el formulario
		const handleCategorySave = async (id, categoryData) => {
			const response = await categoryCrud.create(categoryData);
			// Manejo robusto de la forma de la respuesta del backend.
			// useCrud.create devuelve `response.data` (axios), que suele tener { success, data }
			let newCategoryId = null;
			if (response) {
				if (response.data && response.data._id) newCategoryId = response.data._id; // { success, data: { _id } }
				else if (response.data && response.data.data && response.data.data._id) newCategoryId = response.data.data._id; // caso anidado
				else if (response._id) newCategoryId = response._id; // por si devuelve la entidad directamente
			}
			if (newCategoryId) {
				await loadCategories(); // recargo categorías en el padre
				setFormData(prev => ({ ...prev, category: newCategoryId }));
				setShowCategoryForm(false);
			}
			// Errores se muestran desde categoryCrud.error
		};

	return (
		<div className="card p-4 shadow-sm mb-4">
			<h4 className="mb-4 text-primary" style={{ fontFamily: 'Poppins' }}>{isEditing ? 'Editar Producto' : 'Crear Producto'}</h4>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="title" className="form-label">Título</label>
					<input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required disabled={isSaving} />
				</div>

				<div className="mb-3">
					<label htmlFor="description" className="form-label">Descripción</label>
					<textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} rows="3" required disabled={isSaving} />
				</div>

				<div className="row">
					<div className="col-md-4 mb-3">
						<label htmlFor="price" className="form-label">Precio ($)</label>
						<input type="number" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} min="0" step="0.01" required disabled={isSaving} />
					</div>
					<div className="col-md-4 mb-3">
						<label htmlFor="stock" className="form-label">Stock</label>
						<input type="number" className="form-control" id="stock" name="stock" value={formData.stock} onChange={handleChange} min="0" required disabled={isSaving} />
					</div>
					<div className="col-md-4 mb-3">
						<label htmlFor="status" className="form-label">Estado</label>
						<select className="form-select" id="status" name="status" value={formData.status} onChange={handleChange} required disabled={isSaving}>
							<option value="AVAILABLE">Disponible</option>
							<option value="NOT AVAILABLE">No Disponible</option>
							<option value="DISCONTINUED">Descontinuado</option>
						</select>
					</div>
				</div>

				<div className="mb-3">
					<div className="d-flex justify-content-between align-items-end mb-2">
						<label htmlFor="category" className="form-label mb-0">Categoría</label>
						<button type="button" className={`btn btn-sm ${showCategoryForm ? 'btn-danger' : 'btn-info'}`} onClick={() => setShowCategoryForm(!showCategoryForm)} disabled={isSaving || categoryCrud.loading}>
							<i className={`fas fa-${showCategoryForm ? 'times' : 'plus'} me-1`} />
							{showCategoryForm ? 'Cerrar' : 'Crear categoría'}
						</button>
					</div>

					{!showCategoryForm && (
						<select className="form-select" id="category" name="category" value={formData.category} onChange={handleChange} required disabled={isSaving || categoryCrud.loading}>
							<option value="">Seleccione una categoría</option>
							{categories.map(cat => (<option key={cat._id} value={cat._id}>{cat.name}</option>))}
						</select>
					)}

					{showCategoryForm && (
						<div className="mt-3 p-3 border rounded bg-light">
							<CategoryForm initialData={null} onSave={handleCategorySave} onCancel={() => setShowCategoryForm(false)} isSaving={categoryCrud.loading} />
							{categoryCrud.error && <div className="alert alert-danger mt-2">{categoryCrud.error}</div>}
						</div>
					)}
				</div>

				<div className="d-flex justify-content-end mt-4">
					<button type="button" className="btn btn-secondary me-2" onClick={onCancel} disabled={isSaving || categoryCrud.loading}>Cancelar</button>
					<button type="submit" className="btn btn-primary" disabled={isSaving || showCategoryForm || categoryCrud.loading}>{isSaving ? 'Guardando...' : isEditing ? 'Guardar cambios' : 'Crear producto'}</button>
				</div>
			</form>
		</div>
	);
};

export default ProductForm;