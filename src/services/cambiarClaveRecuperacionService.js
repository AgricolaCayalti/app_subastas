import { httpClient } from "@/api/httpClient";

/* string: email, string: token */
export const cambiarClaveRecuperacionService = async ({codigo, correo, clave}) => {
    const res = await httpClient.post(`/cambiar-clave`, {
        codigo,
        correo,
        clave
    });
    return res.data.data;
};