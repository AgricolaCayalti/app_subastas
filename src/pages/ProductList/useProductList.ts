import { obtenerSubastasActivas } from "@/services";
import { useNotistack, useUI } from "@/hooks";
import { useProductsOffersStore } from "@/store/useProductsOffersStore";
import { ProductOffersActive } from "@/components/ProductOffers/types";
import { useSubastasStore } from "@/store/useSubastasStore";
import { useEffect } from "react";

export const useProductList = () => {
    const { showNotyError } = useNotistack();
    const { setLoading, isLoading, data, setData, selected, setSelected } = useProductsOffersStore();
    const { readme, setReadme, handleAddOffer } = useSubastasStore();
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
        try {
            const data = await obtenerSubastasActivas();
            const dataWithMomentoCierre = data.map((subasta: ProductOffersActive) => ({
                ...subasta,
                momentoCierre: getStringMomentoCierre(subasta.fechaHoraFinRaw, strings.PAGE_PRODUCTLIST_MOMENTO_CIERRE)
            }));
            setData(dataWithMomentoCierre);
        } catch (error) {
            showNotyError({ error: (error as Error).message });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        onListar();
    }, []);

    const onSelected = (item: ProductOffersActive) => {
        handleAddOffer(item);
        setSelected(item);
    };

    const onClosed = () => {
        setSelected(null);
        console.log("=>", selected);
    };

    return {
        isLoading,
        data,
        onListar,
        strings,
        selected,
        onSelected,
        onClosed,
        readme,
        setReadme
    }
};