import { httpClient } from "@/api/httpClient";

export const enviarCorreoRecuperacionService = async (correo) => {
    const res = await httpClient.post(`/correo-recuperacion`, { correo });
    return res.data.data;
};