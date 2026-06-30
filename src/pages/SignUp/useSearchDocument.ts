
import { RegisterForm } from "@/schemas/register.schema";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";

const mockData = [
    { id: '1', razon_social: 'Computer Soft SAC', documento: '10468562591', tipo: 2 },
    { id: '2', razon_social: 'Aldo Guido Molocho Diaz', documento: '46856259', tipo: 1 },
];

export const useSearchDocument = (setValue: UseFormSetValue<RegisterForm>) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleSearching = async (numberDoocument: string) => {
        setIsLoading(true);
        setError("");
        try {
            const search = mockData.filter(item => item.documento.toString().trim() === numberDoocument.toString().trim());

            if (search.length) {
                const [{ razon_social }] = search;
                setValue('razon_social', razon_social, { shouldValidate: true });
            } else {
                setError("Intenta con otro documento.");
            }
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