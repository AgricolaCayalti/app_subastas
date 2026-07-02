import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUI } from '../../hooks';
import { passwordSchema, type PasswordFormData } from '@/schemas/session.change.password';
import { useAuthChangePasswordStore } from '@/store/useAuthChangePasswordStore';
import { cambiarClaveService } from '@/services';

export const useDialogChangePassword = () => {
    const { isDialogOpen, setDialogOpen, isLoading, setLoading, setError } = useAuthChangePasswordStore();
    const { strings } = useUI();
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
        if (isDialogOpen) {
            reset();
        }
    }, [isDialogOpen, reset]);

    const onFormSubmit = async (payload: PasswordFormData) => {
        setLoading(true);
        setError(null);
        try {
            await cambiarClaveService(payload);
            alert(strings.PAGE_FORGOTPASSWORD_MSG_PASSWORD_CHANGED);
            setDialogOpen(false);
            reset();
        } catch (error: any) {
            setError(error.msg || 'Error al iniciar sesión');
        } finally {
            setLoading(false);

        }
    };

    return {
        isDialogOpen,
        setDialogOpen,
        isLoading,
        strings,
        control,
        handleSubmit,
        errors,
        onFormSubmit
    }
}