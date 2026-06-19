import * as z from 'zod';

export const passwordSchema = z
    .object({
        newPassword: z.string()/* .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }) */,
        confirmPassword: z.string()/* .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }) */,
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"], // error will be attached to confirmPassword field
    });

export type PasswordFormData = z.infer<typeof passwordSchema>;