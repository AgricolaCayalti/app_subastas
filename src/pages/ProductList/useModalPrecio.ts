import { useDispatch } from "react-redux";
import { insertOferta } from "@/services/insertOferta.js";
import { useState } from "react";
import {useNotistack, useUI} from "../../hooks";

export const useModalPrecio = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { strings } = useUI();
    const { showNotyOK, showNotyError } = useNotistack();
    const onRegistrar = async ({idProductoOfertado, preciosOfertados}) => {
        setLoading(true);
        try {
            const data = await insertOferta({
                idProductoOfertado,
                preciosOfertados
            });

            setData(data);
            showNotyOK({message: strings.PAGE_PRODUCTLIST_OFERTA_REGISTRADA_OK})
        } catch (error) {
            showNotyError({error})
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        data,
        onRegistrar
    }
};