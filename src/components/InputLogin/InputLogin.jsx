/* import './InputLogin.css';

export const InputLogin = ({
    icon, label, name, type="text", required = false, placeholder = " "
}) => {

    const handleClear = ({currentTarget})=>{
        currentTarget.parentNode.children[1].value = ""
    };

    return  <div className="inputlogin-container">
                {icon &&
                    <div className="inputlogin-icon"> {icon} </div>
                }
                <input className="inputlogin-input" autoComplete="off" type={type} placeholder={placeholder} name={name} required={required}/>
                <label className="inputlogin-label" >{label}</label>
                <div type="button"  className="inputlogin-clear" aria-label="Clear input" onClick={handleClear}>
                    <svg viewBox="0 0 16 16" width="12" height="12">
                        <path d="M 1 1 L 15 15 M 1 15 L 15 1" fill="none" strokeWidth="2" stroke="currentColor" />
                    </svg>
                </div>
            </div>
}; */

import clsx from "clsx";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";

/* interface InputLoginProps {
  icon?: React.ReactNode;
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
} */

export const InputLogin = ({
    icon,
    label,
    name,
    type = "text",
    required = false,
    placeholder = " ",
}/* : InputLoginProps */) => {
    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClear = () => {
        setValue("");
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Determinar el tipo de input real
    const inputType = type === "password" && showPassword ? "text" : type;

    // Si es password, mostramos el ícono de ojo
    const isPassword = type === "password";

    return (
        <div className="relative mt-6 mx-auto w-[calc(100%-3rem)] max-w-md">
            <div className="relative">
                {/* Ícono (si existe) */}
                {icon && (
                    <div
                        className={
                            clsx(
                                "absolute",
                                "left-4",
                                "top-1/2",
                                "-translate-y-1/2",
                                "text-gray-400",
                                "transition-all",
                                "duration-200",
                                "z-10",
                                isFocused ? 'text-primary-600 scale-105' : ''
                            )
                        }
                    >
                        {icon}
                    </div>
                )}

                {/* Input */}
                <input
                    className={
                        clsx(

                            "peer",
                            "w-full",
                            "bg-white/90",
                            "backdrop-blur-sm",
                            "text-gray-800",
                            "text-base",
                            "border-2",
                            "border-gray-200",
                            "rounded-xl",
                            "py-3",
                            icon ? 'pl-12' : 'pl-5',
                            isPassword ? 'pr-12' : 'pr-5',
                            "placeholder:text-transparent",
                            "focus:border-primary-500",
                            "focus:ring-2",
                            "focus:ring-primary-200",
                            "focus:ring-opacity-50",
                            "focus:outline-none",
                            "hover:border-gray-300",
                            "transition-all duration-300",
                            isFocused ? 'border-primary-500 ring-2 ring-primary-200 ring-opacity-50 shadow-lg shadow-primary-100' : ''
                        )
                    }
                    type={inputType}
                    name={name}
                    required={required}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    autoComplete="off"
                />

                <button
                    type="button"
                    className={
                        clsx(
                            "absolute",
                            "top-1/2",
                            "-translate-y-1/2",
                            "flex",
                            "items-center",
                            "justify-center",
                            "w-6",
                            "h-6",
                            "text-gray-400",
                            "rounded-full",
                            "hover:text-red-500",
                            "hover:bg-red-50",
                            "focus:outline-none",
                            "focus:ring-2",
                            "focus:ring-red-200",
                            "transition-all",
                            "duration-200",
                            value ? '' : 'opacity-0 pointer-events-none',
                            isPassword ? 'right-12' : 'right-4'
                        )
                    }
                    onClick={handleClear}
                    aria-label="Limpiar texto escrito"
                >
                    <FaTimes size={14} />
                </button>

                {isPassword && (
                    <button
                        type="button"
                        className={
                            clsx(
                                "absolute right-4 top-1/2 -translate-y-1/2",
                                "flex items-center justify-center",
                                "w-6 h-6",
                                "text-gray-400",
                                "rounded-full",
                                "hover:text-primary-600",
                                "hover:bg-primary-50",
                                "focus:outline-none",
                                "focus:ring-2",
                                "focus:ring-primary-200",
                                "transition-all",
                                "duration-200",
                                "cursor-pointer",
                                value ? 'mr-8' : ''
                            )
                        }
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                )}
            </div>
        </div>
    );
};