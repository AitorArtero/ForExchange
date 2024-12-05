import React, { createContext, useState, useContext } from 'react';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currencies, setCurrencies] = useState([]);

  const setCurrencyList = (currencyList) => {
    setCurrencies(currencyList);
  };

  return (
    <CurrencyContext.Provider value={{ currencies, setCurrencyList }}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Hook para consumir el contexto
export const useCurrency = () => useContext(CurrencyContext);
