import React from "react"
import clsx from "clsx"
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";

interface ButtonInlineEndProps {
    handleClear: () => void;
    active: boolean;
    value: string;
    isPassword: boolean;
    showPassword: boolean;
    setShowPassword: (showPassword: boolean) => void;
}

export const ButtonInlineEnd: React.FC<ButtonInlineEndProps> = ({ handleClear, active, value, isPassword, showPassword, setShowPassword }) => {
    return (
        <React.Fragment>
            <button
                type="button"
                onClick={handleClear}
                className={clsx(
                    "absolute",
                    "top-1/2",
                    "-translate-y-1/2",
                    "flex", "items-center",
                    "justify-center",
                    "w-7",
                    "h-7",
                    "rounded-full",
                    "transition-all",
                    "duration-200",
                    "hover:scale-110",
                    "hover:text-red-500",
                    "hover:bg-red-50",
                    active ? "text-primary-500 bg-primary-50" : "text-red-900",
                    !value && "opacity-0 pointer-events-none",
                    isPassword ? "right-12" : "right-4"
                )}
            >
                <FaTimes size={13} />
            </button>

            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={clsx(
                        "absolute",
                        "right-4",
                        "top-1/2",
                        "-translate-y-1/2",
                        "flex",
                        "items-center",
                        "justify-center",
                        "w-7",
                        "h-7",
                        "rounded-full",
                        "transition-all",
                        "duration-200",
                        "hover:scale-110",
                        "hover:bg-primary-100 hover:text-primary-700",
                        active ? "text-primary-500 bg-primary-50" : "text-slate-400",
                    )}
                >
                    {showPassword ? <FaEyeSlash size={13} /> : <FaEye size={13} />}
                </button>
            )}
        </React.Fragment>
    )
}