import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useCurrency } from '../context/CurrencyContext';

const Currencies = () => {
  const { setCurrencyList } = useCurrency();
  const [currencies, setCurrencies] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        if (isLoaded) return; // Si ya se han cargado las divisas, no hacemos la petición
        const response = await api.get('/forex/currencies');
        setCurrencies(response.data);

        // Extraemos solo los códigos de las divisas y los almacenamos en el contexto
        const currencyCodes = response.data.map(currency => currency.code);
        setCurrencyList(currencyCodes);

        // Marcamos como cargado para evitar nuevas peticiones
        setIsLoaded(true); 
      } catch (error) {
        console.error('Error al obtener las divisas:', error);
      }
    };

    fetchCurrencies();
  }, [isLoaded, setCurrencyList]); // El efecto solo se ejecuta si 'isLoaded' es false

  // Filtrar divisas
  const filteredCurrencies = currencies.filter(currency =>
    currency.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="text-light">Divisas Disponibles</h2>

      {/* Campo de búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar divisa por código o nombre"
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tabla de divisas */}
      <div className="table-responsive">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Nombre</th>
              <th scope="col">Región</th>
              <th scope="col">País</th>
            </tr>
          </thead>
          <tbody>
            {filteredCurrencies.length > 0 ? (
              filteredCurrencies.map(currency => (
                <tr key={currency.code}>
                  <td>{currency.code}</td>
                  <td>{currency.name}</td>
                  <td>{currency.region}</td>
                  <td>{currency.country}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No se encontraron divisas.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Currencies;
