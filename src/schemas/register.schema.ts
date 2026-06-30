import { z } from 'zod';

export const registerSchema = z.object({
    
    numero_documento: z.string()
        .min(8, 'El número de documento debe tener al menos 8 dígitos')
        .max(11, 'El número de documento no puede exceder los 11 dígitos'),
    razon_social: z
        .string(),

    correo: z
        .email('Debe ser un correo electrónico válido')
        .max(100, 'El correo no puede exceder los 100 caracteres'),
    username: z
        .email('El nombre de usuario debe ser un correo electrónico válido')
        .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
        .max(50, 'El nombre de usuario no puede exceder los 50 caracteres'),
    password: z
        .string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .regex(/[A-Z]/, 'La contraseña debe contener al menos una mayúscula')
        .regex(/[a-z]/, 'La contraseña debe contener al menos una minúscula')
        .regex(/\d/, 'La contraseña debe contener al menos un número'),
    confirm_password: z
        .string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .regex(/[A-Z]/, 'La contraseña debe contener al menos una mayúscula')
        .regex(/[a-z]/, 'La contraseña debe contener al menos una minúscula')
        .regex(/\d/, 'La contraseña debe contener al menos un número'),
    nombre_contacto: z.string()
        .min(2, 'El nombre de contacto debe tener al menos 2 caracteres')
        .max(100, 'El nombre de contacto no puede exceder los 100 caracteres'),
    telefono: z.string()
        .min(7, 'El teléfono debe tener al menos 7 dígitos')
        .max(15, 'El teléfono no puede exceder los 15 dígitos')
        .regex(/^[0-9+\-() ]+$/, 'El teléfono contiene caracteres inválidos'),
})
    .refine((data) => data.password === data.confirm_password, {
        message: 'Las contraseñas no coinciden',
        path: ['confirm_password'],
    });

export type RegisterForm = z.infer<typeof registerSchema>;


export type RegisterRequest = {
    razon_social: string;
    numero_documento: string;
    correo: string;
    username: string;
    password: string;
    nombre_contacto: string;
    telefono: string;
};

