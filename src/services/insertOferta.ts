import { httpClient } from "@/api/httpClient";
import { PayloadInsertOferta } from "@/pages/ProductList/types";

interface InsertOfertaRequest {
    idProductoOfertado: string;
    preciosOfertados: Array<{
        idProducto: string;
        precioOfertadoKg: number;
    }>;
}

export const insertOferta = async (payload: PayloadInsertOferta) => {
    const { data } = await httpClient.post(
        `/comprador-ofertas`, {
            codigo_de_subasta : payload.idProductoOfertado,
            productos_ofertados: payload.preciosOfertados.map( item => ({
                codigo_producto: item.idProducto,
                precio_ofertado_por_kg : item.precioOfertadoKg
            }))
        }
    );
    return data;
};