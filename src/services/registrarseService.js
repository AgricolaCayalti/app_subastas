import { httpClient } from "@/api/httpClient";

const APP_KEY = import.meta.env.VITE_APP_KEY;

export const registrarseService = async (payload) => {
    const { data } = await httpClient.post(`/registrar`, payload);
    return data.data;
};