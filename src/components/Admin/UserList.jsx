// src/components/Admin/UserList.jsx

import React, { useState, useEffect, useCallback } from 'react';
import UserForm from './UserForm';
import { useAuth } from '../../context/useAuth';
import useCrud from '../../hooks/useCrud';
import { API_CONFIG } from '../../config/api';

const UserList = () => {
    const { isAdmin, user: currentUser, loading: authLoading } = useAuth();
    const { fetchAll, create, update, remove, error: crudError, loading: crudLoading } = useCrud(API_CONFIG.USER);

    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const isSaving = crudLoading;

    // Función de carga de datos (memoizada para ser segura en useEffect)
    const loadUsers = useCallback(async () => {
        if (isAdmin) {
             const usersData = await fetchAll();
             if (usersData) setUsers(usersData);
        }
    }, [fetchAll, isAdmin]);

    // Ejecución controlada del fetch
    useEffect(() => {
        // La lógica de loadUsers queda dentro de la función memoizada.
        // Solo disparamos la carga cuando finaliza la verificación de auth.
        if (!authLoading) {
            loadUsers();
        }
    }, [authLoading, loadUsers]);

    // --- Handlers CRUD ---
    // El handler debe llamar a loadUsers para recargar, no recrear la función.

    const handleSave = async (id, formData) => {
        let result;
        if (id) {
            result = await update(id, formData);
        } else {
            result = await create(formData);
        }

        if (result) {
            setShowForm(false);
            setEditingUser(null);
            await loadUsers(); // Llamo a la función para recargar
        }
    };

    const handleDelete = async (userId) => {
        if (!window.confirm("ADVERTENCIA: ¿Estás seguro de eliminar este usuario?")) return;
        const result = await remove(userId);
        if (result.success) {
            await loadUsers(); // Llamo a la función para recargar
        }
    };

    const startEdit = (user) => {
        setEditingUser(user);
        setShowForm(true);
    };

    if (authLoading || crudLoading) return <div className="container mt-5">Cargando gestión de usuarios...</div>;

    if (!isAdmin) {
        return <div className="container mt-5 alert alert-danger">Acceso Denegado. Solo administradores pueden gestionar usuarios.</div>;
    }

    // EL RESTO DEL CÓDIGO JSX PERMANECE IGUAL
    return (
        <div className="container my-5">
            <h2 className="text-dark mb-4" style={{ fontFamily: 'Poppins' }}>
                Gestión de Usuarios
            </h2>
            
            {crudError && <div className="alert alert-danger">{crudError}</div>}

            <div className="d-flex justify-content-between mb-3">
                <p>Total de usuarios: {users.length}</p>
                <button 
                    className={`btn ${showForm ? 'btn-secondary' : 'btn-primary'}`} 
                    onClick={() => { 
                        setShowForm(!showForm); 
                        setEditingUser(null); 
                    }}
                >
                    <i className={`fas fa-${showForm ? 'times' : 'plus'} me-2`}></i> 
                    {showForm ? 'Cerrar Formulario' : 'Nuevo Usuario'}
                </button>
            </div>

            {showForm && (
                <UserForm 
                    initialData={editingUser} 
                    onSave={handleSave}
                    onCancel={() => { 
                        setShowForm(false); 
                        setEditingUser(null); 
                    }} 
                    isSaving={isSaving}
                />
            )}

            {!showForm && users.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-striped table-hover shadow-sm">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-info'}`}>
                                            {user.role.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>
                                        <button 
                                            className="btn btn-sm btn-warning me-2"
                                            onClick={() => startEdit(user)}
                                            title="Editar Usuario"
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(user._id)}
                                            disabled={currentUser && currentUser._id === user._id}
                                            title="Eliminar Usuario"
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
            
            {!showForm && users.length === 0 && !crudError && (
                 <div className="alert alert-info text-center mt-4">No hay usuarios registrados.</div>
            )}
        </div>
    );
};

export default UserList;