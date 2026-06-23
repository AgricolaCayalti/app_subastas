import { useUI } from "@/hooks";
import styles from "./CollapsibleIndications.module.css";

export function CollapsibleIndications({ comentarios }) {
  const { strings } = useUI();
  return (
    <div className={styles.collapsibleStack}>
      <details className={styles.details}>
        <summary className={styles.summary}>{strings.PAGE_PRODUCTLIST_MOSTRAR_INDICACIONES}</summary>
        <div className={styles.content}>
          <div>{comentarios}</div>
        </div>
      </details>
    </div>
  );
}