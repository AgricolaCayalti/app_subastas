import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

export const PublicRoute = () => {
    const { authenticated } = useAuthStore();

    return (
        !authenticated ? <Outlet /> : <Navigate to="/main" replace />
    )
}