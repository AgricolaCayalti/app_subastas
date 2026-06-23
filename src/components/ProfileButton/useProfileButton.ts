import { useAuthChangePasswordStore } from "@/store/useAuthChangePasswordStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useUI } from "@/hooks";
import { useNavigate } from "react-router-dom";

export const useProfileButton = () => {
    const {  setDialogOpen } = useAuthChangePasswordStore();
    const { user, logout } = useAuthStore();
    const { strings } = useUI();
    const navigate = useNavigate();

    const onSignOut = () => {
        logout();
        navigate("/");
    };

    return {
        
        setDialogOpen,
        user,
        strings,
        onSignOut,
    };
}