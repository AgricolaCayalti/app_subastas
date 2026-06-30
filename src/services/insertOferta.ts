import { httpClient } from "@/api/httpClient";
import { PayloadInsertOferta } from "@/components/ProductOffers/types";

export const insertOferta = async (payload: PayloadInsertOferta) => {
    await httpClient.post(
        `/comprador-ofertas`, {
            codigo_de_subasta : payload.idProductoOfertado,
            productos_ofertados: payload.preciosOfertados.map( item => ({
                codigo_producto: item.idProducto,
                precio_ofertado_por_kg : item.precioOfertadoKg
            }))
        }
    );
};