import { useEffect } from "react";
import { useSearchDocument } from "./useSearchDocument";
import { useSignUp } from "./useSignUp";

export const useForm = () => {
    const { handleSubmit, handleRegister, strings, control, isLoading, setValue, watch } = useSignUp();
    const { isLoading: isSearching, handleSearching, error, clearSearch } = useSearchDocument(setValue);

    const numeroDocumento = watch('numero_documento');
    const razonSocial = watch('razon_social');

    useEffect(() => {
        if (!numeroDocumento || numeroDocumento.trim() === '') {
            clearSearch();
        }
    }, [numeroDocumento, clearSearch, setValue]);

    const handlerClearDocument = () => {
        clearSearch();
        setValue('numero_documento', '', { shouldValidate: true });
    }

    return {
        handleSubmit, 
        handleRegister, 
        strings, 
        control, 
        isLoading,
        isSearching, 
        handleSearching, 
        error, 
        razonSocial,
        handlerClearDocument
    }
}