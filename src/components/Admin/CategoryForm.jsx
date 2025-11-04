// src/components/Admin/CategoryForm.jsx (CORREGIDO)

import React, { useState } from 'react';

// Formulario inline para crear una categoría (se renderiza dentro de ProductForm)
const CategoryForm = ({ onSave, onCancel, isSaving }) => {
	const [name, setName] = useState('');

	// Crear categoría: evitamos el submit del formulario padre
	const handleCreate = e => {
		e.preventDefault();
		const trimmed = name.trim();
		if (!trimmed) return;
		onSave(null, { name: trimmed });
		// No limpio `name` aquí: el padre desmonta este componente después de crear
	};

	return (
		<div className="p-4 shadow-sm">
			<h6 className="mb-3 text-secondary">Nueva categoría</h6>
			<div className="input-group">
				<input
					type="text"
					className="form-control"
					placeholder="Nombre de la categoría"
					value={name}
					onChange={e => setName(e.target.value)}
					required
					disabled={isSaving}
				/>
				<button type="button" className="btn btn-secondary" onClick={onCancel} disabled={isSaving}>Cancelar</button>
				<button type="button" className="btn btn-success" onClick={handleCreate} disabled={isSaving}>{isSaving ? 'Guardando...' : 'Crear'}</button>
			</div>
		</div>
	);
};

export default CategoryForm;