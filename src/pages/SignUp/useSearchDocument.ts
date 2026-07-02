
import { RegisterForm } from "@/schemas/register.schema";
import { consultarDNIRUCService } from "@/services";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";

export const useSearchDocument = (setValue: UseFormSetValue<RegisterForm>) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleSearching = async (numberDoocument: string) => {
        setIsLoading(true);
        setError("");
        try {
            const search = await consultarDNIRUCService(numberDoocument);
            setValue('razon_social', search.ruc ? search.razon_social : `${search.nombres} ${search.ap_paterno} ${search.ap_materno}`, { shouldValidate: true });
        } catch (error: any) {
            setError((error as any).msg);
        } finally {
            setIsLoading(false);
        }
    }

    const clearSearch = () => {
        setError("");
        setIsLoading(false);
        setValue('razon_social', '', { shouldValidate: true });
    };

    return {
        isLoading,
        handleSearching,
        error,
        clearSearch
    }
}