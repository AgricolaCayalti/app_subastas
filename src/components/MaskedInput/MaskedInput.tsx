/* // MaskedInput.tsx
import React, { useEffect } from 'react';
import { Input, InputProps } from './Input'; // Ajusta la ruta
import { useInputMask, MaskType } from './useInputMask';

interface MaskedInputProps extends Omit<InputProps, 'value' | 'onChange'> {
    maskType: MaskType;
    maskPattern?: string;
    value: string;               // valor "crudo" desde react-hook-form
    onChange: (raw: string) => void; // actualiza el formulario con el valor crudo
}

export const MaskedInput = ({
    maskType,
    maskPattern,
    value,
    onChange,
    ...inputProps
}: MaskedInputProps) => {
    const { value: maskedValue, onChange: onMaskChange, setValue } = useInputMask({
        type: maskType,
        pattern: maskPattern,
        initialValue: value,
        onChange: (raw) => {
            onChange(raw); // notificar al formulario con el valor crudo
        },
    });

    // Si el valor externo cambia (ej. reset del formulario), actualizamos la máscara
    useEffect(() => {
        setValue(value);
    }, [value, setValue]);

    return (
        <Input
            {...inputProps}
            value={maskedValue}
            onChange={onMaskChange}
        />
    );
}; */