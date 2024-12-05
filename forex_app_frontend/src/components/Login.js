import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await api.post('/login', { email, password });

      if (response.status === 200 && response.data.message === 'Login exitoso') {
        const { token, user } = response.data;
        setUser({ 
          token, 
          id: user.id, 
          email: user.email, 
          name: user.name 
        });
        
        navigate('/currencies', { replace: true });
      } else {
        setMessage(response.data.message || 'Error al intentar iniciar sesión');
      }
    } catch (error) {
      console.error("Error en el login:", error);
      setMessage('Error al intentar iniciar sesión');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Iniciar sesión</h2>
      
      {/* Mostrar mensaje de error/éxito del login */}
      {message && (
        <div className="alert alert-info">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-3">
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
        <button type="submit" className="btn btn-primary w-100 mb-3">
          Acceder
        </button>
        <button 
          type="button" 
          className="btn btn-secondary w-100"
          onClick={() => navigate('/register')}
        >
          Ir a Registro
        </button>
      </form>
    </div>
  );
};

export default Login;