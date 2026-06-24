import { httpClient } from "@/api/httpClient";

interface InsertOfertaRequest {
    idProductoOfertado: string;
    preciosOfertados: Array<{
        idProducto: string;
        precioOfertadoKg: number;
    }>;
}

export const insertOferta = async (data: InsertOfertaRequest) => {
    const res = await httpClient.post(
        `/comprador-ofertas`, {
            codigo_de_subasta : data.idProductoOfertado,
            productos_ofertados: data.preciosOfertados.map( item => ({
                codigo_producto: item.idProducto,
                precio_ofertado_por_kg : item.precioOfertadoKg
            }))
        }
    );
    return res.data;
};