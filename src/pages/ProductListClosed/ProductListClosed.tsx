import { useEffect } from "react";
import { Loading } from "@/components/Loading/Loading";
import { ProductOffers } from "@/components/ProductOffers/ProductOffers";
import { useProductListClosed } from "./useProductListClosed";
import { Layout } from "@/components/Layout/Layout";

export const ProductListClosed = () => {
    const {
        data: registros,
        isLoading,
        onListar,
        strings,
    } = useProductListClosed();

    useEffect(() => {
        onListar();
    }, []);

    return (
        <Layout title={strings.PAGE_PRODUCTLISTCLOSED_TITULO}>
            {isLoading ? (
                <Loading />
            ) : (
                <ProductOffers
                    registros={registros}
                    title={strings.COMMON_SIN_SUBASTAS_PARA_MOSTRAR}
                />
            )}
        </Layout>
    );
};