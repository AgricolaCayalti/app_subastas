import { ModalPrecio } from "./components/ModalPrecio";
import { useProductList } from "./useProductList"; 
import { Loading } from "@/components/Loading/Loading";
import { ProductOffers } from "@/components/ProductOffers/ProductOffers";
import { Readme } from "./components/Readmen";
import { Layout } from "@/components/Layout/Layout";


export const ProductList = () => {
    const {
        data: registros,
        isLoading,
        strings,
        onSelected: setSeleccionado,
        readme,
        setReadme
    } = useProductList();

    return (
        <Layout title={strings.PAGE_PRODUCTLIST_TITULO} bgColor="primary">
            {isLoading ? (
                <Loading />
            ) : (
                <ProductOffers
                    registros={registros}
                    title={strings.COMMON_SIN_SUBASTAS_PARA_MOSTRAR}
                    handleAddOffer={setSeleccionado}
                />
            )}

            {
                readme ? <Readme open={readme} onClose={() => setReadme(false)} /> : <ModalPrecio  />
            }
        </Layout>
    );
}; 