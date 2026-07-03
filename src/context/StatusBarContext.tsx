import React, { createContext, useContext, useEffect } from 'react';
import { StatusBar, Style } from '@capacitor/status-bar';

type StatusBarStyle = 'dark' | 'light';

interface StatusBarContextType {
    setStatusBarStyle: (style: StatusBarStyle) => void;
    setStatusBarBackgroundColor: (color: string) => void; // nuevo
}

const StatusBarContext = createContext<StatusBarContextType | undefined>(undefined);

export const StatusBarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const setStatusBarStyle = async (style: StatusBarStyle) => {
        try {
            await StatusBar.setStyle({ style: style === 'dark' ? Style.Dark : Style.Light });
        } catch (error) {
            console.error('Error cambiando estilo:', error);
        }
    };

    // Nueva función
    const setStatusBarBackgroundColor = async (color: string) => {
        try {
            // Solo en Android, en iOS no hace nada (o se ignora)
            await StatusBar.setBackgroundColor({ color });
        } catch (error) {
            console.error('Error cambiando color de fondo:', error);
        }
    };

    // Configuración inicial al montar
    useEffect(() => {
        const init = async () => {
            try {
                await StatusBar.setOverlaysWebView({ overlay: true });
                await StatusBar.setStyle({ style: Style.Dark }); // Valor por defecto
            } catch (error) {
                console.error('Error inicializando StatusBar:', error);
            }
        };
        init();
    }, []);

    return (
        <StatusBarContext.Provider value={{ setStatusBarStyle, setStatusBarBackgroundColor }}>
            {children}
        </StatusBarContext.Provider>
    );
};

export const useStatusBar = () => {
    const context = useContext(StatusBarContext);
    if (!context) {
        throw new Error('useStatusBar debe usarse dentro de StatusBarProvider');
    }
    return context;
};