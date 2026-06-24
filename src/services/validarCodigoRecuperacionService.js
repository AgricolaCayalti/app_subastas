import { httpClient } from "@/api/httpClient";
import axios from "../api/axios";
const APP_KEY = import.meta.env.VITE_APP_KEY;

/* string: email, string: token */
export const validarCodigoRecuperacionService = async ({ codigo, correo }) => {
    const res = await httpClient.post(`/validar-codigo`, { codigo, correo });
    return res.data.data;
};