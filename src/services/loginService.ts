import { httpClient } from "@/api/httpClient";
import { LoginRequest } from "@/schemas/login.schema";

export const loginService = async (payload: LoginRequest) => {
    const { data } = await httpClient.post('/iniciar-sesion', payload);
    return data.data;
};