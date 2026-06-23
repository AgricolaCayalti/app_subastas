import { Product } from "./Product";
import { NotFound } from "../NotFound/NotFound";
import { ProductOffers as ProductOffersType } from "./types";

export const ProductOffers = ({ registros = [], title = "No hay ofertas para mostrar", handleAddOffer }: { registros: ProductOffersType[]; title?: string; handleAddOffer?: (subasta: ProductOffersType) => void }) => {
    if (!registros.length) {
        return <NotFound title={title} />;
    }

    return (
        <div>
            {
                registros.map((subasta: ProductOffersType, index: number) => <Product key={index} item={subasta} handleAddOffer={handleAddOffer} />)

            }
        </div>
    );
}