import { axiosPrivate } from "../../api/axios";

export const cambiarClaveService = async ({clave}) => {
    const res = await axiosPrivate.post(`/sesion/cambiar-clave`, {clave});
    return res.data;
};