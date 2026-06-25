import { httpClient } from "@/api/httpClient";

interface EnviarCorreoRecuperacionRequest {
    correo: string;
}

export const enviarCorreoRecuperacionService = async ({ correo }: EnviarCorreoRecuperacionRequest) => {
    const { data } = await httpClient.post(`/correo-recuperacion`, { correo });
    return data.data;
};