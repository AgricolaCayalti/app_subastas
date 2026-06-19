// useLogin.ts
import { useNavigate } from "react-router-dom";
import rutas from "@/data/rutas.js";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/schemas/login.schema';
import { httpClient } from '@/api/httpClient'; // tu archivo axios
import { useState } from 'react';
import { useAuthStore } from "@/store/useAuthStore";

export const useLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const [ loadingLogin, setloadingLogin ] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange'
    });

    const handleGoSignUp = () => navigate(rutas.TERMS_CONDITIONS);
    const handleGoForgotPassword = () => navigate(rutas.FORGOT_PASSWORD);

    const handleLogin = async (payload: LoginFormData) => {
        setApiError(null);
        setloadingLogin(true);  
        try {
            const { data } = await httpClient.post('/iniciar-sesion', payload);
            const { token, expiresAt, user } = data.data;
            const expirationDate = new Date(expiresAt).getTime();

            login(user, token, expirationDate);

            console.log("RUTA = ", rutas.MAIN)
            navigate(rutas.MAIN);
        } catch (error: any) {
            setApiError(error.msg || 'Error al iniciar sesión');
        } finally {
            setloadingLogin(false);
        }
    };

    return {
        handleGoSignUp,
        handleGoForgotPassword,
        handleSubmit,
        handleLogin,
        loadingLogin,
        register,
        errors,
        isSubmitting,
        isValid,
        apiError, // para mostrar en el formulario
    };
};