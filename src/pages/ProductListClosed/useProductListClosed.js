import { useState } from "react";
import { obtenerSubastasPasadas } from "@/services/obtenerSubastasPasadas.js";

export const useProductListClosed = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const onListar = async () => {
        setLoading(true);
        try {
            const _data = await obtenerSubastasPasadas();
            setData(_data);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        data,
        onListar
    }
};