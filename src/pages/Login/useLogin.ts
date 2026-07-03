import { useNavigate } from "react-router-dom";
import rutas from "@/data/rutas.js";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginRequest } from '@/schemas/login.schema';
import { useAuthStore } from "@/store/useAuthStore";
import { loginService } from "@/services";
import { useKeyboard, useNotistack, useUI } from "@/hooks";
 import { useCapacitorJS } from "@/hooks/useCapacitorJS";

export const useLogin = () => {
    const { strings, language, onSetLanguage, languages } = useUI();
    const { showNotyError } = useNotistack();
    const navigate = useNavigate();
    const { login, setLoading, isLoading: loadingLogin } = useAuthStore();
    useCapacitorJS('/');

    const {
        control,
        handleSubmit
    } = useForm<LoginRequest>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange'
    });

    const handleGoSignUp = () => navigate(rutas.TERMS_CONDITIONS);
    const handleGoForgotPassword = () => navigate(rutas.FORGOT_PASSWORD);

    const handleLogin = async (payload: LoginRequest) => {
        setLoading(true);
        try {
            const { token, expiresAt, user } = await loginService(payload);
            const expirationDate = new Date(expiresAt).getTime();
            login(user, token, expirationDate);
            navigate(rutas.MAIN);
        } catch (error: any) {
            showNotyError({ error: (error as any).msg });
        } finally {
            setLoading(false);
        }
    }

    /* useKeyboard(
        (height) => {
            const form = document.querySelector('form');
            if (form) {
                form.style.paddingBottom = `${height + 16}px`;
            }
        },
        () => {
            const form = document.querySelector('form');
            if (form) {
                form.style.removeProperty('padding-bottom');
            }
        }
    ); */

    return {
        handleSubmit,
        handleLogin,
        handleGoForgotPassword,
        handleGoSignUp,
        loadingLogin,
        control,
        strings,
        language,
        onSetLanguage,
        languages
    };
};