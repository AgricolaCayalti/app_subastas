import Logo from "@/assets/yarabamba-logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth, useNotistack, useUI } from "@/hooks/index.js";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { loginThunk } from "@/store/auth/authThunks.js";
import rutas from "@/data/rutas.js";


import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/schemas/login.schema'; // Ajusta la ruta

export const useLogin = () => {
    const navigate = useNavigate();
    const { user, loadingLogin } = useAuth();
    const pendingRef = useRef(null);
    const dispatch = useDispatch();
    const { showNotyError } = useNotistack();

    // Configurar el hook
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange'
    });


    const handleGoSignUp = () => {
        navigate(rutas.TERMS_CONDITIONS);
    };

    const handleGoForgotPassword = () => {
        navigate(rutas.FORGOT_PASSWORD);
    };

    const handleLogin = async (data: LoginFormData) => {
        console.log(data);
    }

    useEffect(() => {
        if (!Boolean(user)) {
            return;
        }
        navigate("/main");
    }, [user]);

    useEffect(() => () => { pendingRef.current?.abort?.(); }, []);

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
    }
}