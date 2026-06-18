import { useState } from "react";
import { useDispatch } from "react-redux";
import { obtenerSubastasActivas } from "@/services/obtenerSubastasActivas.js";
import { useUI } from "../../hooks";

const getStringMomentoCierre= (dateTimeString, textoMostrar = "")=>{
    const dateEndTime = new Date(dateTimeString); 
    const dateNow = new Date();
    let diffTime = Math.floor((dateEndTime - dateNow) / (1000 * 60));
    const lastingDays = diffTime / (60 * 24);
    const lastingDaysRounded = Math.floor(lastingDays);
    diffTime = lastingDays - lastingDaysRounded;

    const lastingMonths = diffTime * 24;
    const lastingMonthsRounded = Math.floor(lastingMonths);
    diffTime = lastingMonths - lastingMonthsRounded;

    const lastingMinutes = diffTime  * 60;
    const lastingMinutesRounded = Math.floor(lastingMinutes);

    return textoMostrar
                .replace(":0", lastingDaysRounded)
                .replace(":1", lastingMonthsRounded)
                .replace(":2", lastingMinutesRounded);
};

export const useProductList = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { strings } = useUI();

    const onListar = async () => {
        setLoading(true);
        try {
            const data = await obtenerSubastasActivas();
            setData(data.map( subasta => ({
                ...subasta,
                momentoCierre: getStringMomentoCierre(subasta.fechaHoraFinRaw, strings.PAGE_PRODUCTLIST_MOMENTO_CIERRE)
            })));
        } catch (error) {
            throw error;
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