import { httpClient } from "@/api/httpClient";
import { SendRecoveryRequest } from "@/schemas/recover.email.password.schema";

export const enviarCorreoRecuperacionService = async ({ correo }: SendRecoveryRequest) => {
    const { data } = await httpClient.post(`/correo-recuperacion`, { correo });
    return  data.data;
};