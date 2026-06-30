import { Product } from "./Product";
import { NotFound } from "../NotFound/NotFound";
import { ProductOffers as ProductOffersType, ProductOffersActive } from "@/components/ProductOffers/types";

interface ProductOffersProps {
    registros: ProductOffersActive[] | ProductOffersType[];
    title?: string;
    handleAddOffer?: (subasta: ProductOffersActive) => void
}

export const ProductOffers: React.FC<ProductOffersProps> = (
    {
        registros = [],
        title = "No hay ofertas para mostrar",
        handleAddOffer
    }
) => {
    if (!registros.length) {
        return <NotFound title={title} />;
    }

    return (
        <div>
            {
                registros.map((subasta: ProductOffersType | ProductOffersActive, index: number) =>
                    <Product key={index} item={subasta} handleAddOffer={handleAddOffer} />
                )
            }
        </div>
    );
}