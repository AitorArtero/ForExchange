import React, { useState } from 'react';
import api from '../services/api';
import { useUser } from '../context/UserContext';
import { useCurrency } from '../context/CurrencyContext';

const CurrencyComparison = () => {
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [rateInfo, setRate] = useState(null);
  const [message, setMessage] = useState('');
  const { user } = useUser();
  const { currencies } = useCurrency();
  

  const handleCompare = async () => {
    if (!fromCurrency || !toCurrency) {
      setMessage('Por favor, selecciona ambas divisas.');
      return;
    }

    try {
      const response = await api.get(`/forex/exchange-rate?from_currency=${fromCurrency}&to_currency=${toCurrency}`);
      setRate(response.data);
      setMessage('');
    } catch (error) {
      setMessage('Error al obtener el tipo de cambio.');
    }
  };

  const handleAddToFavorites = async () => {
    if (!rateInfo) return;

    try {
      await api.post(
        '/favorites',
        { exchangeRateId: rateInfo.id },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setMessage('Comparación agregada a favoritos.');
    } catch (error) {
      setMessage('Error al agregar a favoritos.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Comparar Divisas</h2>

      <div className="row mb-3">
        <div className="col">
          <label>Divisa de Origen:</label>
          <select
            className="form-select"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            <option value="">Selecciona una divisa</option>
            {currencies.map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>

        <div className="col">
          <label>Divisa de Destino:</label>
          <select
            className="form-select"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            <option value="">Selecciona una divisa</option>
            {currencies.map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>
      </div>

      <button className="btn btn-primary w-100 mb-3" onClick={handleCompare}>
        Comparar
      </button>

      {message && <div className="alert alert-info mt-3">{message}</div>}

      {rateInfo && (
        <div className="mt-4">
          <h4>Resultado</h4>
          <p><strong>De:</strong> {rateInfo.from_currency}</p>
          <p><strong>A:</strong> {rateInfo.to_currency}</p>
          <p><strong>Tipo de Cambio:</strong> {rateInfo.rate}</p>
          <p><strong>Fecha:</strong> {new Date(rateInfo.timestamp).toLocaleString()}</p>

          <button className="btn btn-success mt-3" onClick={handleAddToFavorites}>
            Agregar a Favoritos
          </button>
        </div>
      )}
    </div>
  );
};

export default CurrencyComparison;
