import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  const location = useLocation();

  if (!user || !user.token) {
    return (
      <Navigate 
        to="/" 
        state={{ 
          from: location,
          message: "Por favor, inicia sesión para acceder a esta página" 
        }} 
        replace 
      />
    );
  }

  return children;
};

export default ProtectedRoute;