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
    disabled?: boolean;
}

export const ButtonInlineEnd: React.FC<ButtonInlineEndProps> = ({ handleClear, active, value, isPassword, showPassword, setShowPassword, disabled = false }) => {
    return (
        <React.Fragment>
            {
                !disabled && (
                    <div
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
                        <FaTimes  />
                    </div>
                )
            }


            {isPassword && (
                <div
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
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
            )}
        </React.Fragment>
    )
}