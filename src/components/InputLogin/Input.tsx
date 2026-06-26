import React, { useState } from "react";
import { HasError } from "./HasError";
import { ButtonInlineEnd } from "./ButtonInlineEnd";
import { Label } from "./Label";
import { Icon } from "./Icon";
import { InputForm } from "./InputForm";

interface InputProps {
    icon: React.ReactNode;
    label: string;
    name?: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    errorMessage?: string;
}


export const Input = ({
    icon,
    label,
    name,
    type = "text",
    required,
    placeholder,
    value = "",
    onChange,
    errorMessage,
}: InputProps) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const inputType = type === "password" && showPassword ? "text" : type;
    const isPassword = type === "password";
    const inputId = name || "input-login";
    const active = isFocused || value.length > 0; // Ahora value viene por props
    const hasError = !!errorMessage;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(newValue); // Solo notificamos al formulario
    };

    const handleClear = () => {
        onChange(""); // Limpiamos notificando al formulario
    };

    return (
        <React.Fragment>
            <div className="relative">
                {icon && <Icon active={active} icon={icon} />}

                <InputForm
                    inputId={inputId}
                    inputType={inputType}
                    required={required}
                    placeholder={placeholder}
                    value={value}
                    handleChange={handleChange}
                    icon={icon}
                    isPassword={isPassword}
                    active={active}
                    hasError={hasError}
                    setIsFocused={setIsFocused}

                />

                <Label
                    inputId={inputId}
                    active={active}
                    icon={icon}
                    hasError={hasError}
                    label={label}
                    required={required}
                />

                <ButtonInlineEnd
                    handleClear={handleClear}
                    active={active}
                    value={value}
                    isPassword={isPassword}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                />
            </div>

            {hasError && <HasError errorMessage={errorMessage} />}
        </React.Fragment>
    );
};