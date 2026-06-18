import axiosInstance from "../api/axios";
const APP_KEY = import.meta.env.VITE_APP_KEY;

/* string: email, string: token */
export const cambiarClaveRecuperacionService = async ({codigo, correo, clave}) => {
    const res = await axiosInstance.post(`/usuarios-externos-cambiar-clave`, {
        codigo,
        correo,
        clave,
        app: APP_KEY
    });
    return res.data;
};