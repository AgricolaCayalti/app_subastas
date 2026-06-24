import { insertOferta } from "@/services/insertOferta.js";
import { useState } from "react";
import {useNotistack, useUI} from "../../hooks";
import { PayloadInsertOferta } from "./types";

export const useModalPrecio = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { strings } = useUI();
    const { showNotyOK, showNotyError } = useNotistack();
    const onRegistrar = async (payload: PayloadInsertOferta) => {
        setLoading(true);
        try {
            const data = await insertOferta({
                idProductoOfertado: payload.idProductoOfertado,
                preciosOfertados: payload.preciosOfertados
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