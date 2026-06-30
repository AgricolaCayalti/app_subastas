import { httpClient } from "@/api/httpClient";
import { RegisterRequest } from "@/schemas/register.schema";

export const registrarseService = async (payload: RegisterRequest) => {
    const { data } = await httpClient.post(`/registrar`, payload);
    return data.data;
};