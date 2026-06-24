import { httpClient } from "@/api/httpClient";

export const obtenerSubastasPasadas = async () => {
    const res = await httpClient.get(`/productos-ofertados?active=0`);
    return res.data.data;
};