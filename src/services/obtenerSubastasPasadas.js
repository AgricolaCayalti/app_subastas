import { httpClient } from "@/api/httpClient";

export const obtenerSubastasPasadas = async () => {
    const res = await httpClient.get(`/productos-ofertados?activas=0`);
    return res.data.data;
};