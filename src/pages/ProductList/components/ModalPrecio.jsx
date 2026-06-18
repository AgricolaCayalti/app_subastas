import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { InputFormMoney } from '@/components/InputFormMoney/InputFormMoney';
import styles from './ModalPrecio.module.css';
import { ButtonForm, LinearLoader, Space } from '@/components';
import { useModalPrecio } from '../useModalPrecio';
import { useEffect, useRef, useState } from 'react';
import {useNotistack, useUI} from '@/hooks';

const calcularPrecioPonderado = ($form, listaProductos) => {
    //if (listaProductos?.length <= 0) return "0.00";
    const formData = new FormData($form);
    let totalCantidad = 0, totalIngresos = 0;
    listaProductos.forEach( item => {
        const precioOfertadoKg = Number((formData.get(`precio_ofertado_${item.id}`) ?? "0.00").replaceAll(",",""));
        const cantidadKg = Number(item.cantidadKg.replaceAll(",",""));
        totalCantidad += cantidadKg;
        totalIngresos += (cantidadKg * precioOfertadoKg);
    });
    return parseFloat(totalIngresos / totalCantidad).toFixed(2);
};

const getListaProductosPrecios = ($form, listaProductos) => {
    const formData = new FormData($form);

    return listaProductos.map( item => {
        const precioOfertadoKg = Number((formData.get(`precio_ofertado_${item.id}`) ?? "0.00").replaceAll(",",""));
        if (precioOfertadoKg >= 100){
            throw new Error(`Monto ${precioOfertadoKg} no permitido. Máximo 99.99`);
        }
        return {
            idProducto: item.idProducto,
            precioOfertadoKg
        };
    });

};

export const ModalPrecio = ({seleccionado, setSeleccionado, onListarSubastas}) => {
    const formRef = useRef();
    const { loading : isRegistrando, data, onRegistrar} = useModalPrecio();
    const { strings } = useUI();
    const [precioPonderado, setPrecioPonderado] = useState("0.00");
    const { showNotyError } = useNotistack();

    const handleClose = () => {
        setSeleccionado(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { target : $form } = e;
        const preciosOfertados = getListaProductosPrecios($form, seleccionado.productosDetalle);
        onRegistrar({
            idProductoOfertado : seleccionado.id,
            preciosOfertados
        });
    };

    const handleChange = () => {
        if (!formRef.current) return;
        setPrecioPonderado(calcularPrecioPonderado(formRef.current, seleccionado?.productosDetalle ?? []));
    };

    useEffect(() => {
        if (!Boolean(data)){
            return;
        }

        handleClose();
        onListarSubastas();
    }, [data]);

    return <div className={styles.modal} style={{display: Boolean(seleccionado) ? "block" : "none"}}>
                <form ref={formRef} onSubmit={handleSubmit} className={styles.modalDialog}>
                    <div className={styles.modalHeader}>
                        <h3 className={styles.title}>{strings.PAGE_PRODUCTLIST_MODALPRECIO_OFERTANDO_PRECIO}</h3>
                        <span className={styles.modalClose} onClick={handleClose}>&times;</span>
                        <div className={styles.subtitleModal}><b>{strings.COMMON_SUBASTA_TITULO.replace(":0", seleccionado?.descripcion)}</b></div>
                        <div><b>{strings.PAGE_PRODUCTLIST_FECHA_ENTREGA}:</b> {seleccionado?.fechaEntrega}</div>
                        <hr />
                    </div>
                    <div className={styles.modalContent}>
                        {
                            seleccionado?.productosDetalle?.map ( (productoDetalle, i) => {
                                    const ofertaProductoOfertador = seleccionado?.miUltimaOferta?.detalles?.find(item => item.idProducto === productoDetalle.idProducto);
                                    return <div key={productoDetalle.id}>
                                                <div className={styles.variety}>
                                                    <div>{productoDetalle?.descripcion}</div>
                                                    <div>
                                                        <b>{strings.PAGE_PRODUCTLIST_CANTIDAD}:</b> {productoDetalle?.cantidadKg} Kg
                                                    </div>
                                                    <div className={styles.varietyPrice}>
                                                        {strings.PAGE_PRODUCTLIST_PRECIO_BASE}: {seleccionado?.tipoMoneda} {productoDetalle.precioBaseKg}
                                                        {
                                                            Boolean(ofertaProductoOfertador ) &&
                                                                <span style={{color:"var(--terciary)"}}> (Yo {seleccionado.tipoMoneda} {ofertaProductoOfertador.precioOfertado}) </span>
                                                        }
                                                    </div>
                                                </div>
                                                <InputFormMoney
                                                    icon={<FaRegMoneyBillAlt/>}
                                                    required
                                                    disabled={isRegistrando}
                                                    imperativeAutofocus={i === 0}
                                                    onClick={(e) => e.target.select()}
                                                    name={`precio_ofertado_${productoDetalle.id}`}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                                <Space height={5}/>
                                                <hr/>
                                            </div>
                            })
                        }
                    </div>
                    <div className={styles.modalFooter}>
                        <div className={styles.pricesResume}>
                            <div>
                                <div className={styles.title}>{strings.PAGE_PRODUCTLIST_PRECIO_BASE}</div>
                                <div className={styles.price}>{seleccionado.tipoMoneda} {seleccionado.precioBaseKg}</div>
                            </div>
                            <div>
                                <div className={styles.title}>{strings.PAGE_PRODUCTLIST_PRECIO_OFERTADO}</div>
                                <div className={styles.price}>{seleccionado.tipoMoneda} {precioPonderado}</div>
                            </div>
                        </div>
                        
                        {
                            isRegistrando 
                               ? <LinearLoader color='terciary' />
                               : <ButtonForm type="submit" bgColor="terciary" disabled={isRegistrando}>{strings.PAGE_PRODUCTLIST_MODALPRECIO_INGRESE_BTN_GUARDAR}</ButtonForm>
                        }
                    </div>
                </form>
            </div>
}