import { useEffect, useState } from "react";
import { BlockVacio, LinearLoader } from "../../components";
import { ModalPrecio } from "./components/ModalPrecio";
import { Product } from "./components/Product";
import styles from "./ProductList.module.css";
import { useProductList } from "./useProductList";
import { TopBar } from "../../components/TopBar/TopBar";
import { useUI } from "../../hooks";
import {loadStorage, saveStorage} from "@/assets/localStorager.js";
import {ModalReadme} from "@/pages/ProductList/components/ModalReadme.jsx";

export const ProductList = () => {
    const [seleccionado, setSeleccionado] = useState(null);
    const [itemMostrandoReadme, setItemMostrandoReadme] = useState(null);
    const { data : registros, loading : cargando, onListar} = useProductList();
    const { strings } = useUI();

    const handleAddOffer = ( item ) => {
        const subastasReadmeLists = loadStorage({key : "subastas-readme"}) ?? [];
        const esDeboMostrar = subastasReadmeLists.filter ( idSubasta => parseInt(idSubasta) === item.id ).length <= 0;

        if (esDeboMostrar){
            setItemMostrandoReadme(item);
            saveStorage({
                key: "subastas-readme",
                data: [...subastasReadmeLists, item.id]
            })
            return;
        }

        setSeleccionado(item);
    }

    useEffect(()=>{
      onListar();
    }, []);

    return  <div className={styles.productListBoxContainer}>
                <TopBar title={strings.PAGE_PRODUCTLIST_TITULO} bgColor={"secondary"} shouldShowBackBtn={true} />
                {
                    cargando 
                        ?   <LinearLoader />
                        :   <div>
                            {
                                registros?.length <= 0 
                                ? <BlockVacio title={strings.COMMON_SIN_SUBASTAS_PARA_MOSTRAR}/>
                                : registros?.map ( subasta => {
                                    return <Product key={subasta.id}  item = {subasta} handleAddOffer={handleAddOffer}/>
                                })
                            }
                            </div>
                }
                {
                    Boolean(seleccionado) && !Boolean(itemMostrandoReadme) &&
                        <ModalPrecio seleccionado={seleccionado} setSeleccionado={setSeleccionado} onListarSubastas = {onListar}/>
                }
                {
                    Boolean(itemMostrandoReadme) &&
                        <ModalReadme handleClose = {() => {
                            setSeleccionado(itemMostrandoReadme);
                            setItemMostrandoReadme(null);
                        }} />
                }
            </div>
};