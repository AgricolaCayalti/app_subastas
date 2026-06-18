import {logIn, logOut, validateMyToken} from "../../services/auth";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiError} from "@/api/ApiError.js";
import {loadStorage} from "@/assets/localStorager.js";
import {isExpired} from "@/utils/sanctum.js";
import {forceLogout, logout} from "@/store/auth/authSlice.js";

const SESSION_NAME = import.meta.env.VITE_SESSION_NAME;

export const loginThunk = createAsyncThunk(
    'auth/login',
    async ( payload, { signal, rejectWithValue }) => {
        try {
            return await logIn({
                username: payload.username.trim(),
                password: payload.password
            }, signal);
        } catch (e) {
            if (e instanceof ApiError) {
                return rejectWithValue({ message: e.message, status: e.status, code: e.code });
            }
            throw e;
        }
});

// Bootstrap: si no hay token o está vencido => logout; si sirve, opcionalmente valida /me
export const bootstrapAuthThunk = createAsyncThunk(
    'auth/bootstrap',
    async (_, { dispatch, rejectWithValue }) => {
    const authStorage = loadStorage({key: SESSION_NAME});
    const auth = Boolean(authStorage) ? authStorage : null;

    if (!auth){
        dispatch(forceLogout('unauthorized'));
        return rejectWithValue('unauthorized');
    }

    const { token } = auth;
    if (!token) {
        dispatch(forceLogout('unauthorized'));
        return rejectWithValue('unauthorized');
    }

    if (isExpired(token)) {
        dispatch(forceLogout('expired'));
        return rejectWithValue('expired');
    }

    // (Opcional) valida con /me para asegurar que sigue válida en el backend
    try {
        await validateMyToken();
        return auth;
    } catch {
        dispatch(forceLogout('unauthorized'));
        return rejectWithValue('unauthorized');
    }
});

export const logoutThunk = createAsyncThunk(
    'auth/logout',
        async (_, { signal, dispatch }) => {
            try {
                await logOut(signal);
            } catch {
                // Si falla por red, igual cerramos localmente
            } finally {
                dispatch(logout()); // limpia tokens+user y storage
            }
        }
);