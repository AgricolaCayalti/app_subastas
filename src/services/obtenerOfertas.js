import { axiosPrivate } from "../api/axios";

export const obtenerOfertas = async () => {
    const res = await axiosPrivate.get(`/comprador-ofertas`);
    return res.data;
};