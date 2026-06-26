import clsx from "clsx";

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
    inputId?: string;
    inputType?: string;
    required?: boolean;
    placeholder?: string;
    value?: string | number;
    handleChange?: React.ChangeEventHandler<HTMLInputElement>;
    icon?: React.ReactNode;
    isPassword?: boolean;
    active?: boolean;
    hasError?: boolean;
    setIsFocused: (focused: boolean) => void;
}

export const InputForm: React.FC<InputFormProps> = ({
    inputId,
    inputType,
    required,
    placeholder,
    value,
    handleChange,
    icon,
    isPassword,
    active,
    hasError,
    setIsFocused
}) => {
    return (
        <input
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
                active ? "border-primary-500 ring-2 ring-primary-200 shadow-md shadow-primary-100/50" : "border-slate-200",
                hasError && "border-red-500 ring-2 ring-red-200 shadow-md shadow-red-100/50"
            )}
        />
    );
}