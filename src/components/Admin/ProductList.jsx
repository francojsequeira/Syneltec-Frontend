// src/components/Admin/ProductList.jsx

import React, { useState, useEffect, useCallback } from 'react';
import ProductForm from './ProductForm';
import { useAuth } from '../../context/useAuth';
import useCrud from '../../hooks/useCrud';
import { API_CONFIG } from '../../config/api';

// Mapeo para mostrar estados legibles
const STATUS_MAP = {
	AVAILABLE: 'Disponible',
	'NOT AVAILABLE': 'No Disponible',
	DISCONTINUED: 'Descontinuado',
};

const ProductList = () => {
	// Datos de autenticación y CRUD
	const { isAdmin, loading: authLoading } = useAuth();
	const { fetchAll, create, update, remove, error: crudError, loading: crudLoading } = useCrud(API_CONFIG.PRODUCT);
	const { fetchAll: fetchCategories, error: catError, loading: catLoading } = useCrud(API_CONFIG.CATEGORY);

	// Estados de la vista
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [editingProduct, setEditingProduct] = useState(null);
	const isSaving = crudLoading;

	// Cargo categorías (se pasa al formulario para crear producto)
	const loadCategories = useCallback(async () => {
		const categoriesData = await fetchCategories();
		if (categoriesData && categoriesData.data) {
			setCategories(categoriesData.data);
			return categoriesData.data;
		}
		return [];
	}, [fetchCategories]);

	// Cargo productos y, si soy admin, también categorías
	const loadData = useCallback(async () => {
		const productsData = await fetchAll();
		if (productsData) setProducts(productsData);
		if (isAdmin) await loadCategories();
	}, [fetchAll, isAdmin, loadCategories]);

	// Disparo la carga una vez que el estado de auth está listo
	useEffect(() => {
		if (!authLoading) loadData();
	}, [authLoading, loadData]);

	// Handlers de creación/edición/eliminación (solo admin usa estos)
	const handleSave = async (id, formData) => {
		const result = id ? await update(id, formData) : await create(formData);
		if (result) {
			setShowForm(false);
			setEditingProduct(null);
			loadData();
		}
	};

	const handleDelete = async productId => {
		if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;
		const result = await remove(productId);
		if (result.success) loadData();
	};

	const startEdit = product => {
		setEditingProduct(product);
		setShowForm(true);
	};

	if (authLoading || crudLoading || catLoading) return <div className="container mt-5">Cargando catálogo...</div>;

	const currentError = crudError || catError;

	return (
		<div className="container my-5">
			<h2 className="text-dark mb-4" style={{ fontFamily: 'Poppins' }}>
				Catálogo de productos {isAdmin && '(Modo edición)'}
			</h2>

			{currentError && <div className="alert alert-danger">{currentError}</div>}

			<div className="d-flex justify-content-between mb-3">
				<p>Total de productos: {products.length}</p>
				{isAdmin && (
					<button
						className={`btn ${showForm ? 'btn-secondary' : 'btn-primary'}`}
						onClick={() => {
							setShowForm(!showForm);
							setEditingProduct(null);
						}}
					>
						<i className={`fas fa-${showForm ? 'times' : 'plus'} me-2`} />
						{showForm ? 'Cerrar formulario' : 'Nuevo producto'}
					</button>
				)}
			</div>

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
					loadCategories={loadCategories}
				/>
			)}

			{!showForm && products.length > 0 && (
				<div className="table-responsive">
					<table className="table table-striped table-hover shadow-sm">
						<thead className="thead-dark">
							<tr>
								<th>#</th>
								<th>Título</th>
								<th>Precio</th>
								<th>Stock</th>
								<th>Categoría</th>
								<th>Estado</th>
								{isAdmin && <th>Acciones</th>}
							</tr>
						</thead>
						<tbody>
							{products.map((product, index) => (
								<tr key={product._id}>
									<td>{index + 1}</td>
									<td>{product.title}</td>
									<td>${product.price}</td>
									<td>{product.stock}</td>
									<td>{product.category?.name || 'N/A'}</td>
									<td>
										<span
											className={`badge bg-${product.status === 'AVAILABLE' ? 'success' : product.status === 'DISCONTINUED' ? 'danger' : 'warning'}`}
										>
											{STATUS_MAP[product.status] || product.status}
										</span>
									</td>
									{isAdmin && (
										<td>
											<button className="btn btn-sm btn-warning me-2" onClick={() => startEdit(product)} title="Editar Producto">
												Editar
											</button>
											<button className="btn btn-sm btn-danger" onClick={() => handleDelete(product._id)} title="Eliminar Producto">
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

			{products.length > 0 && !isAdmin && (
				<div className="alert alert-info mt-4">Inicia sesión como administrador para gestionar el inventario (editar, crear o eliminar productos).</div>
			)}
		</div>
	);
};

export default ProductList;