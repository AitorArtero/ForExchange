import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App';
import { UserProvider } from './context/UserContext';
import { CurrencyProvider } from './context/CurrencyContext';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <CurrencyProvider>
      <App />
    </CurrencyProvider>
  </UserProvider>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/serviceWorker.js").then(
      (registration) => {
        console.log("Service Worker registered with scope:", registration.scope);
      },
      (error) => {
        console.error("Service Worker registration failed:", error);
      }
    );
  });
}
