import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { Capacitor } from '@capacitor/core';

const API_BASE_URL = import.meta.env.VITE_URL_API;
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT);
const X_APP = import.meta.env.VITE_APP_KEY;

const getBaseURL = () => {
  // Solo en desarrollo local (npm run dev) y en navegador, usamos proxy de Vite
  if (import.meta.env.DEV && !Capacitor.isNativePlatform()) {
    console.log("🌐 Desarrollo local (navegador): usando proxy /api");
    return '/api';
  }
  // Para producción web y toda app móvil (dev o prod), usamos la URL real
  console.log("📡 Entorno:", import.meta.env.DEV ? "Móvil (dev)" : "Producción", "→ URL:", API_BASE_URL);
  return API_BASE_URL;
};

export const httpClient = axios.create({
    baseURL: API_BASE_URL/* getBaseURL() */,
    timeout: API_TIMEOUT,
    headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-App": X_APP,
        // ⚠️ Este header solo es necesario para ngrok en desarrollo móvil.
        // En producción con dominio real no hace falta, pero no molesta.
        "ngrok-skip-browser-warning": "true"
    },
});

// Interceptor para añadir token
httpClient.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // Aseguramos que el header ngrok siempre esté (por si acaso)
        config.headers['ngrok-skip-browser-warning'] = 'true';
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor de respuesta
httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const customError = {
            code: error.response?.status || 500,
            msg: error.response?.data?.message || "Error de red o servidor",
        };
        if (customError.code === 401) {
            localStorage.removeItem('token');
            // Opcional: redirigir a login
        }
        return Promise.reject(customError);
    }
);