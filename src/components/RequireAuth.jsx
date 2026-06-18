import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks";
import {useEffect} from "react";

export const RequireAuth  = ()=>{
    const { user, onBootstrapCheck } = useAuth();
    const location = useLocation();

    useEffect(() => {
        onBootstrapCheck();
    }, [onBootstrapCheck]);

    return (
        user ? <Outlet />
             : <Navigate  to = "/login" state ={{from: location}} replace></Navigate>
    )
}