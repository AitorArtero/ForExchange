import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import Currencies from './components/Currencies';
import CurrencyComparison from './components/CurrencyComparison';
import CurrencyConverter from './components/CurrencyConverter';
import Favorites from './components/Favorites';
import ProtectedRoute from './components/ProtectedRoute';
import { useUser } from './context/UserContext';

function App() {
  const { user } = useUser();

  // Efecto para redirigir a login si no hay token
  useEffect(() => {
    if (!user?.token) {
      // Si no hay token y no estamos en login o register, redirigir a login
      const currentPath = window.location.pathname;
      if (currentPath !== '/' && currentPath !== '/register') {
        window.location.href = '/';
      }
    }
  }, [user]);

  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={
            user?.token ? <Navigate to="/currencies" replace /> : <Login />
          } />
          <Route path="/register" element={
            user?.token ? <Navigate to="/currencies" replace /> : <Register />
          } />

          {/* Rutas protegidas */}
          <Route path="/currencies" element={
            <ProtectedRoute>
              <Currencies />
            </ProtectedRoute>
          } />
          <Route path="/currency-comparison" element={
            <ProtectedRoute>
              <CurrencyComparison />
            </ProtectedRoute>
          } />
          <Route path="/currency-converter" element={
            <ProtectedRoute>
              <CurrencyConverter />
            </ProtectedRoute>
          } />
          <Route path="/favorites" element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          } />

          {/* Ruta por defecto - redirige a login si no está autenticado */}
          <Route path="*" element={
            <Navigate to="/" replace />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;