import { obtenerSubastasPasadas } from "@/services/obtenerSubastasPasadas";
import { useUI } from "../../hooks";
import { useProductsOffersPassedStore } from "@/store/useProductsOffersPassedStore";
import { ProductOffers } from "./types";

export const useProductListClosed = () => {
    const { setLoading, isLoading, setError, error, data, setData } = useProductsOffersPassedStore();
    const { strings } = useUI();

    const getStringMomentoCierre = (dateTimeString: string, textoMostrar: string): string => {
        const dateEndTime = new Date(dateTimeString);
        const dateNow = new Date();
        let diffTime = Math.floor((dateEndTime.getTime() - dateNow.getTime()) / (1000 * 60));
        const lastingDays = diffTime / (60 * 24);
        const lastingDaysRounded = Math.floor(lastingDays);
        diffTime = lastingDays - lastingDaysRounded;

        const lastingHours = diffTime * 24;
        const lastingHoursRounded = Math.floor(lastingHours);
        diffTime = lastingHours - lastingHoursRounded;

        const lastingMinutes = diffTime * 60;
        const lastingMinutesRounded = Math.floor(lastingMinutes);

        return textoMostrar
            .replace(":0", lastingDaysRounded.toString())
            .replace(":1", lastingHoursRounded.toString())
            .replace(":2", lastingMinutesRounded.toString());
    };

    const onListar = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await obtenerSubastasPasadas();
            const dataWithMomentoCierre = data.map((subasta: ProductOffers) => ({
                ...subasta,
                momentoCierre: getStringMomentoCierre(subasta.fechaHoraFinRaw, strings.PAGE_PRODUCTLIST_MOMENTO_CIERRE)
            }));
            setData(dataWithMomentoCierre);
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