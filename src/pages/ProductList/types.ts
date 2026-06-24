export interface ProductDetails {
    id: number;
    idProducto: number;
    descripcion: string;
    cantidadKg: string;    // ej: "4,000.00"
    precioBaseKg: string;  // ej: "2.50"
    importeTotal: string;  // ej: "10,000.00"
}

export interface Offers {
    // Define las propiedades según la estructura real de una oferta
    // Por ahora se deja como any para flexibilidad
    [key: string]: any;
}

export interface ProductOffers {
    id: number;
    descripcion: string;
    fechaEntrega: string;          // ej: "08-01-2026"
    fechaHoraInicio: string;       // ej: "08-01-2026 10:05:00"
    fechaHoraFin: string;          // ej: "08-12-2026 11:55:00"
    fechaHoraFinRaw: string;       // ej: "2026-12-08 11:55:00"
    precioBaseKg: number;
    cantidadKg: number;
    comentarios: string;
    miUltimaOferta: Offers[];      // array de ofertas (vacío en el ejemplo)
    productosDetalle: ProductDetails[];
    ofertas: Offers[];             // array de ofertas
    mejorOferta: Offers[];         // array de ofertas
    momentoCierre: string;         // ej: "168 day(s) 19 hour(s) 4 minute(s)"
}

export interface PreciosOfertados {
    idProducto: number | null;
    precioOfertadoKg: number | null;
} 

export interface PayloadInsertOferta {
    idProductoOfertado: number;
    preciosOfertados: PreciosOfertados[];
}