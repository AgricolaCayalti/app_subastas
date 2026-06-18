import { useUI } from "@/hooks";
import styles from "./CollapsibleSubProductNative.module.css";

export function CollapsibleSubProductNative({ tipoMoneda, productoDetalle }) {
    const { strings } = useUI();
    return (
      <div className={styles.collapsibleStack}>
        <details className={styles.details}>
          <summary className={styles.summary}>{ productoDetalle?.descripcion }</summary>
          <div className={styles.content}>
            <div><b>{strings.PAGE_PRODUCTLIST_PRECIO_BASE}:</b> {tipoMoneda} {productoDetalle.precioBaseKg} </div>
            <div><b>{strings.PAGE_PRODUCTLIST_CANTIDAD}:</b> {productoDetalle.cantidadKg} KG </div>
          </div>
        </details>
      </div>
    );
  }