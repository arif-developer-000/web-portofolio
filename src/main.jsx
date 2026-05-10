import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { DarkModeProvider } from './hooks/DarkModeContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </React.StrictMode>
);
