import { useEffect, useState } from "react";
import { cambiarClaveService } from "../../services/auth";
import { useDispatch } from "react-redux";
import {clearLogoutReason, logout} from "@/store/auth/authSlice.js";

const defaultFormValues = {
    clave : "",
    clave_confirmar: ""
};

export const useModalCambioClave = () => {
    const dispatch = useDispatch();
    const [form, setForm] = useState(defaultFormValues);
    const [cargando, setCargando] = useState(false);
    const [errorClaves, setErrorClaves] = useState();

    const onSetValueForm = (key, value) => {
        setForm(currentForm => {
            return {
                ...currentForm,
                [key]: value
            };
        })
    };

    const onCambiarClave = async(fnImperative) => {
        setCargando(true);
        try {
            const data = await cambiarClaveService({clave: form.clave});
            setForm(defaultFormValues);
            dispatch(logout())

            if (fnImperative){
                fnImperative();
            }
        } catch (error) {
            throw error;
        } finally {
            setCargando(false);
        }
    };

    useEffect(()=>{
        if (form.clave === "" && form.clave_confirmar === ""){
            setErrorClaves(false);
            return;
        }

       setErrorClaves(form.clave !== form.clave_confirmar);
    }, [form.clave, form.clave_confirmar]);

    return {
        cargando,
        errorClaves,
        form,
        onSetValueForm,
        onCambiarClave
    }
};