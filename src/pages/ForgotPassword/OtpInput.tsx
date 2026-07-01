import React, { useRef, useEffect, useState } from 'react';

interface OtpInputProps {
    value: string;
    onChange: (val: string) => void;
    disabled?: boolean;
    error?: boolean;
    length?: number;
    onComplete?: (val: string) => void;
    uppercase?: boolean; // opcional, por defecto true
}

export const OtpInput: React.FC<OtpInputProps> = ({
    value,
    onChange,
    disabled = false,
    error = false,
    length = 4,
    onComplete,
    uppercase = true,
}) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Sincronizar con el valor externo
    useEffect(() => {
        const chars = value.slice(0, length).split('');
        const newOtp = Array(length).fill('');
        chars.forEach((ch, idx) => (newOtp[idx] = ch));
        setOtp(newOtp);
    }, [value, length]);

    const isValidChar = (char: string): boolean => /^[a-zA-Z0-9]$/.test(char);

    const handleChange = (index: number, char: string) => {
        if (char.length > 1) return;
        if (!isValidChar(char) && char !== '') return;

        const newOtp = [...otp];
        newOtp[index] = uppercase ? char.toUpperCase() : char;
        setOtp(newOtp);
        const fullCode = newOtp.join('');
        onChange(fullCode);

        if (char && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
        if (fullCode.length === length) {
            onComplete?.(fullCode);
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            if (otp[index] === '') {
                if (index > 0) inputRefs.current[index - 1]?.focus();
            } else {
                const newOtp = [...otp];
                newOtp[index] = '';
                setOtp(newOtp);
                onChange(newOtp.join(''));
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text/plain').trim();
        const alphanumeric = pasteData.replace(/[^a-zA-Z0-9]/g, '');
        if (alphanumeric.length === 0) return;
        const chars = alphanumeric.slice(0, length).split('');
        const newOtp = [...otp];
        chars.forEach((ch, idx) => {
            newOtp[idx] = uppercase ? ch.toUpperCase() : ch;
        });
        setOtp(newOtp);
        const fullCode = newOtp.join('');
        onChange(fullCode);

        const nextEmpty = newOtp.findIndex(ch => ch === '');
        if (nextEmpty !== -1) {
            inputRefs.current[nextEmpty]?.focus();
        } else {
            inputRefs.current[length - 1]?.focus();
        }
        if (fullCode.length === length) {
            onComplete?.(fullCode);
        }
    };

    useEffect(() => {
        if (!disabled && inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [disabled]);

    return (
        <div className="flex gap-2 justify-center">
            {Array.from({ length }).map((_, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={otp[index] || ''}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    disabled={disabled}
                    className={`w-12 h-12 text-center text-xl border rounded-md focus:outline-none focus:ring-2 ${error ? 'border-red-500 ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        } disabled:opacity-50`}
                    inputMode="text"
                    autoFocus={index === 0 && !disabled}
                />
            ))}
        </div>
    );
};