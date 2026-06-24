import { useNavigate } from "react-router-dom";
import rutas from "@/data/rutas.js";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginRequest } from '@/schemas/login.schema';
import { useAuthStore } from "@/store/useAuthStore";
import { loginService } from "@/services/loginService";

export const useLogin = () => {
    const navigate = useNavigate();
    const { login, setLoading, setError, isLoading : loadingLogin, error } = useAuthStore();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<LoginRequest>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange'
    });

    const handleGoSignUp = () => navigate(rutas.TERMS_CONDITIONS);
    const handleGoForgotPassword = () => navigate(rutas.FORGOT_PASSWORD);

    const handleLogin = async (payload: LoginRequest) => {
        setError(null);
        setLoading(true);  
        try {
            const { token, expiresAt, user } = await loginService(payload);
            const expirationDate = new Date(expiresAt).getTime();
            login(user, token, expirationDate);
            navigate(rutas.MAIN);
        } catch (error: any) {
            setError(error.msg || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
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
        error
    };
};