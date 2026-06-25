import { httpClient } from "@/api/httpClient";
import { ChangePasswordRequest } from "@/schemas/recover.email.password.schema";

export const cambiarClaveRecuperacionService = async ({ codigo, correo, clave }: ChangePasswordRequest) => {
    const { data } = await httpClient.post(`/cambiar-clave`, {
        codigo,
        correo,
        clave
    });
    return data.data;
};