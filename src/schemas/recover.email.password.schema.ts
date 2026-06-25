import z from "zod";

// --- Esquemas de validación con Zod ---
export const emailSchema = z.object({
    correo: z.email('Correo inválido'),
});

export const codeSchema = z.object({
    codigo: z.string().min(4, 'El código debe tener al menos 4 caracteres'),
});

export const passwordSchema = z
    .object({
        clave: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
        confirmarClave: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    })
    .refine((data) => data.clave === data.confirmarClave, {
        message: 'Las contraseñas no coinciden',
        path: ['confirmarClave'],
    });

// Tipos inferidos formulario
export type SendRecoveryForm = z.infer<typeof emailSchema>;
export type ValidateCodeForm = z.infer<typeof codeSchema>;
export type ChangePasswordForm = z.infer<typeof passwordSchema>;


export type SendRecoveryRequest = {
    correo: string;
};

export type ValidateCodeRequest = {
    correo: string;
    codigo: string;
};

export type ChangePasswordRequest = {
    correo: string;
    codigo: string;
    clave: string;
};