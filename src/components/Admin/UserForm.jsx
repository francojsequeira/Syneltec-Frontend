// src/components/Admin/UserForm.jsx

import React, { useState, useEffect } from 'react';

const UserForm = ({ initialData, onSave, onCancel, isSaving }) => {
    // Defino el estado inicial con los campos que necesito para el Back-end
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user', 
    });
    
    const isEditing = !!initialData;

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                email: initialData.email || '',
                role: initialData.role || 'user',
                password: '' // No precargo la contraseña
            });
        } else {
            // Si estoy creando, limpio todo
            setFormData({ name: '', email: '', password: '', role: 'user' });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Si estoy editando y no cambié la contraseña, elimino el campo 'password' antes de enviar
        const dataToSend = isEditing && !formData.password
            ? { name: formData.name, email: formData.email, role: formData.role } 
            : formData;

        onSave(isEditing ? initialData._id : null, dataToSend);
    };

    return (
        <div className="card p-4 shadow-sm mb-4">
            <h4 className="mb-4 text-primary" style={{ fontFamily: 'Poppins' }}>
                {isEditing ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
            </h4>
            <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSaving}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSaving}
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Rol</label>
                    <select
                        className="form-select"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        disabled={isSaving}
                    >
                        <option value="user">Usuario Estándar</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Contraseña {isEditing ? '(dejar vacío para no cambiar)' : ''}
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required={!isEditing}
                        disabled={isSaving}
                    />
                    {!isEditing && <small className="form-text text-muted">Mínimo 6 caracteres, 1 mayúscula, 1 minúscula, 1 número.</small>}
                </div>

                <div className="d-flex justify-content-end mt-4">
                    <button type="button" className="btn btn-secondary me-2" onClick={onCancel} disabled={isSaving}>
                        Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={isSaving}>
                        {isSaving ? 'Guardando...' : (isEditing ? 'Actualizar Usuario' : 'Crear Usuario')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;