import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import api from '../services/api';

const UserSettings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const resetUserContext = () => {
    setUser({
      token: null,
      id: null,
      email: null,
      name: null,
    });
  };

  const handleLogout = async () => {
    try {
      const response = await api.post('/logout', null, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.data.message === "Sesión cerrada correctamente") {
        resetUserContext();
        navigate('/', { replace: true });
      } else {
        console.error('Error al cerrar sesión:', response.data.message);
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Aún si hay error en el backend, se limpia el contexto local
      resetUserContext();
      navigate('/', { replace: true });
    }
  };

  const handleViewProfile = async () => {
    try {
      const response = await api.get('/profile', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.data && response.data._id) {
        setUserProfile(response.data);
        alert(`
          Nombre: ${response.data.name}
          Email: ${response.data.email}
          Cuenta creada: ${new Date(response.data.createdAt).toLocaleDateString()}
        `);
      } else {
        console.error('Error al obtener el perfil:', response.data);
      }
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      try {
        const response = await api.delete('/profile', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (response.data.message === "Cuenta eliminada correctamente") {
          resetUserContext();
          navigate('/', { replace: true });
        } else {
          console.error('Error al eliminar la cuenta:', response.data.message);
        }
      } catch (error) {
        console.error('Error al eliminar la cuenta:', error);
        // Aún si hay error en el backend, se limpia el contexto local
        resetUserContext();
        navigate('/', { replace: true });
      }
    }
  };

  return (
    <div className="nav-item dropdown" ref={dropdownRef}>
      <button
        className="nav-link dropdown-toggle btn btn-link"
        onClick={() => setIsOpen(!isOpen)}
      >
        Ajustes de Usuario
      </button>

      {isOpen && (
        <div className="dropdown-menu show position-absolute">
          <button className="dropdown-item" onClick={handleViewProfile}>
            Perfil de Usuario
          </button>
          <button className="dropdown-item" onClick={handleLogout}>
            Cerrar Sesión
          </button>
          <div className="dropdown-divider"></div>
          <button className="dropdown-item text-danger" onClick={handleDeleteAccount}>
            Eliminar Cuenta
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSettings;