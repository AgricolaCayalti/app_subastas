import { httpClient } from "@/api/httpClient";
import { type PasswordFormData } from '@/schemas/session.change.password';

export const cambiarClaveService = async (payload: PasswordFormData) => {
    await httpClient.post('/sesion/cambiar-clave', { clave: payload.newPassword });
};