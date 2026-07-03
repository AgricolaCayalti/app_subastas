import rutas from "@/data/rutas";
import { useUI } from "@/hooks";
import { RegisterForm, RegisterRequest, registerSchema } from "@/schemas/register.schema";
import { registrarseService } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTermsConditions } from "../TermsConditions/useTermsConditions";

export const useSignUp = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { strings } = useUI();
    const { toggleCheck } = useTermsConditions();


    const {
        control,
        handleSubmit,
        setValue,
        watch
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
        mode: 'onChange'
    });

    const handleRegister = async (payload: RegisterRequest) => {
        setIsLoading(true);
        try {
            await registrarseService(payload);
            toggleCheck();
            navigate(rutas.LOGIN);
        } catch (error: any) {
            /* showNotyError({ error: (error as any).msg }); */
        } finally {
            setIsLoading(false);
        }
    }

    return {
        handleSubmit,
        handleRegister,
        strings,
        control,
        isLoading,
        setValue,
        watch
    }
}