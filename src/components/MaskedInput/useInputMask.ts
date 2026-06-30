// useInputMask.ts
import { useState, useCallback, useEffect } from 'react';

type MaskType = 'phone' | 'creditCard' | 'date' | 'name' | 'email' | 'custom';

interface UseInputMaskOptions {
    type: MaskType;
    pattern?: string;               // obligatorio si type = 'custom'
    initialValue?: string;
    onChange?: (rawValue: string, formattedValue: string) => void;
}

interface UseInputMaskReturn {
    value: string;                  // valor formateado para el input
    onChange: (newValue: string) => void; // función que recibe el nuevo valor sin procesar
    setValue: (newValue: string) => void; // para actualizar desde fuera (ej. reset)
    rawValue: string;               // valor sin formato (solo dígitos, letras, etc.)
}

// ----- utilidades de máscara (igual que antes) -----
const maskFunctions: Record<MaskType, (value: string, pattern?: string) => string> = {
    phone: (value) => {
        const digits = value.replace(/\D/g, '');
        const match = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
        if (!match) return digits;
        const parts = [match[1], match[2], match[3]].filter(Boolean);
        if (parts.length === 3) return `(${parts[0]}) ${parts[1]}-${parts[2]}`;
        if (parts.length === 2) return `(${parts[0]}) ${parts[1]}`;
        if (parts.length === 1) return `(${parts[0]}`;
        return '';
    },
    creditCard: (value) => {
        const digits = value.replace(/\D/g, '');
        const groups = digits.match(/.{1,4}/g) || [];
        return groups.join(' ');
    },
    date: (value) => {
        const digits = value.replace(/\D/g, '');
        const parts = [];
        if (digits.length > 0) parts.push(digits.substring(0, 2));
        if (digits.length > 2) parts.push(digits.substring(2, 4));
        if (digits.length > 4) parts.push(digits.substring(4, 8));
        return parts.join('/');
    },
    name: (value) => {
        return value.replace(/\b\w/g, (char) => char.toUpperCase());
    },
    email: (value) => value, // sin máscara, solo pasa el valor
    custom: (value, pattern) => {
        if (!pattern) return value;
        let raw = value.replace(/\D/g, '');
        let output = '';
        let rawIndex = 0;
        for (let i = 0; i < pattern.length && rawIndex < raw.length; i++) {
            if (pattern[i] === '#') {
                output += raw[rawIndex];
                rawIndex++;
            } else {
                output += pattern[i];
                if (raw[rawIndex] === pattern[i]) {
                    rawIndex++;
                }
            }
        }
        return output;
    },
};

export const useInputMask = ({
    type,
    pattern,
    initialValue = '',
    onChange,
}: UseInputMaskOptions): UseInputMaskReturn => {
    const getRaw = useCallback((value: string): string => {
        if (type === 'phone' || type === 'creditCard' || type === 'date' || type === 'custom') {
            return value.replace(/\D/g, '');
        }
        return value;
    }, [type]);

    const formatValue = useCallback(
        (raw: string): string => {
            if (type === 'custom' && pattern) {
                return maskFunctions.custom(raw, pattern);
            }
            return maskFunctions[type](raw);
        },
        [type, pattern]
    );

    const [rawValue, setRawValue] = useState<string>(() => getRaw(initialValue));
    const [formattedValue, setFormattedValue] = useState<string>(() => formatValue(rawValue));

    // Sincronizar si cambia initialValue desde fuera
    useEffect(() => {
        const newRaw = getRaw(initialValue);
        if (newRaw !== rawValue) {
            setRawValue(newRaw);
            setFormattedValue(formatValue(newRaw));
        }
    }, [initialValue, getRaw, formatValue, rawValue]);

    const handleChange = useCallback(
        (newValue: string) => {
            const raw = getRaw(newValue);
            const formatted = formatValue(raw);
            setRawValue(raw);
            setFormattedValue(formatted);
            onChange?.(raw, formatted);
        },
        [getRaw, formatValue, onChange]
    );

    const setValue = useCallback(
        (newValue: string) => {
            const raw = getRaw(newValue);
            const formatted = formatValue(raw);
            setRawValue(raw);
            setFormattedValue(formatted);
            onChange?.(raw, formatted);
        },
        [getRaw, formatValue, onChange]
    );

    return {
        value: formattedValue,
        onChange: handleChange,
        setValue,
        rawValue,
    };
};