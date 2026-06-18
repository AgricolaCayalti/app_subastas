import { axiosPrivate } from "../api/axios";

export const obtenerSubastasPasadas = async () => {
    const res = await axiosPrivate.get(`/subastas/productos-ofertados?activas=0`);
    return res.data;
};