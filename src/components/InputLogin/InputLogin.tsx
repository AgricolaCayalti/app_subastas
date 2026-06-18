interface InputLoginProps {
    icon: React.ReactNode;
    label: string;
    name?: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    registration?: any; // resultado de register('campo')
    errorMessage?: string;
}

import clsx from "clsx";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaTimes, FaExclamationCircle } from "react-icons/fa";

export const InputLogin = ({
    icon,
    label,
    name,
    type = "text",
    required,
    placeholder,
    registration,
    errorMessage,
}: InputLoginProps) => {
    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const inputType = type === "password" && showPassword ? "text" : type;
    const isPassword = type === "password";
    const inputId = name || "input-login";
    const active = isFocused || value.length > 0;
    const hasError = !!errorMessage;

    // Combina el onChange de react-hook-form con el nuestro para mantener el estado local
    const { onChange: rhfOnChange, ...rhfRest } = registration || {};
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        if (rhfOnChange) rhfOnChange(e);
    };

    // Limpiar el campo
    const handleClear = () => {
        setValue("");
        // Disparar un evento para que react-hook-form también se entere
        const input = document.getElementById(inputId) as HTMLInputElement;
        if (input) {
            const event = new Event("input", { bubbles: true });
            input.value = "";
            input.dispatchEvent(event);
            // También podrías llamar a rhfOnChange con un evento simulado
            if (rhfOnChange) {
                const syntheticEvent = {
                    target: { value: "" },
                } as React.ChangeEvent<HTMLInputElement>;
                rhfOnChange(syntheticEvent);
            }
        }
    };

    return (
        <div className="relative mx-auto w-[calc(100%-3rem)] max-w-md">
            <div className="relative">
                {/* Icono */}
                {icon && (
                    <div
                        className={clsx(
                            "absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-all duration-300",
                            active ? "text-primary-600 scale-110" : "text-slate-400"
                        )}
                    >
                        {icon}
                    </div>
                )}

                {/* Input */}
                <input
                    {...rhfRest}
                    id={inputId}
                    type={inputType}
                    required={required}
                    placeholder={placeholder}
                    autoComplete="off"
                    value={value}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={clsx(
                        "peer w-full rounded-xl border-2 bg-white text-slate-800",
                        "transition-all duration-300 ease-out",
                        "placeholder:text-slate-400 placeholder:opacity-0 focus:placeholder:opacity-100",
                        "hover:border-slate-300",
                        "focus:outline-none",
                        "py-3.5",
                        icon ? "pl-12" : "pl-5",
                        isPassword ? "pr-20" : "pr-12",
                        active
                            ? "border-primary-500 ring-2 ring-primary-200 shadow-md shadow-primary-100/50"
                            : "border-slate-200",
                        hasError && "border-red-500 ring-2 ring-red-200 shadow-md shadow-red-100/50"
                    )}
                />

                {/* Label flotante */}
                <label
                    htmlFor={inputId}
                    className={clsx(
                        "absolute pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-left",
                        !active &&
                        clsx(
                            "top-1/2 -translate-y-1/2",
                            icon ? "left-12" : "left-5",
                            "text-base text-slate-500"
                        ),
                        active &&
                        clsx(
                            "top-0 -translate-y-1/2",
                            icon ? "left-4" : "left-3",
                            "text-[11px] font-semibold",
                            hasError ? "text-red-600" : "text-primary-600",
                            "bg-white px-2 rounded-lg",
                            "border",
                            hasError ? "border-red-300" : "border-primary-200",
                            "shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
                        )
                    )}
                >
                    {label}
                    {required && <span className="ml-0.5 text-red-500">*</span>}
                </label>

                {/* Botón limpiar */}
                <button
                    type="button"
                    onClick={handleClear}
                    className={clsx(
                        "absolute top-1/2 -translate-y-1/2",
                        "flex items-center justify-center",
                        "w-7 h-7 rounded-full",
                        "transition-all duration-200",
                        "hover:scale-110",
                        active
                            ? "text-primary-500 bg-primary-50"
                            : "text-slate-400",
                        "hover:text-red-500 hover:bg-red-50",
                        !value && "opacity-0 pointer-events-none",
                        isPassword ? "right-12" : "right-4"
                    )}
                >
                    <FaTimes size={13} />
                </button>

                {/* Botón mostrar/ocultar contraseña */}
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={clsx(
                            "absolute right-4 top-1/2 -translate-y-1/2",
                            "flex items-center justify-center",
                            "w-7 h-7 rounded-full",
                            "transition-all duration-200",
                            "hover:scale-110",
                            active
                                ? "text-primary-500 bg-primary-50"
                                : "text-slate-400",
                            "hover:bg-primary-100 hover:text-primary-700"
                        )}
                    >
                        {showPassword ? <FaEyeSlash size={17} /> : <FaEye size={17} />}
                    </button>
                )}
            </div>

            {/* Mensaje de error */}
            {hasError && (
                <div className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600 transition-all duration-200">
                    <FaExclamationCircle className="flex-shrink-0" size={14} />
                    <span>{errorMessage}</span>
                </div>
            )}
        </div>
    );
};