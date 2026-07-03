import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack'; // <--- Importa esto
import App from './App';
import './assets/fonts/montserrat/stylesheet.css';
import './index.css';
import './App.css';

const createApp = (): void => {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error('Failed to find the root element');
  }

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <SnackbarProvider
          maxSnack={3} // Máximo de toasts visibles a la vez
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Posición
        >
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

createApp();