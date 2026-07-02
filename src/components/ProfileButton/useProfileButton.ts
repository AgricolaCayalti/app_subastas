import { useAuthChangePasswordStore } from "@/store/useAuthChangePasswordStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useUI } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { logoutService } from "@/services";
import { Capacitor } from '@capacitor/core';
import { Dialog } from '@capacitor/dialog';
import { useState } from "react";

export const useProfileButton = () => {
    const { setDialogOpen } = useAuthChangePasswordStore();
    const { user, logout } = useAuthStore();
    const { strings } = useUI();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);


    const isNativePlatform = Capacitor.isNativePlatform();

    const performLogout = async () => {
        await logoutService();
        logout();
        navigate('/', { replace: true });
    };

    const plataformConfirm = async (): Promise<boolean> => {
        let confirmed = false;
        if (isNativePlatform) {
            const { value } = await Dialog.confirm({
                title: 'Cerrar sesión',
                message: '¿Estás seguro de que deseas cerrar sesión?',
                okButtonTitle: 'Sí, cerrar',
                cancelButtonTitle: 'Cancelar',
            });
            confirmed = value;
        } else {
            confirmed = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
        }
        return confirmed; // 👈 retorna el booleano
    };

    const plataformError = async () => {
        if (isNativePlatform) {
            await Dialog.alert({
                title: 'Error',
                message: 'No se pudo cerrar sesión. Intenta de nuevo.',
            });
        } else {
            alert('No se pudo cerrar sesión. Intenta de nuevo.');
        }
    }

    const onSignOut = async () => {
        const confirmed = await plataformConfirm();
        if (!confirmed) {
            console.log("Usuario canceló el logout");
            return; // 👈 detiene la ejecución
        }
        console.log("A:", loading)
        setLoading(true);

        console.log("B:", loading)
        try {
            await performLogout();
        } catch (error) {
            plataformError();
        } finally {
            setLoading(false);
        }
    };

    return {
        setDialogOpen,
        user,
        strings,
        onSignOut,
        loading,
    };
};