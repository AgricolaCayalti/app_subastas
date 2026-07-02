import { httpClient } from "@/api/httpClient";

export const logoutService = async () => {
    const { data } = await httpClient.post('/sesion/cerrar-session');
    return data.data;
};