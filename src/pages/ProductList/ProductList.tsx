import { useEffect, useState } from "react";
import { ModalPrecio } from "./components/ModalPrecio";
import { useProductList } from "./useProductList";
import { TopBar } from "../../components/TopBar/TopBar";
import { Loading } from "@/components/Loading/Loading";
import { ProductOffers as ProductOffersType } from "./types";
import { ModalReadme } from "./components/ModalReadme";
import { ProductOffers } from "@/components/ProductOffers/ProductOffers";

export const ProductList = () => {
    const [itemMostrandoReadme, setItemMostrandoReadme] =
        useState<ProductOffersType | null>(null);
    const {
        data: registros,
        isLoading,
        onListar,
        strings,
        selected: seleccionado,
        onSelected: setSeleccionado,
    } = useProductList();

    useEffect(() => {
        onListar();
    }, []);

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
            {Boolean(seleccionado) && !Boolean(itemMostrandoReadme) && (
                <ModalPrecio onListarSubastas={onListar} />
            )}
            {Boolean(itemMostrandoReadme) && (
                <ModalReadme
                    handleClose={() => {
                        setSeleccionado(seleccionado!);
                        setItemMostrandoReadme(null);
                    }}
                />
            )}
        </div>
    );
};
/* const handleAddOffer = (item : ProductOffers) => {
        console.log("item", item);
        const subastasReadmeLists = loadStorage({ key: "subastas-readme" }) ?? [];
        console.log("subasta 0> ", subastasReadmeLists)
        const esDeboMostrar = subastasReadmeLists.filter((idSubasta : number) => idSubasta === item.id).length <= 0;

        if (esDeboMostrar) {
            setItemMostrandoReadme(item);
            saveStorage({
                key: "subastas-readme",
                data: [...subastasReadmeLists, item.id]
            })
            return;
        }

        setSeleccionado(item);
    } */
/* console.log("DONDE ESTA AMOR !!!!") */