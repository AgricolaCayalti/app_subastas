import { useState } from "react";
import { useDispatch } from "react-redux";
import { registrarseService } from "@/services/registrarseService.js";

const defaultFormValues = {
    numero_documento: "",
    razon_social: "",
    nombre_contacto: "",
    correo: "",
    telefono: "",
    username: "",
    password: "",
    password_confirm: "",
}

export const useSignUp = () => {
    const dispatch = useDispatch();
    const [form, setForm] = useState(defaultFormValues);
    const [loading, setLoading] = useState(false);

    const onSetValueForm = (key, value) => {
        setForm(currentForm => {
            return {
                ...currentForm,
                [key]: value
            };
        })
    };

    const onGuardar = async (fnImperative) => {
        setLoading(true);
        try {
            const data = await registrarseService({...form, username: form.correo});
            console.log({data})
            if (fnImperative){
                fnImperative(data);
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        form, 
        onSetValueForm,
        loading,
        onGuardar
    }
};