import { useEffect } from "react";
import { TopBar } from "../../components/TopBar/TopBar";
import { Loading } from "@/components/Loading/Loading";
import { ProductOffers } from "@/components/ProductOffers/ProductOffers";
import { useProductListClosed } from "./useProductListClosed";

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
        <div className="flex flex-col h-full justify-start px-[18px] pt-[85px]">
            <TopBar
                title={strings.PAGE_PRODUCTLISTCLOSED_TITULO}
                bgColor={"secondary"}
                shouldShowBackBtn={true}
            />
            {isLoading ? (
                <Loading />
            ) : (
                <ProductOffers
                    registros={registros}
                    title={strings.COMMON_SIN_SUBASTAS_PARA_MOSTRAR}
                />
            )}
        </div>
    );
};