import { useEffect } from 'react';
import { StatusBar, Style } from '@capacitor/status-bar';

export const useStatusBar = () => {
    useEffect(() => {
        const configure = async () => {
            try {
                await StatusBar.setOverlaysWebView({ overlay: true });
                await StatusBar.setStyle({ style: Style.Dark });
                // Si quieres un color de fondo (opcional, solo si overlay es false)
                // await StatusBar.setBackgroundColor({ color: '#ffffff' });
            } catch (error) {
                console.error('Error configurando StatusBar:', error);
            }
        };

        configure();
    }, []); // Solo al montar
};