export interface ProductDetails {
    id: number;
    idProducto: number;
    descripcion: string;
    cantidadKg: string; 
    precioBaseKg: string;
    importeTotal: string;
}

export interface Offers {
    fechaHoraOfertado: string;
    id: number;
    isFromUser: boolean;
    precioOfertado: string;
} 

export interface LastOfferDetail {
    id: number;
    idProducto: number;
    precioOfertado: string;
}

export interface LastOffer {
    id: number;
    detalles: LastOfferDetail[];
}

export interface ProductOffers {
    id: number;
    descripcion: string;
    fechaEntrega: string;
    fechaHoraInicio: string;      
    fechaHoraFin: string;         
    fechaHoraFinRaw: string;       
    precioBaseKg: number;
    cantidadKg: number;
    comentarios: string;
    miUltimaOferta: LastOffer | null;
    productosDetalle: ProductDetails[];
    ofertas: Offers[];   
    mejorOferta: LastOfferDetail | null
}

export interface ProductOffersActive extends ProductOffers {
    momentoCierre: string;
}

export interface PreciosOfertados {
    idProducto: number | null;
    precioOfertadoKg: number | null;
}

export interface PayloadInsertOferta {
    idProductoOfertado: number;
    preciosOfertados: PreciosOfertados[];
}