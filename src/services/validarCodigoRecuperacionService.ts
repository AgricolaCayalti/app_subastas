import { httpClient } from "@/api/httpClient";

interface ValidarCodigoRecuperacionRequest {
    codigo: string;
    correo: string;
}

/* string: email, string: token */
export const validarCodigoRecuperacionService = async ({ codigo, correo }: ValidarCodigoRecuperacionRequest) => {
    const res = await httpClient.post(`/validar-codigo`, { codigo, correo });
    return res.data.data;
};