import React from 'react';
import ReactDOM from 'react-dom/client'; // Asegúrate de importar de 'react-dom/client'
import App from './App';
import './assets/styles/global.css'; // Asegúrate de que la ruta sea correcta

// Crear el root para React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizar la app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
