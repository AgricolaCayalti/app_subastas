import { obtenerSubastasPasadas } from "@/services";
import { useNotistack, useUI } from "@/hooks";
import { useProductsOffersPassedStore } from "@/store/useProductsOffersPassedStore";

export const useProductListClosed = () => {
    const { showNotyError } = useNotistack();
    const { setLoading, isLoading, data, setData } = useProductsOffersPassedStore();
    const { strings } = useUI();

    const onListar = async () => {
        setLoading(true);
        try {
            const data = await obtenerSubastasPasadas();
            setData(data);
        } catch (error) {
            showNotyError({ error: (error as any).message });
        } finally {
            setLoading(false);
        }
    };

    return {
        isLoading,
        data,
        onListar,
        strings
    }
};