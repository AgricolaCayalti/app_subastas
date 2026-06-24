import { useUI } from "@/hooks";
import { useState } from "react";

export const useTermsConditions = () => {
    const [ isChecked, setIsChecked ] = useState(false);
    const { strings, isAcceptedTYC, onActivateAcceptedTYC } = useUI();

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        onActivateAcceptedTYC();
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