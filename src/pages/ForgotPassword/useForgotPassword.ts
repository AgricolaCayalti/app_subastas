import { useNotistack, useUI } from "@/hooks";
import { cambiarClaveRecuperacionService } from "@/services/cambiarClaveRecuperacionService";
import { enviarCorreoRecuperacionService } from "@/services/enviarCorreoRecuperacionService";
import { validarCodigoRecuperacionService } from "@/services/validarCodigoRecuperacionService";
import { useForgotPasswordStore } from "@/store/useForgotPasswordStore";
import { useNavigate } from "react-router-dom";
import rutas from "@/data/rutas";
import {
    ChangePasswordForm,
    ChangePasswordRequest,
    codeSchema,
    emailSchema,
    passwordSchema,
    SendRecoveryForm,
    SendRecoveryRequest,
    ValidateCodeForm,
    ValidateCodeRequest
} from "@/schemas/recover.email.password.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

export const useForgotPassword = () => {
    const { showNotyError, showConfirm } = useNotistack();
    const { step, isLoading, setStep, setLoading, email, setEmail, expiredAt } = useForgotPasswordStore();
    const [codeSent, setCodeSent] = useState<string>("");
    const [timeLeft, setTimeLeft] = useState<string>("");
    const { strings } = useUI();
    const navigate = useNavigate();

    useEffect(() => {
        if (step !== 1 || !expiredAt) return;

        const updateTimer = () => {
            const now = Date.now();
            const expiry = new Date(expiredAt).getTime();
            const diff = expiry - now;

            if (diff <= 0) {
                setTimeLeft('⏳ Código expirado');
                return 'expired';
            }

            const minutes = Math.floor(diff / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            const formatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            setTimeLeft(formatted);
            return 'ok';
        };

        const initialStatus = updateTimer();
        if (initialStatus === 'expired') return;

        const intervalId = setInterval(() => {
            const status = updateTimer();
            if (status === 'expired') clearInterval(intervalId);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [expiredAt, step]);

    const onSendRecovery = async (payload: SendRecoveryRequest) => {
        setLoading(true);
        try {
            const data = await enviarCorreoRecuperacionService(payload);
            setStep(1, data.expiresAt);
            setEmail(payload.correo);
        } catch (error) {
            showNotyError({ error: (error as any).msg });
        } finally {
            setLoading(false);
        }
    }

    const onValidateCode = async (payload: ValidateCodeRequest) => {
        setLoading(true);
        try {
            await validarCodigoRecuperacionService(payload);
            setStep(2);
        } catch (error) {
            showNotyError({ error: (error as any).msg });
        } finally {
            setLoading(false);
        }
    }

    const onChangePassword = async (payload: ChangePasswordRequest) => {
        const confirmed = await showConfirm({
            message: '¿Estás seguro de cambiar tu contraseña?',
            confirmText: 'Sí',
            cancelText: 'No',
            severity: 'info' 
        });

        if (confirmed) {
            setLoading(true);
            try {
                await cambiarClaveRecuperacionService(payload);
                setStep(0);
                setEmail("");
                navigate(rutas.LOGIN);
            } catch (error) {
                showNotyError({ error: (error as any).msg });
            } finally {
                setLoading(false);
            }
        }
    }

    const {
        register: registerEmail,
        handleSubmit: handleSubmitEmail,
        formState: { errors: errorsEmail },
    } = useForm<SendRecoveryForm>({
        resolver: zodResolver(emailSchema),
        mode: 'onBlur',
    });

    const {
        register: registerCode,
        handleSubmit: handleSubmitCode,
        formState: { errors: errorsCode },
    } = useForm<ValidateCodeForm>({
        resolver: zodResolver(codeSchema),
        mode: 'onBlur',
    });

    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        formState: { errors: errorsPassword }
    } = useForm<ChangePasswordForm>({
        resolver: zodResolver(passwordSchema),
        mode: 'onBlur',
    });

    const onEmailSubmit = (data: SendRecoveryForm) => {
        onSendRecovery({ correo: data.correo });
    };

    const onCodeSubmit = (data: ValidateCodeForm) => {
        onValidateCode({ correo: email, codigo: data.codigo });
    };

    const onPasswordSubmit = (data: ChangePasswordForm) => {
        onChangePassword({
            correo: email,
            codigo: codeSent,
            clave: data.clave,
        });
    };

    const handleResendCode = () => {
        onSendRecovery({ correo: email });
    };

    const handleEmailSubmit = (data: SendRecoveryForm) => {
        setEmail(data.correo);
        onEmailSubmit(data);
    };

    const handleCodeSubmit = (data: ValidateCodeForm) => {
        setCodeSent(data.codigo);
        onCodeSubmit(data);
    };

    return {
        step,
        isLoading,
        strings,
        registerEmail,
        handleSubmitEmail,
        errorsEmail,
        registerCode,
        handleSubmitCode,
        errorsCode,
        registerPassword,
        handleSubmitPassword,
        errorsPassword,
        onPasswordSubmit,
        handleEmailSubmit,
        handleCodeSubmit,
        handleResendCode,
        timeLeft
    }
};