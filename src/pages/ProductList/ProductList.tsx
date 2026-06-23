import { ModalPrecio } from "./components/ModalPrecio";
import { useProductList } from "./useProductList";
import { TopBar } from "../../components/TopBar/TopBar";
import { Loading } from "@/components/Loading/Loading";
import { ProductOffers } from "@/components/ProductOffers/ProductOffers";
import { Readme } from "./components/Readmen";


export const ProductList = () => {
    const {
        data: registros,
        isLoading,
        onListar,
        strings,
        onSelected: setSeleccionado,
        readme,
        setReadme
    } = useProductList();

    return (
        <div className="flex flex-col h-full justify-start px-[18px] pt-[85px]">
            <TopBar
                title={strings.PAGE_PRODUCTLIST_TITULO}
                bgColor={"secondary"}
                shouldShowBackBtn={true}
            />
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
                readme ? <Readme open={readme} onClose={() => setReadme(false)} /> : <ModalPrecio onListarSubastas={onListar} />
            }
        </div>
    );
};

 {/* <ModalReadme handleClose={() => { setSeleccionado(seleccionado!); }} /> */}