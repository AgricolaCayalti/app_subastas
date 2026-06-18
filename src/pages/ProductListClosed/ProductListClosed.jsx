import { useEffect } from "react";
import { LinearLoader } from "../../components";
import { Product } from "./components/Product";
import styles from "./ProductListClosed.module.css";
import { useProductListClosed } from "./useProductListClosed";
import { BlockVacio } from "../../components/BlockVacio/BlockVacio";
import { TopBar } from "../../components/TopBar/TopBar";
import { useUI } from "../../hooks";

export const ProductListClosed = () => {
    const { data : registros, loading : cargando, onListar} = useProductListClosed();
    const { strings } = useUI();

    useEffect(()=>{
        onListar();
    }, []);

    return  <div className={styles.productlistBoxContainer}>
                <TopBar title={strings.PAGE_PRODUCTLISTCLOSED_TITULO} bgColor={"extra"} shouldShowBackBtn={true} />
                {
                    cargando 
                        ?   <LinearLoader color="extra"/>
                        :   <div className="productlist-lst-products">
                            {
                                registros?.length <= 0 
                                ? <BlockVacio title={strings.COMMON_SIN_SUBASTAS_PARA_MOSTRAR}/>
                                : registros?.map ( subasta => {
                                    return <Product key={subasta.id}  item = {subasta}/>
                                })
                            }
                            </div>
                }
            </div>
};