import { useUI } from "@/hooks";
import { useState } from "react";

export const useTermsConditions = () => {
    const [ isChecked, setIsChecked ] = useState(false);
    const { strings, isAcceptedTYC, onToggleCheck } = useUI();

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        onToggleCheck();
    };

    const toggleCheck = () => setIsChecked((prev) => !prev);

    return {
        isChecked,
        toggleCheck,
        handleSubmit,
        strings,
        isAcceptedTYC
    };
};