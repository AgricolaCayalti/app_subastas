import React from "react";

export interface ButtonFormProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    bgColor?: "primary" | "secondary" | "tertiary" | string; // acepta cualquier string que corresponda a variable CSS
    className?: string;
}

export const ButtonForm: React.FC<ButtonFormProps> = ({
    children,
    bgColor = "secondary",
    className = "",
    disabled = false,
    type = "button",
    ...rest
}) => {
    const baseClasses = `
    w-full h-14 px-4 py-3
    text-white text-lg font-medium
    rounded-2xl
    shadow-md hover:shadow-lg
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400
    active:scale-[0.98]
    flex items-center justify-center
    ${disabled ? "opacity-50 cursor-not-allowed shadow-none hover:shadow-none pointer-events-none" : "hover:brightness-90 active:brightness-75 cursor-pointer"}
    ${className}
  `.replace(/\s+/g, " ").trim();

    return (
        <button
            type={type}
            disabled={disabled}
            className={baseClasses}
            style={{ backgroundColor: `var(--${bgColor})` }}
            {...rest}
        >
            {children}
        </button>
    );
};