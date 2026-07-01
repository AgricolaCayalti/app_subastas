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
    const { step, isLoading, setStep, setLoading, email, setEmail, expiredAt, code, setCode, clear } = useForgotPasswordStore();
    const [timeLeft, setTimeLeft] = useState<string>("");
    const { strings } = useUI();
    const navigate = useNavigate();

    useEffect(() => {
        if (step < 1 || step > 2 || !expiredAt) return;

        const updateTimer = () => {
            const now = Date.now();
            const diff = expiredAt - now;

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
        console.log("C");
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
            const expiredAtTime = new Date(data.expiresAt).getTime();
            setEmail(payload.correo, expiredAtTime);
            setStep(1);
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
            setCode(payload.codigo);
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
                console.log((error as any).code);

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
        control: controlEmail,          // ✅ añadir
    } = useForm<SendRecoveryForm>({
        resolver: zodResolver(emailSchema),
        mode: 'onBlur',
    });

    const {
        register: registerCode,
        handleSubmit: handleSubmitCode,
        formState: { errors: errorsCode },
        control: controlCode,           // ✅ añadir
    } = useForm<ValidateCodeForm>({
        resolver: zodResolver(codeSchema),
        mode: 'onBlur',
    });

    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        formState: { errors: errorsPassword },
        control: controlPassword,       // ✅ añadir
    } = useForm<ChangePasswordForm>({
        resolver: zodResolver(passwordSchema),
        mode: 'onBlur',
    });



    const onPasswordSubmit = (data: ChangePasswordForm) => {
        onChangePassword({
            correo: email,
            codigo: code,
            clave: data.clave,
        });
    };

    

    const handleEmailSubmit = (data: SendRecoveryForm) => {
        onSendRecovery(data);
    };

    const handleCodeSubmit = (data: ValidateCodeForm) => {
        onValidateCode({ correo: email, codigo: data.codigo });
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
        timeLeft,

        controlEmail,
        controlCode,
        controlPassword,
        clear,
        expiredAt 
    }
};