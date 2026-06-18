import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enviarCorreoRecuperacionService } from "@/services/enviarCorreoRecuperacionService.js";
import { validarCodigoRecuperacionService } from "@/services/validarCodigoRecuperacionService.js";
import { Constantes } from "../../data/constantes";
import { cancelCodeSent, updateCodeSent } from "@/store/auth/authSlice.js";
import { cambiarClaveRecuperacionService } from "@/services/cambiarClaveRecuperacionService.js";
import {useNotistack, useUI} from "../../hooks";

const defaultFormValues = {
    correo: "",
    codigo: "",
    clave : "",
    clave_confirmar: ""
};

export const useForgotPassword = () => {
    const dispatch = useDispatch();
    const { mailCodeSent, timeCodeSent } = useSelector( state => state.auth );
    const [form, setForm] = useState({...defaultFormValues, correo: mailCodeSent ?? ""});
    const [loading, setLoading] = useState(false);
    const [loadingValidar, setLoadingValidar] = useState(false);
    const [isShowingChangePassword, setIsShowingChangePassword] = useState(false);
    const {strings} = useUI();
    const { showNotyError } = useNotistack();

    const onSetValueForm = (key, value) => {
        setForm(currentForm => {
            return {
                ...currentForm,
                [key]: value
            };
        })
    };

    const onEnviarCorreo = async (fnImperative) => {
        setLoading(true);
        try {
            const data = await enviarCorreoRecuperacionService(form.correo);

            dispatch(updateCodeSent(form.correo));

            if (fnImperative){
                fnImperative(data);
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const onRefreshCodigo = () => {
        if (timeCodeSent == null){
            return;
        }
        const now   = new Date();
        const minutes = Math.floor((now.getTime() - new Date(timeCodeSent)) / 1000 / 60);

        if (minutes > Constantes.TIEMPO_TOKEN_DURACION_MINUTOS){
            dispatch(cancelCodeSent());
            setForm(defaultFormValues);
            setIsShowingChangePassword( false );
        }
    };

    const onValidarCodigo = async () => {
        setLoadingValidar(true);
        try {
            const codigoRes = await validarCodigoRecuperacionService(form);
            if (codigoRes != 0){
                setIsShowingChangePassword(true);
                return;
            }

            throw new Error(strings.COMMON_CODIGO_NO_VALIDO)
        } catch (error) {
            showNotyError({error});
        } finally {
            setLoadingValidar(false);
        }
    };

    const onCambiarClave = async(fnImperative) => {
        setLoadingValidar(true);
        try {
            const codigoRes = await cambiarClaveRecuperacionService(form);
            dispatch(cancelCodeSent());
            if (codigoRes != 0){
                if (fnImperative){
                    fnImperative();
                }

                return;
            }

            throw new Error(strings.COMMON_CODIGO_NO_VALIDO);
        } catch (error) {
            throw error;
        } finally {
            setLoadingValidar(false);
        }
    };

    return {
        form, 
        onSetValueForm,
        isCodeSent : Boolean(mailCodeSent),
        isShowingChangePassword,
        loading,
        loadingValidar,
        onEnviarCorreo,
        onValidarCodigo,
        onRefreshCodigo,
        onCambiarClave
    }
};