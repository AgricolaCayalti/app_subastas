import { httpClient } from "@/api/httpClient"; 

export const obtenerSubastasActivas = async () => {
    const res = await httpClient.get(`/productos-ofertados?active=1`);
    return res.data.data;
};