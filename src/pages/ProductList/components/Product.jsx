import { FaPlus } from 'react-icons/fa'
import styles from './Product.module.css';
import { Space } from '../../../components';
import { BloqueOfertas } from '../../_common/BloqueOfertas';
import { useUI } from '../../../hooks';
import { CollapsibleSubProductNative } from './CollapsibleSubProductNative';
import { CollapsibleIndications } from './CollapsibleIndications';

export const Product = ({item, handleAddOffer}) => {
    const { strings } = useUI();

    return  <div className={styles.container}>
                <div className={styles.varietyItem}>
                    <button onClick={()=>{handleAddOffer(item)}} className={styles.btnAgregarOferta}><FaPlus /> <span>{strings.PAGE_PRODUCTLIST_BTN_AGREGAR_OFERTA}</span></button>
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
                    <div className={styles.varietyTime}><b>{strings.PAGE_PRODUCTLIST_CERRADA_EN}:</b> {item?.momentoCierre}</div>
                    <BloqueOfertas titulo={strings.PAGE_PRODUCTLIST_TITULO_BLOQUE_OFERTA} subasta={item} />
                </div>
            </div>
};