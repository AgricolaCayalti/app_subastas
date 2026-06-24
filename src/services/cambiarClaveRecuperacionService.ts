import { httpClient } from "@/api/httpClient"; 

interface CambiarClaveRecuperacionRequest {
    codigo: string;
    correo: string;
    clave: string;
}

export const cambiarClaveRecuperacionService = async ({codigo, correo, clave}: CambiarClaveRecuperacionRequest) => {
    const res = await httpClient.post(`/cambiar-clave`, {
        codigo,
        correo,
        clave
    });
    return res.data.data;
};