import { httpClient } from "@/api/httpClient";
import { ValidateCodeRequest } from "@/schemas/recover.email.password.schema";

export const validarCodigoRecuperacionService = async ({ codigo, correo }: ValidateCodeRequest) => {
    const res = await httpClient.post(`/validar-codigo`, { codigo, correo });
    return res.data.data;
};