import { axiosPrivate } from "../api/axios";

export const obtenerSubastasActivas = async () => {
    const res = await axiosPrivate.get(`/subastas/productos-ofertados`);
    return res.data;
};