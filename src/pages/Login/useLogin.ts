// useLogin.ts
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/index.js";
import rutas from "@/data/rutas.js";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/schemas/login.schema';
import { httpClient } from '@/api/httpClient'; // tu archivo axios
import { useState } from 'react';
import { useAuthStore } from "@/store/useAuthStore";

export const useLogin = () => {
    const navigate = useNavigate();
    /* const { loadingLogin } = useAuth(); // asumo que login actualiza el estad */
    const { login } = useAuthStore();
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
        try {
            const { data } = await httpClient.post('/iniciar-sesion', payload);
            const { token, expiresAt, user } = data.data;
            const expirationDate = new Date(expiresAt).getTime();

            login(user, token, expirationDate);
            navigate("maintest"/* rutas.MAIN */);
        } catch (error: any) {
            setApiError(error.msg || 'Error al iniciar sesión');
        }
    };

    return {
        handleGoSignUp,
        handleGoForgotPassword,
        handleSubmit,
        handleLogin,
        /* loadingLogin: loadingLogin || isSubmitting, // combinamos cargas */
        register,
        errors,
        isSubmitting,
        isValid,
        apiError, // para mostrar en el formulario
    };
};