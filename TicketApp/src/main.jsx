// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Import base styles
import './App.css';    // Import app-specific styles
import './styles/theme.css';  // Import theme styles
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
