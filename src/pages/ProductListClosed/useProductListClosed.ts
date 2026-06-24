import { obtenerSubastasPasadas } from "@/services/obtenerSubastasPasadas";
import { useUI } from "../../hooks";
import { useProductsOffersPassedStore } from "@/store/useProductsOffersPassedStore";

export const useProductListClosed = () => {
    const { setLoading, isLoading, setError, error, data, setData } = useProductsOffersPassedStore();
    const { strings } = useUI();

    const onListar = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await obtenerSubastasPasadas();
            console.log(data);
            setData(data);
        } catch (error) {
            setError("Error al cargar las subastas");
        } finally {
            setLoading(false);
        }
    };

    return {
        isLoading,
        error,
        data,
        onListar,
        strings
    }
};