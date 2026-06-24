import { httpClient } from "@/api/httpClient";

interface EnviarCorreoRecuperacionRequest {
    correo: string;
}

export const enviarCorreoRecuperacionService = async ({ correo }: EnviarCorreoRecuperacionRequest) => {
    const res = await httpClient.post(`/correo-recuperacion`, { correo });
    return res.data.data;
};