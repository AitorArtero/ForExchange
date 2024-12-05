import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await api.post('/register', { email, password, name });
    
      if (response.status === 201 && response.data.message === 'Usuario registrado correctamente') {
        setMessage('Usuario registrado correctamente');
        setTimeout(() => {
          navigate('/'); // Redirige a la pantalla de login después de mostrar el mensaje
        }, 2000); // Espera 2 segundos antes de redirigir
      } else {
        setMessage(response.data.message || 'Error en el registro');
      }
    } catch (error) {
      console.error("Error en el registro:", error);
    
      // Verifica si el error tiene una respuesta de la API
      if (error.response) {
        // Maneja específicamente el caso de email ya registrado
        if (error.response.status === 400 && error.response.data.message === 'El email ya está registrado') {
          setMessage('El email ya está registrado');
        } else {
          setMessage(error.response.data.message || 'Error en el registro');
        }
      } else {
        setMessage('Error al intentar registrarse');
      }
    }      
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Registro</h2>
      {message && <p className="alert alert-info">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre de Usuario</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mb-3">Registrar</button>
        <button type="button" className="btn btn-secondary w-100" onClick={() => navigate('/')}>
          Ir a Inicio de Sesión
        </button>
      </form>
    </div>
  );
};

export default Register;
