import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_URL_API;
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT);
const X_APP = import.meta.env.VITE_APP_KEY;

export const httpClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-App": X_APP
    },
});

// Interceptor para añadir token
httpClient.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor de respuesta (ya lo tienes)
httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Manejo centralizado de errores (401, 500, etc.)
        const customError = {
            code: error.response?.status || 500,
            msg: error.response?.data?.message || "Error de red o servidor",
        };
        // Si es 401, podrías redirigir al login y limpiar token
        if (customError.code === 401) {
            localStorage.removeItem('token');
            // Opcional: redirigir a login (si no estás ya)
            // window.location.href = '/login';
        }
        return Promise.reject(customError);
    }
);