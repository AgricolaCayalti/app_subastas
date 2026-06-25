import { useUI } from "@/hooks";
import { cambiarClaveRecuperacionService } from "@/services/cambiarClaveRecuperacionService";
import { enviarCorreoRecuperacionService } from "@/services/enviarCorreoRecuperacionService";
import { validarCodigoRecuperacionService } from "@/services/validarCodigoRecuperacionService";
import { useForgotPasswordStore } from "@/store/useForgotPasswordStore";
import { useNavigate } from "react-router-dom";
import rutas from "@/data/rutas";
import { ChangePasswordRequest, SendRecoveryRequest, ValidateCodeRequest } from "@/schemas/recover.email.password.schema";

export const useForgotPassword = () => {
    const { step, isLoading, error, setStep, setLoading, setError } = useForgotPasswordStore();
    const { strings } = useUI();
    const navigate = useNavigate();

    const onSendRecovery = async (payload: SendRecoveryRequest) => {
        setLoading(true);
        setError(null);
        try {
            const data = await enviarCorreoRecuperacionService(payload);
            console.log("data", data);
            setStep(1);
        } catch (error) {
            setError("Error al cargar las subastas");
        } finally {
            setLoading(false);
        }        
    }

    const onValidateCode = async (payload: ValidateCodeRequest) => {
        setLoading(true);
        setError(null);
        try {
            const data = await validarCodigoRecuperacionService(payload);
            console.log("data", data);
            setStep(2);
        } catch (error) {
            setError("Error al cargar las subastas");
        } finally {
            setLoading(false);
        }        
    }

    const onChangePassword = async (payload: ChangePasswordRequest) => {
        setLoading(true);
        setError(null);
        try {
            const data = await cambiarClaveRecuperacionService(payload);
            console.log("data", data);
            setStep(0);
            navigate(rutas.LOGIN);
        } catch (error) {
            setError("Error al cargar las subastas");
        } finally {
            setLoading(false);
        }        
    }

    return {
        step,
        isLoading,
        error,
        onSendRecovery,
        onValidateCode,
        onChangePassword,
        strings
    }
};