import { useUI } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { useAuthChangePasswordStore } from "@/store/useAuthChangePasswordStore";

export const useMain = () => {
    const { isLoading, error } = useAuthChangePasswordStore();
    const navigate = useNavigate();
    const { strings } = useUI();

    const handleGoTo = (route: string) => {
        navigate(route);
    }

    return {
        strings,
        handleGoTo,
        isLoading,
        error
    }
}