import { forwardRef, useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";

interface InputPasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string; // opcional, se usará como placeholder
}

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
    ({ label, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        const toggleShow = () => setShowPassword((prev) => !prev);

        return (
            <InputGroup>
                <InputGroupInput
                    ref={ref}
                    type={showPassword ? "text" : "password"}
                    placeholder={label}
                    {...props} // value, onChange, onBlur, etc.
                />
                <InputGroupAddon>
                    <FaLock />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end" onClick={toggleShow}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroupAddon>
            </InputGroup>
        );
    }
);

InputPassword.displayName = "InputPassword";