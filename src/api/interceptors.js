import axios from "axios";
import {ApiError} from "@/api/ApiError.js";
import {store} from "@/store/store.js";
import {forceLogout} from "@/store/auth/authSlice.js";
import {decodePlainToken} from "@/utils/sanctum.js";

function extractServerMessage(error) {
    const data = error.response?.data;
    // Ajusta a tu backend: message / error / errors[0] ...
    return data?.message || data?.error || data?.errors?.[0];
}

const getToken = () => store.getState().auth?.token
export const setupInterceptors = (instance, sessionKey) => {
    if (sessionKey){
        instance.interceptors.request.use(config => {
            const token = getToken();
            if (token) {
                const accessToken = decodePlainToken(token?.accessToken);
                config.headers.Authorization = `${token?.tokenType} ${accessToken}`;
            }
            return config;
        });
    }

    instance.interceptors.response.use(
        res => res, //Change when Implemented the "data" structure ApiResponse on Backend
        error => {
            //puedes manejar errores globales aquí
            if (axios.isCancel(error) || error.code === 'ERR_CANCELED' || error.name === 'CanceledError') {
                return Promise.reject(new ApiError('Solicitud cancelada.', undefined, 'CANCEL', error));
            }
            // Timeout
            if (error.code === 'ECONNABORTED') {
                return Promise.reject(new ApiError('Tiempo de espera agotado.', 408, 'TIMEOUT', error));
            }
            // Sin respuesta (network, CORS, DNS)
            console.log({error})
            if (!error.response) {
                return Promise.reject(new ApiError('Error de red. Intenta más tarde.', undefined, error.code, error));
            }

            // Con respuesta del servidor
            const status = error.response.status;
            const srvMsg = extractServerMessage(error);

            if (status === 401) {
                store.dispatch(forceLogout('unauthorized'));
                return Promise.reject(new ApiError('No autorizado. Inicia sesión.', 401, 'UNAUTH', error.response?.data));
            }

            // Mapea por status si quieres mensajes por defecto
            const defaultMsgByStatus = {
                400: 'Solicitud inválida.',
                401: 'Sesión expirada. Inicia sesión nuevamente.',
                403: 'No autorizado para esta acción.',
                404: 'Recurso no encontrado.',
                422: 'Datos inválidos. Revisa el formulario.',
                500: 'Error interno del servidor.',
                503: 'Servicio no disponible.',
            };

            const message = srvMsg || defaultMsgByStatus[status] || 'Ocurrió un error inesperado.';
            return Promise.reject(new ApiError(message, status, error.code, error.response?.data));
        }
    );
};