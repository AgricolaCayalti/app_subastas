import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { store } from './store/store.js'
import App from './App.jsx'
import AuthNotifier from "@/components/AuthNotifier.jsx";
import './assets/fonts/montserrat/stylesheet.css'
import './index.css'

const createApp = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store = { store }>
        <HashRouter>
          <SnackbarProvider maxSnack={3}>
              <AuthNotifier/>
              <App />
          </SnackbarProvider>
        </HashRouter>
      </Provider>
    </React.StrictMode>,
  );
};

const isMovil = Boolean(window.cordova);
if (isMovil){
  document.addEventListener("deviceready", createApp, false);
} else {
  createApp();
}