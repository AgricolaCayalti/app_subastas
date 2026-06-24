import { FaPlus } from 'react-icons/fa';
import { CollapsibleSubProductNative } from './CollapsibleSubProductNative';
import { CollapsibleIndications } from './CollapsibleIndications';
import { ProductOffers } from './types';
import { MyOffers } from '@/components/MyOffers/MyOffers';
import { ProductDetail } from '@/store/useProductDetailStore';
import { useProduct } from './useProduct';

interface ProductProps {
    item: ProductOffers;
    handleAddOffer?: (item: ProductOffers) => void;
}

export const Product = ({ item, handleAddOffer }: ProductProps) => {
    const { productDetailData, bestOffersData, strings } = useProduct(item);

    return (
        <div className="flex flex-row justify-between text-base py-2 border-b border-white text-[var(--primary)]">
            <div className="relative w-full rounded-2xl mb-4 px-4 pb-6 pt-4 bg-no-repeat bg-contain bg-left shadow-[3px_2px_5px_0px_var(--gray)]"
                style={{ backgroundImage: "url('../../../assets/background-option.png')" }}>

                <div className="flex justify-between items-start gap-4">
                    <div className="text-2xl text-[var(--secondary)] font-medium">
                        {strings.COMMON_SUBASTA_TITULO.replace(":0", item.descripcion)}
                    </div>
                    {
                        handleAddOffer && (
                            <button
                                onClick={() => { handleAddOffer(item) }}
                                className="flex items-center gap-1.5 min-h-[44px] min-w-[150px] p-2 rounded-2xl border-0 bg-[var(--terciary)] text-[var(--white)] cursor-pointer text-sm font-semibold font-sans hover:opacity-75 shrink-0"
                            >
                                <FaPlus />
                                <span>{strings.PAGE_PRODUCTLIST_BTN_AGREGAR_OFERTA}</span>
                            </button>
                        )
                    }
                </div>

                <div className="text-xl mt-2">
                    <b>{strings.PAGE_PRODUCTLIST_PRECIO_PONDERADO}:</b> {item.precioBaseKg}
                </div>

                <div className="mt-1">
                    <b>{strings.PAGE_PRODUCTLIST_FECHA_ENTREGA}:</b> {item.fechaEntrega}
                </div>

                <div className="mt-2">
                    {productDetailData?.map((productoDetalle: ProductDetail, index: number) => (
                        <CollapsibleSubProductNative
                            key={index}
                            {...productoDetalle}
                        />
                    ))}
                </div>

                <div className="text-xl flex flex-row justify-between text-[var(--error)] my-2">
                    <b>{bestOffersData.length ? `${strings.PAGE_PRODUCTLIST_PRECIO_GANADOR}:` : `${strings.COMMON_MEJOR_OFERTA}`}</b>
                    {
                        bestOffersData.length ?
                        <div className="flex flex-col items-end font-bold text-right">
                            <b>{bestOffersData[0].precioOfertado}</b>
                            <small>({bestOffersData[0].fechaHoraOfertado})</small>
                        </div>
                        :
                        false
                    }
                </div>


                {Boolean(item?.comentarios) && handleAddOffer && (
                    <CollapsibleIndications comentarios={item.comentarios} />
                )}

                {
                    handleAddOffer && (
                        <div className="text-[var(--terciary)] font-semibold text-sm mt-2">
                            <b>{strings.PAGE_PRODUCTLIST_CERRADA_EN}:</b> {item.momentoCierre}
                        </div>
                    )
                }

                <MyOffers />
            </div>
        </div>
    );
};