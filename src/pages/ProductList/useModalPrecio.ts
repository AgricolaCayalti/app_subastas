import { insertOferta } from "@/services/insertOferta.js";
import { useState } from "react";
import { useNotistack, useUI } from "../../hooks";
import { PayloadInsertOferta } from "@/components/ProductOffers/types";

export const useModalPrecio = () => {
    const [loading, setLoading] = useState(false);
    const { strings } = useUI();
    const { showNotyOK, showNotyError } = useNotistack();
    const onRegistrar = async (payload: PayloadInsertOferta) => {
        setLoading(true);
        try {
            await insertOferta({
                idProductoOfertado: payload.idProductoOfertado,
                preciosOfertados: payload.preciosOfertados
            });

            showNotyOK({ message: strings.PAGE_PRODUCTLIST_OFERTA_REGISTRADA_OK })
        } catch (error) {
            showNotyError({ error: (error as any).msg })
        } finally {
            setLoading(false);
        }
    };

    return {
        loading, 
        onRegistrar
    }
};