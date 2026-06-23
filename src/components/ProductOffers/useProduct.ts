
import { useMyOffersStore } from '@/store/useMyOffersStore';
import { useProductsDetailsStore } from '@/store/useProductDetailStore';
import { useBestOfferStore } from '@/store/useBestOfferStore';
import { useEffect } from 'react';
import { ProductOffers } from './types';
import { useUI } from '@/hooks';


export const useProduct = (item: ProductOffers) => {
    const { strings } = useUI();
    const { setData: setDataMyOffers } = useMyOffersStore();
    const { setData: setDataProductDetail, data: productDetailData } = useProductsDetailsStore();
    const { setData: setDataBestOffers, data: bestOffersData } = useBestOfferStore();

    useEffect(() => {
        const mappedOffers = item?.ofertas?.map(offer => ({
            id: offer.id,
            isFromUser: offer.isFromUser,
            precioOfertado: offer.precioOfertado,
            fechaHoraOfertado: offer.fechaHoraOfertado
        })) || [];
        setDataMyOffers(mappedOffers);
    }, [item]);

    useEffect(() => {
        const mappedProductDetail = item?.productosDetalle?.map(product => ({
            id: product.id,
            idProducto: product.idProducto,
            descripcion: product.descripcion,
            cantidadKg: product.cantidadKg,
            importeTotal: product.importeTotal,
            precioBaseKg: product.precioBaseKg
        })) || [];
        setDataProductDetail(mappedProductDetail);
    }, [item]);

    useEffect(() => {
        const mappedBestOffers = item?.mejorOferta?.map(bestOffer => ({
            id: bestOffer.id,
            precioOfertado: bestOffer.precioOfertado,
            fechaHoraOfertado: bestOffer.fechaHoraOfertado
        })) || [];
        setDataBestOffers(mappedBestOffers);
    }, [item]);
    
    return {
        productDetailData,
        bestOffersData,
        strings
    };
}