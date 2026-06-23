import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

export const PrivateRoute = () => {
    console.log("ACA ESTO CORRIENDO");
    const { authenticated } = useAuthStore();

    return (
        authenticated ? <Outlet /> : <Navigate to="/" replace />
    )
}