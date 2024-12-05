import React from 'react';
import { Link } from 'react-router-dom';
import UserSettings from './UserSettings';
import { useUser } from '../context/UserContext';

const NavBar = () => {
  const { user } = useUser();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to={user?.token ? "/currencies" : "/"}>
          ForExchange
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {!user?.token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Registro</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/currencies">Divisas Disponibles</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/currency-comparison">Comparar Divisas</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/currency-converter">Conversor de Divisa</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/favorites">Mis Favoritos</Link>
                </li>
                <li className="nav-item">
                  <UserSettings />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;