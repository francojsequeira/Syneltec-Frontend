// src/components/Admin/UserList.jsx

import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import { useAuth } from '../../context/useAuth';
import useCrud from '../../hooks/useCrud';
import { API_CONFIG } from '../../config/api';

const UserList = () => {
    // Uso mi hook de autenticación para obtener el estado y el usuario actual
    const { isAdmin, user: currentUser, loading: authLoading } = useAuth();
    // Uso mi hook CRUD para la gestión de usuarios
    const { fetchAll, create, update, remove, error: crudError, loading: crudLoading } = useCrud(API_CONFIG.USER);

    // Mis estados
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const isSaving = crudLoading;

    const loadUsers = async () => {
        // Solo cargo la lista si soy administrador
        if(isAdmin) {
             const usersData = await fetchAll();
             if (usersData) setUsers(usersData);
        }
    };

    useEffect(() => {
        if (!authLoading && isAdmin) {
            loadUsers();
        }
    }, [authLoading, isAdmin]);

    // --- Handlers CRUD ---

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
            loadUsers(); 
        }
    };

    const handleDelete = async (userId) => {
        if (!window.confirm("ADVERTENCIA: ¿Estás seguro de eliminar este usuario?")) return;
        const result = await remove(userId);
        if (result.success) {
            loadUsers(); 
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
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(user._id)}
                                            disabled={currentUser && currentUser._id === user._id}
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