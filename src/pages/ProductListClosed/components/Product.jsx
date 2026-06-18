import styles from './Product.module.css';
import { BloqueOfertas } from '../../_common/BloqueOfertas';
import { useUI } from '@/hooks/index.js';
import {Space} from "@/components/index.js";
import {CollapsibleSubProductNative} from "@/pages/ProductList/components/CollapsibleSubProductNative.jsx";
import {CollapsibleIndications} from "@/pages/ProductList/components/CollapsibleIndications.jsx";

export const Product = ({item}) => {
    const { strings } = useUI();

    return  <div className={styles.container}>
                <div className={styles.varietyItem}>
                    <div className={styles.varietyTitle}>
                        {strings.COMMON_SUBASTA_TITULO.replace(":0", item?.descripcion)}
                    </div>
                    <div className={styles.weightedAveragePrice}><b>{strings.PAGE_PRODUCTLIST_PRECIO_PONDERADO}:</b> {item.tipoMoneda} {item.precioBaseKg} </div>
                    <div><b>{strings.PAGE_PRODUCTLIST_FECHA_ENTREGA}:</b> {item.fechaEntrega}</div>
                    <Space height={2} />
                    {
                        item?.productosDetalle?.map( productoDetalle => (
                            <CollapsibleSubProductNative
                                key={productoDetalle.id}
                                tipoMoneda= { item.tipoMoneda }
                                productoDetalle = { productoDetalle }
                            />
                        ))
                    }
                    {
                        item?.mejorOferta &&
                        <>
                            <Space height={2} />
                            <div className={styles.varietyWinnerPrice}>
                                <b>{strings.PAGE_PRODUCTLIST_PRECIO_GANADOR}: </b>
                                <div className={styles.varietyWinnerPriceDetail}>
                                    <b>{item?.tipoMoneda} {item.mejorOferta.precioOfertado} </b>
                                    <small>({item.mejorOferta.fechaHoraOfertado})</small>
                                </div>
                            </div>
                            <Space height={2} />
                        </>
                    }
                    {
                        Boolean(item?.comentarios) &&
                        <CollapsibleIndications comentarios={item.comentarios} />
                    }
                    <BloqueOfertas titulo={strings.PAGE_PRODUCTLIST_TITULO_BLOQUE_OFERTA} subasta={item} />
                </div>
            </div>
};