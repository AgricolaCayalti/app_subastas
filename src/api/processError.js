import { deleteStorage } from "../assets/localStorager";
import { Response } from "./constants";

const SESSION_NAME = import.meta.env.VITE_SESSION_NAME;

export const processError = (e)=>{
    if (typeof e === "string"){
        return { text : e, severity: "error"}
    }

    if (e instanceof ReferenceError){
        return { text : "Error de código. Referencia de variable.", severity: "error"}
    }

    if (e instanceof TypeError){
        return { text : "Error de código. Tipo de Variable", severity: "error"}
    }

    const response = e?.response;
    const status = response?.status;

    if (status === Response.HTTP_ERROR){
        return { text : response.data.message, severity: "error"}
    }

    if (status === Response.HTTP_NOENCONTRADO){
        return { text : response.data.message, severity: "error"}
    }

    if (status === Response.HTTP_NOVALIDO){
        return { text : response.data.message, severity: "error"}
    }

    if (status === Response.HTTP_NOAUTORIZADO){
        deleteStorage({key: SESSION_NAME });
        window.location.reload();
        return { text : "Sin acceso autorizado. Sesión expirada.", severity: "error"}
    }

    if (e instanceof Error){
        return { text : e.message, severity: "error" };
    }

    return {text : JSON.stringify(e), severity: "error"};
};