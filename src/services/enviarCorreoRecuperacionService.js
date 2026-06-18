import axios from "../api/axios";
const APP_KEY = import.meta.env.VITE_APP_KEY;

export const enviarCorreoRecuperacionService = async (correo) => {
    const res = await axios.post(`/usuarios-externos-correo-recuperacion`, {correo, app: APP_KEY});
    return res.data;
};