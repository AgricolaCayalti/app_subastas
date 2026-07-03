import { useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Capacitor, type PluginListenerHandle } from "@capacitor/core";
import { App } from "@capacitor/app";
import { Toast } from '@capacitor/toast';


export const useCapacitorJS = (pathname = "/main") => {
    const navigate = useNavigate();
    const location = useLocation();
    const lastBackPressed = useRef(0);

    const handleBack = useCallback(async () => {
        const isRootScreen = location.pathname === pathname;

        if (!isRootScreen) {
            if (window.history.length > 1) {
                navigate(-1);
            } else {
                navigate("/");
            }
            return;
        }

        const now = Date.now();
        if (now - lastBackPressed.current < 2000) {
            await App.exitApp();
        } else {
            lastBackPressed.current = now;
            await Toast.show({ text: "Presiona otra vez para salir", duration: "short" });
        }
    }, [location.pathname, navigate]);


    useEffect(() => {
        if (!Capacitor.isNativePlatform()) return;
        let listenerHandle: PluginListenerHandle | null = null;
        const setup = async () => {
            listenerHandle = await App.addListener('backButton', () => {
                handleBack();
            });
        };
        setup();
        return () => {
            if (listenerHandle) listenerHandle.remove();
        };
    }, [handleBack, pathname]);

    return handleBack;
}
