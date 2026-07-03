import { useEffect } from 'react';
import { Keyboard, KeyboardResize  } from '@capacitor/keyboard';

export const useKeyboard = (onShow?: (height: number) => void, onHide?: () => void) => {
    useEffect(() => {
        // Definimos los handles fuera
        let showHandle: any;
        let hideHandle: any;

        const setup = async () => {
            // Establecer modo de redimensionamiento
            await Keyboard.setResizeMode({ mode: KeyboardResize.Body });

            showHandle = await Keyboard.addListener('keyboardWillShow', (info) => {
                onShow?.(info.keyboardHeight);
            });

            hideHandle = await Keyboard.addListener('keyboardWillHide', () => {
                onHide?.();
            });
        };

        setup();

        return () => {
            // Limpiar los listeners
            if (showHandle) showHandle.remove();
            if (hideHandle) hideHandle.remove();
        };
    }, [onShow, onHide]);
};