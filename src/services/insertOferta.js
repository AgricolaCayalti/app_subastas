import { axiosPrivate } from "../api/axios";

export const insertOferta = async (data) => {
    const res = await axiosPrivate.post(
        `/subastas/comprador-ofertas`, {
            codigo_de_subasta : data.idProductoOfertado,
            productos_ofertados: data.preciosOfertados.map( item => ({
                codigo_producto: item.idProducto,
                precio_ofertado_por_kg : item.precioOfertadoKg
            }))
        }
    );
    return res.data;
};