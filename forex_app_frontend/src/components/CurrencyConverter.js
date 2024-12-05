import React, { useState } from 'react';
import api from '../services/api';
import { useCurrency } from '../context/CurrencyContext';

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');
  const { currencies } = useCurrency();

  const handleConvert = async () => {
    if (!fromCurrency || !toCurrency || !amount) {
      setMessage('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await api.get(`/forex/convert?from_currency=${fromCurrency}&to_currency=${toCurrency}&amount=${amount}`);
      setResult(response.data);
      setMessage('');
    } catch (error) {
      setMessage('Error al convertir la divisa.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Conversor de Divisa</h2>
      <div className="mb-3">
        <label>Cantidad:</label>
        <input
          type="number"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="mb-3">
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
      <div className="mb-3">
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
      <button className="btn btn-primary" onClick={handleConvert}>
        Convertir
      </button>

      {message && <div className="alert alert-info mt-3">{message}</div>}

      {result && (
        <div className="mt-3">
          <h4>Resultado</h4>
          <p>
            {amount} {fromCurrency} es igual a {result.result} {toCurrency} (Tipo de cambio: {result.rate})
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
