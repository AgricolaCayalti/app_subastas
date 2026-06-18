import axios from "../api/axios";
const APP_KEY = import.meta.env.VITE_APP_KEY;

/* string: email, string: token */
export const validarCodigoRecuperacionService = async ({codigo, correo}) => {
    const res = await axios.post(`/usuarios-externos-validar-codigo`, {codigo, correo, app: APP_KEY});
    return res.data;
};