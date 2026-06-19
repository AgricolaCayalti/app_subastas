import { httpClient } from "@/api/httpClient"; 

export const obtenerSubastasActivas = async () => {
    const res = await httpClient.get(`/productos-ofertados`);
    return res.data.data;
};