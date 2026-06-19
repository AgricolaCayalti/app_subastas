import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUI } from '../../hooks';
import { passwordSchema, type PasswordFormData } from '@/schemas/session.change.password';
import { httpClient } from '@/api/httpClient';
import type { DialogChangePasswordProps } from './type';

export const useDialogChangePassword = ({ open, onOpenChange }: DialogChangePasswordProps) => {
    const { strings } = useUI();
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            newPassword: '',
            confirmPassword: '',
        },
    });

    useEffect(() => {
        if (!open) {
            reset();
        }
    }, [open, reset]);

    const onFormSubmit = async (payload: PasswordFormData) => {
        setLoading(true);
        setApiError(null);
        try {
            await httpClient.post('/sesion/cambiar-clave', { clave: payload.newPassword });
            alert(strings.PAGE_FORGOTPASSWORD_MSG_PASSWORD_CHANGED);
            onOpenChange(false);
            reset();
        } catch (error: any) {
            setApiError(error.msg || 'Error al iniciar sesión');
        } finally {
            setLoading(false);

        }
    };

    return {
        strings,
        loading,
        control,
        handleSubmit,
        errors,
        onFormSubmit,
    }
}